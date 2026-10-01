# Roadmap

`[ ]` Not started · `[-]` In progress · `[x]` Completed

**Rules: one task at a time. Each slice ends in something demoable. Keep it simple; the outcome matters more than the process.**

**Timeline: 10 weeks, solo.**

---

## Slice 0 — Foundation (Week 1)

* [x] 0.1 Define primary user (consultant operates; client receives results)
* [x] 0.2 Define problem, target client, MVP boundary
* [x] 0.3 Study HubSpot objects/API; create free HubSpot account
* [x] 0.4 Design synthetic messy dataset + evaluation plan
* [ ] 0.5 Initialize repo (outside OneDrive), backend skeleton, PostgreSQL, basic tests

**Outcome:** A running project skeleton.

---

## Slice 1 — Audit and Report (Weeks 2–4)

**The sellable product. Read-only.**

* [ ] 1.1 Seed messy data into HubSpot
* [ ] 1.2 Pull Contacts, Companies, Deals from HubSpot into PostgreSQL
* [ ] 1.3 Detectors: missing/invalid/inconsistent values, field fill rates, stale records
* [ ] 1.4 Duplicate detection (simple rules) + precision/recall check on the synthetic data
* [ ] 1.5 Issue list, priority, health score
* [ ] 1.6 Client-readable audit report (HTML/PDF) with recommended fixes
* [ ] 1.7 Demo on the messy dataset

**Outcome:** Connect HubSpot → get a scored, readable audit report.

---

## Slice 2 — Approved Fixes (Weeks 5–6)

* [ ] 2.1 Detect unassigned/neglected leads and stuck deals
* [ ] 2.2 Approve/reject a recommended fix (simple page)
* [ ] 2.3 Fix: assign owner to unassigned leads
* [ ] 2.4 Fix: create follow-up task for neglected leads/deals
* [ ] 2.5 Change log (what changed, previous value, when)
* [ ] 2.6 Before/after demo: audit → approve → fix → re-audit shows improvement

**Outcome:** The CRM visibly improves with the client's approval.

---

## Slice 3 — AI Summary and Dashboard (Weeks 7–8)

* [ ] 3.1 LLM-written health summary and issue explanations (aggregated counts only, no raw personal data), checked against the real numbers
* [ ] 3.2 Simple dashboard: health score, issues, approvals, change log
* [ ] 3.3 README with run instructions

**Outcome:** A product demoable start to finish, with a report that reads like a consultant wrote it.

---

## Slice 4 — Report and Portfolio (Weeks 9–10)

* [ ] 4.1 Major-project report (problem, approach, results)
* [ ] 4.2 Results: detector precision/recall, before/after score
* [ ] 4.3 Presentation
* [ ] 4.4 Sample audit + freelance case study
* [ ] 4.5 Buffer

---

## Freelance Track (parallel, non-code)

* [-] F.1 HubSpot Academy free certification(s) — Revenue Operations Certification in progress
* [ ] F.2 Audit report template + discovery questionnaire
* [ ] F.3 Outreach for 1–2 discounted audits (once a sample audit exists, end of Slice 1)
* [ ] F.4 First paid engagement

---

## Stretch (not committed)

* Duplicate merge with approval
* Rollback of fixes
* Docker, CI/CD, deployment
* Scheduled syncs, background queue
* Agent layer, other CRMs
