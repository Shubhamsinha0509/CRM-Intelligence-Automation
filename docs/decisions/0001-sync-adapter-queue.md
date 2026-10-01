# 0001 — Sync Strategy, CRM Adapter Boundary, Job Queue

Status: Accepted
Task: 0.5

## Context

Task 0.5 required deciding three coupled pieces of architecture before the repo skeleton (0.6) and the read-only audit slice (1.x) could be built: how HubSpot data gets synced, where the HubSpot-specific code lives, and what runs background jobs. Reference material: `project.md` (MVP scope, engineering goals), `hubspot-api-notes.md` (rate limits, pagination, merge behavior).

## Decisions

### Sync trigger: on-demand, not scheduled

Monitoring is explicitly out of MVP scope (`project.md`); the consultant runs discrete audits. A scheduler would solve a problem this product doesn't have yet. No webhooks either — single-portal, consultant-triggered usage doesn't need them.

### Incremental mechanism: List API, not Search API

Considered: Search API filtering on `hs_lastmodifieddate` (precise, but capped at 5 req/s) vs. List API with cursor pagination + client-side timestamp comparison (re-fetches everything, but only the 100 req/10s burst cap applies).

Chose List API. Correction made during review: this only avoids the *search* cap — the 100 req/10s burst cap still applies and still requires `Retry-After` handling. "Incremental" here means fewer Postgres writes, not fewer HubSpot API calls; every run re-pages every object type in full. Acceptable at MVP/small-B2B data volumes.

### Execution model: queued (pg-boss), not inline

A full re-page of all objects, combined with burst-cap backoff, can take long enough that blocking an HTTP request on it risks timeouts and fights the retry-safety requirement in CLAUDE.md. The sync endpoint creates a `SyncRun`, enqueues a job, and returns immediately; the client polls for status.

### Adapter: concrete `HubSpotClient`, no `CrmPort` interface

Considered: a generic port/interface (`CrmPort`) implemented by HubSpot, enabling a future second provider, vs. a concrete client with the boundary enforced by module/folder convention only.

Chose the concrete client. A second CRM provider is explicitly stretch/not-committed (`project.md`); an interface with exactly one implementation is the "unnecessary... refactor" / speculative abstraction CLAUDE.md warns against.

Adopted with four conditions (all binding on the implementation):

1. Returns only domain types, never HubSpot SDK/response shapes.
2. Nothing outside its module imports the HubSpot SDK.
3. Injected wherever used, so tests can substitute a fake.
4. Only the sync job and write workflows call it; detectors read from Postgres only.

### Validation split: structural (in the adapter) vs. data-quality (never)

Initial proposal was "validate in the mapper," unqualified. Corrected during review: the mapper only rejects/quarantines *structurally* broken records (missing id, wrong types, unparseable response). Messy *values* — malformed emails, blanks, inconsistent formats — must pass through unchanged, because detecting them is what the product does (task 1.4+). A mapper that cleans or drops them would make the detectors blind. Quarantined records are recorded on the `SyncRun`, not silently dropped.

### Domain types ≠ Prisma models

A distinct domain type with an explicit mapping step to the Prisma upsert input, rather than collapsing the two. Prisma models will carry fields with no HubSpot origin (health scores, sync metadata); a 1:1 mapping would leak persistence concerns across the adapter boundary (CLAUDE.md: keep domain/infrastructure/presentation separated).

### Rate limiting: dual-cap, reactive, inside `HubSpotClient`

Initial proposal included proactively persisting a daily call counter in Postgres. Rejected during review as over-built. Adopted instead: react only to HubSpot's own signals, and treat the two caps differently, since they behave differently:

- **Burst cap:** `429` + `Retry-After` → sleep, retry.
- **Daily cap:** inspect `X-HubSpot-RateLimit-Daily-Remaining` on responses and daily-cap-specific `429`s. When low or hit, stop — do not retry-loop — mark the `SyncRun` `paused`, keep the checkpoint. The next run resumes.

The client must tell the two `429` cases apart; sleeping and retrying against an exhausted daily cap just burns time until tomorrow's reset. (Presence of the daily-remaining header on Private App token calls needs verifying against the live API during implementation — not assumed from docs alone.)

### Checkpoint/resume, not restart-from-scratch

A per-object-type pagination cursor is persisted on `SyncRun` as the job progresses. A retried or daily-cap-paused job resumes from there. Plain upsert-by-HubSpot-id would make restart-from-scratch *safe*, but not cheap — resuming avoids re-burning API budget after an interruption.

Re-triggering sync for a scope with an existing paused run resumes it automatically (same action, not a separate "resume" endpoint) — unless the paused run is stale (threshold TBD, ~24–48h), in which case a fresh run starts, since the underlying data has likely drifted.

### Job queue: pg-boss, not Redis/BullMQ

Postgres is already in the stack; pg-boss avoids a second infrastructure dependency (process, backup, compose service) for job volume that doesn't need Redis-grade throughput.

### What runs through the queue

Sync now; approved write workflows (owner assignment, task creation, merge) and report generation later (task 2.x+), each via their own `ActionRun` record. Report generation is lowest priority and can slip past MVP if time-boxed out.

Correction made during review: queuing does not grant idempotency "for free" — it only gives one retry *model*. Idempotency remains the application's responsibility:

- Each approved action's own DB row (created at approval) doubles as the pg-boss singleton/dedupe key — no separate key generation needed.
- Revalidation against current state happens before execution (mechanism deferred to task 2.8).
- An uncertain merge retry checks current record state first; an already-completed merge is reconciled, not reissued.

### `ActionRun`: one generic table

A single table with a type discriminator and a nullable JSON payload column (for merge's pre-merge snapshot), mirroring `SyncRun`, rather than one table per workflow type — avoids three near-duplicate schemas for data that's otherwise identical in shape.

## Consequences

- No scheduler or webhook infrastructure needed for MVP.
- Every sync run's API cost is roughly constant regardless of how much data actually changed — acceptable at target-client scale, worth revisiting if a future client's data volume makes full re-paging expensive.
- `SyncRun` and `ActionRun` become the audit/status backbone for both the UI (4.1/4.2) and the audit-trail requirement in `project.md`, independent of pg-boss's internal state.
- Detectors never see raw HubSpot shapes or malformed records filtered out — only structurally-valid domain data as persisted in Postgres, with data-quality defects intact for the detectors to find.
