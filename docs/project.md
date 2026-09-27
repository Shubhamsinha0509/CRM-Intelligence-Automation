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
             → Human approval → Execute → Audit log (with rollback)
```

## MVP Scope

**In scope**

* Read-only audit of HubSpot contacts, companies, and deals: data quality, duplicates, stale records, fill rates, health score
* Client-readable audit report
* Deterministic recommendations, including prevention advice
* Approval flow; audit log with previous values and rollback
* Two safe workflows: owner assignment and follow-up task creation
* Sales-ops detection: neglected leads, stuck/inactive deals, missing deal information
* AI for issue explanations and health summaries
* Thin dashboard

**Out of scope**

* CRM replacement or multiple CRM providers
* Generic automation platform or trigger/condition/action DSL
* Agent layer and natural-language analysis
* Duplicate auto-merge
* SaaS billing and multi-tenancy
* Unrestricted AI execution
* CI/CD and deployment (stretch)

Delivery is in vertical slices; see `roadmap.md`.

## Technical Core and Evaluation

* **Duplicate detection** treated as entity resolution, measured with precision and recall.
* **Issue prioritization** as an explainable score.
* **Reliable execution:** idempotent, retry-safe, with revalidation before applying an approved change and rollback.
* **Evaluation data:** a synthetic B2B dataset with labelled, injected defects. The data generator is kept separate from the detectors to avoid circular evaluation.
* **AI evaluated** against ground truth.

## AI Boundaries

AI may explain issues and summarize CRM health. CRM rules and detection are deterministic. AI performs no CRM writes. CRM data sent to an LLM is minimized and redacted.

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
7. Execute approved workflows with rollback.
8. Handle failures and retries safely.
9. Maintain an audit trail.
10. Provide meaningful, evaluated AI assistance.

## Principle

Build a reliable system that demonstrates the ability to **audit, improve, and automate a realistic CRM environment**.
