# HubSpot CRM API — Reference Notes

Working notes from studying the HubSpot CRM API (task 0.3), to ground the adapter and sync design in 0.5.

## Objects in scope

MVP reads: **Contacts, Companies, Deals** (matches `project.md` MVP scope).

* `GET/POST /crm/v3/objects/contacts`
* `GET/POST /crm/v3/objects/companies`
* `GET/POST /crm/v3/objects/deals`

Each supports list (paginated), get-by-id, search, and batch read/create/update. MVP only needs **read** (list + search); write is limited to the two/three approved workflows later (owner assignment, task creation, merge).

## Associations

Deals/contacts/companies are separate objects — links between them (e.g. "this deal belongs to this contact and company") come from the **Associations API**, not embedded fields.

* Default object endpoints do **not** include associations unless explicitly requested — must pass `associations` query param (e.g. `?associations=companies,contacts`) or use the batch associations read endpoint.
* v4 associations API is current; supports default and custom association types via `associationTypeId`.
* Needed for duplicate detection (matching across related records) and for the health/pipeline views.

## Authentication

**Private App token** (a static bearer token scoped to the HubSpot account) is the simplest fit for MVP — one consultant operating one client portal at a time, no need for multi-tenant OAuth flows.

* Generate in the HubSpot account: Settings → Integrations → Private Apps.
* Scopes needed: read (and later write) on `crm.objects.contacts`, `crm.objects.companies`, `crm.objects.deals`, plus associations read.
* OAuth would only become necessary if this became a listed HubSpot App installed across multiple client accounts — explicitly out of MVP scope (single adapter, one account at a time).

## Rate limits (tier-dependent)

| Tier | Burst | Daily |
|---|---|---|
| Free / Starter | 100 req / 10s | 250,000 / day |
| Professional | 190 req / 10s | 625,000 / day |
| Enterprise | 190 req / 10s | 1,000,000 / day |

* Burst limit is per private app; daily limit is shared across all apps on the account.
* **Search endpoints** (`/crm/v3/objects/{object}/search`) are capped separately and more strictly: **5 requests/second** per account.
* Over-limit calls return `429 Too Many Requests` with a `Retry-After` header.

**Design implication for 0.5:** the sync job must rate-limit its own outbound calls, back off with the `Retry-After` header on 429, and prefer bulk/batch endpoints and cursor pagination over per-record calls or repeated search calls — directly feeds the "idempotent, retry-safe" requirement in `CLAUDE.md`.

## Pagination

Standard list endpoints use cursor-based pagination (`after` param, `paging.next.after` in the response) — not offset-based. Sync logic should page through with the cursor and persist the last cursor/timestamp for incremental sync (task 1.3).

## Merge (duplicate resolution)

Researched to ground the `Duplicate Merge Workflow` section in `project.md` and task 2.7.

* Native merge endpoint exists per object: `POST /crm/v3/objects/{objectType}/merge`, one pair per call — `{"primaryObjectId": "<id>", "objectIdToMerge": "<id>"}`. Supported for contacts, companies, deals (MVP uses contacts/companies only), tickets, and custom objects. Requires `crm.objects.{type}.write`.
* **Survivor ID:** by default HubSpot creates a new merged record ID (old IDs redirect to it). A "Primary ID Preservation" beta keeps the primary's ID instead — verify per-account before relying on either behavior.
* **Associations/engagements are handled automatically by HubSpot** — deals, companies, tickets, notes, and timeline activity from both records carry onto the merged record. No caller-side reassignment needed. Where both records have a "primary" association, the primary record's link wins the primary label; the secondary's is kept but demoted, not dropped.
* **Field conflicts are resolved by HubSpot, not the caller:** primary record's current value wins; if primary is null/empty, secondary's value fills in. A few fields are special-cased (e.g., contacts: secondary email becomes an "additional email" rather than being discarded; lifecycle stage advances to whichever record is further along the funnel). The API gives no way to pre-supply per-field resolution — this is why the merge workflow's UI can only pick which record is primary, not which value wins per field.
* **No unmerge via API — merges are permanent.** HubSpot's own docs state this explicitly; the only recovery path is manual reconstruction from a snapshot (or third-party tools, unverified as HubSpot-native). This is why the merge workflow stores a full pre-merge snapshot instead of promising rollback.
* **Retry/idempotency of the merge call itself is not documented** — no confirmation that resubmitting a merge after a lost response is safe or errors cleanly on an already-archived object ID. Treat as unverified: check record state (archived / redirected ID) before ever retrying, rather than assuming idempotency.

Sources: [Contacts merge](https://developers.hubspot.com/docs/api-reference/latest/crm/objects/contacts/merge-contacts) · [Deals merge](https://developers.hubspot.com/docs/api-reference/crm-deals-v3/basic/post-crm-v3-objects-0-3-merge) · [Companies merge](https://developers.hubspot.com/docs/api-reference/crm-companies-v3/basic/post-crm-v3-objects-companies-merge) · [Merge records — Knowledge Base](https://knowledge.hubspot.com/records/merge-records) · [Merge functionality changelog](https://developers.hubspot.com/changelog/updated-merge-functionality-for-crm-objects-including-contacts-and-companies)

## Open questions for 0.5 (architecture)

* Incremental sync strategy: poll on a schedule using `hs_lastmodifieddate` filtering via Search API (mind the 5 req/s cap) vs. webhooks (not needed for MVP, single-portal, consultant-triggered audits).
* Where batching happens: sync worker should use batch read endpoints (`/batch/read`) rather than N individual GETs.

## Sources

* [CRM API | Companies — HubSpot docs](https://developers.hubspot.com/docs/api-reference/crm-companies-v3/guide)
* [HubSpot Associations API: v3 & v4 Explained](https://mpiresolutions.com/blog/hubspot-associations-api/)
* [API usage guidelines and limits — HubSpot docs](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines)
* [HubSpot API Rate Limits 2026 — Stacksync](https://www.stacksync.com/blog/beat-hubspot-api-rate-limits-stacksync-realtime-sync)
