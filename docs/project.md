# CRM RevOps Intelligence & Automation Platform

## Overview

A HubSpot-centered system that audits CRM data and sales processes, identifies problems, recommends corrective actions, and safely automates approved changes.

It is an **audit and automation layer around a CRM**, not a CRM replacement.

The project serves three purposes:

* A college major project (10 weeks, solo; report and presentation required)
* A technical portfolio project
* A foundation for CRM/RevOps freelance work

## Users

**Primary user: the CRM/RevOps consultant** who operates the tool on behalf of a client.

**Audience: the client**, typically a small-business owner or sales lead, who receives the audit report and approves changes.

Secondary: sales managers viewing health and pipeline results.

## Target Client

A small B2B business on HubSpot with messy CRM data and no dedicated RevOps person.

## Engagement Lifecycle

```text
Audit → Cleanup → Prevention → Monitoring
```

The MVP covers **audit** and **safe cleanup**, and recommends **prevention** (required fields, validation, duplicate management). Ongoing monitoring is future work.

## Problems

* Duplicate records
* Missing, invalid, or inconsistent data
* Stale records
* Unassigned or neglected leads
* Inactive or stuck deals
* No visibility into CRM health

## Workflow

```text
HubSpot data → Sync → Detect issues → Prioritize → Recommend
             → Human approval → Execute → Audit log (rollback where supported)
```

## MVP Scope

**In scope**

* Read-only audit of HubSpot contacts, companies, and deals: data quality, duplicates, stale records, fill rates, health score
* Client-readable audit report
* Deterministic recommendations, including prevention advice
* Approval flow; audit log with previous values, rollback where supported
* Three safe workflows: owner assignment, follow-up task creation, and human-approved duplicate merge (Contacts and Companies only)
* Sales-ops detection: neglected leads, stuck/inactive deals, missing deal information
* AI for issue explanations and health summaries
* Thin dashboard

**Out of scope**

* CRM replacement or multiple CRM providers
* Generic automation platform or trigger/condition/action DSL
* Agent layer and natural-language analysis
* Unattended/automatic duplicate merge (merge always requires explicit human approval per pair)
* SaaS billing and multi-tenancy
* Unrestricted AI execution
* CI/CD and deployment (stretch)

Delivery is in vertical slices; see `roadmap.md`.

## Why Not Just Use HubSpot's Native Tools

HubSpot's own duplicate management (ML-based) and data quality automation (field formatting rules) exist only on **Data Hub Professional ($720/mo) and Enterprise ($2,000/mo)**. Free and Starter tiers — where the target client (small B2B, no dedicated RevOps person) actually sits — have none of this.

Even on Pro/Enterprise, the native tools don't close the gap this project targets:

* Native dedup is manual-cleanup-scale, not built for automated, multi-object deduplication (contacts + companies + deals together).
* Native data quality automation is per-field formatting (capitalization, phone/date format) — not issue prioritization, not a health score, not a client-readable report.
* There is no native synthesis layer that scores, ranks, and explains CRM health across problem types. HubSpot users have open feature requests asking for exactly this.

This project is not duplicating a HubSpot feature — it targets the tier HubSpot doesn't sell data quality tooling to, and adds a prioritization/explanation/reporting layer HubSpot doesn't offer at any tier.

## Technical Core and Evaluation

* **Duplicate detection** treated as entity resolution, measured with precision and recall.
* **Issue prioritization** as an explainable score.
* **Reliable execution:** idempotent, retry-safe, with revalidation before applying an approved change; rollback where the underlying API supports it (see Duplicate Merge Workflow for the merge exception).
* **Evaluation data:** a synthetic B2B dataset with labelled, injected defects. The data generator is kept separate from the detectors to avoid circular evaluation.
* **AI evaluated** against ground truth.

## AI Boundaries

AI may explain issues and summarize CRM health. CRM rules and detection are deterministic. AI performs no CRM writes. CRM data sent to an LLM is minimized and redacted.

## Duplicate Merge Workflow

Scope: human-approved merge applies to **Contacts and Companies only**. Deals are excluded from the MVP merge workflow.

Candidate source: merge candidates come from the duplicate detection / entity-resolution layer (task 1.6). The merge workflow does not implement a second, independent matching system.

Approval model: the system presents a diff of the two records and suggests a primary record — the record with more populated properties wins; ties break to the older record by `createdAt`. The user can override the suggested primary, then must explicitly approve or reject the merge as a whole. There is no field-by-field value selection.

Merge execution: HubSpot performs the actual field conflict resolution on merge. The UI must clearly show which secondary-record values may be discarded under HubSpot's merge behavior, and make the irreversible nature of the operation explicit before approval.

Rollback exception: HubSpot record merges cannot be automatically undone through the API. Unlike the other approved workflows, merges are not rollback-capable — instead, the system stores a complete pre-merge snapshot of the affected records and their associations for auditability and manual reconstruction. This is not automatic rollback.

Retry/recovery: an uncertain merge request (e.g., response lost after send) is not blindly retried. The current state of the records is checked first; an already-completed merge is treated as a reconciliation case, not reissued.

## Technical Direction

* Frontend: Next.js, TypeScript, Tailwind
* Backend: Node.js, TypeScript, Express
* Database: PostgreSQL, Prisma
* Background jobs: queue (Redis, or a Postgres-backed queue if simpler)
* Docker
* CRM: HubSpot, behind an adapter boundary
* AI: LLM API
* Development data: synthetic CRM data (CSV as fallback)

## Engineering Goals

Separation of responsibilities, validation, testing, security, error handling, observability, background processing, retry safety, idempotency, rate-limit handling, auditability.

## Success Criteria

1. Ingest realistic HubSpot data.
2. Audit CRM health.
3. Detect data-quality and sales-operation problems.
4. Detect duplicates with measured precision and recall.
5. Prioritize issues.
6. Recommend corrective and preventive actions.
7. Execute approved workflows with rollback where supported.
8. Handle failures and retries safely.
9. Maintain an audit trail.
10. Provide meaningful, evaluated AI assistance.

## Principle

Build a reliable system that demonstrates the ability to **audit, improve, and automate a realistic CRM environment**.
