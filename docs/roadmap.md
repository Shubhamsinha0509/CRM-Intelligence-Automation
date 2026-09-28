# Roadmap

`[ ]` Not started · `[-]` In progress · `[x]` Completed

**Rule: work on one task at a time. Each slice must end in something demoable.**

Timeline: 10 weeks, solo.

---

## Slice 0 — Foundation (Week 1)

* [x] 0.1 Define primary user (consultant operates; client receives results)
* [x] 0.2 Define problem, target client, MVP boundary
* [x] 0.3 Study HubSpot objects/API; create free HubSpot account
* [ ] 0.4 Design synthetic messy dataset + evaluation plan (labelled ground truth)
* [ ] 0.5 Decide architecture: sync strategy, CRM adapter boundary, job queue
* [ ] 0.6 Initialize repo (outside OneDrive), backend skeleton, testing, PostgreSQL

## Slice 1 — Read-only audit (Weeks 2–4)

First sellable product.

* [ ] 1.1 Seed messy data into HubSpot
* [ ] 1.2 HubSpot authentication + data retrieval
* [ ] 1.3 Sync into PostgreSQL (incremental, rate-limit handling)
* [ ] 1.4 Missing / invalid / inconsistent data detectors + field fill rates
* [ ] 1.5 Stale record detector
* [ ] 1.6 Duplicate detection + precision/recall evaluation
* [ ] 1.7 Issue model, prioritization, health score
* [ ] 1.8 Client-readable audit report (HTML/PDF)
* [ ] 1.9 Test slice, demo on messy dataset

## Slice 2 — Safe actions (Weeks 5–6)

* [ ] 2.1 Deterministic recommendation model (incl. prevention advice)
* [ ] 2.2 Approval flow (API + minimal UI)
* [ ] 2.3 Audit log with previous values + rollback where supported
* [ ] 2.4 Workflow: lead/contact owner assignment
* [ ] 2.5 Sales-ops detectors: neglected leads, stuck/inactive deals, missing deal info
* [ ] 2.6 Workflow: follow-up task creation
* [ ] 2.7 Workflow: human-approved duplicate merge for Contacts/Companies (candidates from 1.6; diff + suggested primary; pre-merge snapshot, not automatic rollback; reconciliation check before retrying an uncertain merge — see `project.md`)
* [ ] 2.8 Retries, idempotency, stale-recommendation revalidation, failure tests

*2.7 is time-boxed to this slice. If the merge workflow isn't reliably demoable within Weeks 5–6, prioritize 2.4 and 2.6 for the Slice 2 demo and move duplicate merge to a later slice as stretch.*

## Slice 3 — AI (Week 7)

* [ ] 3.1 Define AI boundaries + PII minimization
* [ ] 3.2 Structured LLM integration
* [ ] 3.3 Issue explanations + health summary
* [ ] 3.4 Evaluate AI outputs

## Slice 4 — Interface & hardening (Week 8)

* [ ] 4.1 Dashboard, issue list/detail
* [ ] 4.2 Approval + audit/history views
* [ ] 4.3 Security basics (credentials, minimal auth)
* [ ] 4.4 Docker compose + run instructions

## Slice 5 — Report & portfolio (Weeks 9–10)

* [ ] 5.1 Major-project report (problem, method, implementation)
* [ ] 5.2 Evaluation results chapter
* [ ] 5.3 Before/after demo
* [ ] 5.4 Presentation
* [ ] 5.5 Sample audit + freelance case study
* [ ] 5.6 Buffer

## Freelance track (non-code, parallel)

* [-] F.1 HubSpot Academy free certification(s) — Revenue Operations Certification in progress
* [ ] F.2 Audit report template + discovery questionnaire
* [ ] F.3 Outreach: 1–2 discounted read-only audits (from Week 5)
* [ ] F.4 First paid engagement

## Stretch (not committed)

* Inactive-deal workflow
* Agent layer
* Salesforce adapter
* Natural-language analysis
* Automatic/bulk duplicate merge (unattended, no per-pair approval)
* CI/CD and deployment
