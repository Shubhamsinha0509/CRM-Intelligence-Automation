# CRM RevOps Intelligence & Automation Platform

## Overview

A tool that audits a client's HubSpot CRM, shows what is wrong and what to fix first, and applies approved fixes. It is an **audit layer around HubSpot**, not a CRM replacement.

Goals:

* **Freelance:** an audit a consultant can run and sell to small businesses.
* **College major project:** a working, demonstrable system with measured results. Simple engineering, clear outcome.
* **Portfolio:** a case study with a before/after story.

## Users

**Primary user:** CRM/RevOps consultant who runs the tool for a client.

**Audience:** Client (small-business owner or sales lead) who receives the report and approves fixes.

## Target Client

A small B2B business on HubSpot with messy data and no dedicated RevOps person.

## Problems Solved

* Duplicate records
* Missing, invalid, or inconsistent data
* Stale records
* Unassigned or neglected leads
* Stuck or inactive deals
* No clear view of CRM health

## How It Works

```text
HubSpot → Pull data → Find issues → Score and rank → Report
        → Client approves a fix → Apply fix → Change log
```

Everything is on demand: the consultant runs an audit when needed. No schedules or background services.

## MVP Scope

**In scope**

* Read-only audit of Contacts, Companies, Deals: missing/invalid data, field fill rates, stale records, neglected leads, stuck deals, duplicates
* Health score and prioritized issue list
* Client-readable audit report with recommended fixes and prevention advice
* Two approved fixes: assign owner, create follow-up task
* Simple approval step and change log (what changed, previous value)
* AI-written summary and issue explanations
* Simple dashboard

**Out of scope**

* Replacing HubSpot; other CRMs
* Duplicate merge, rollback of fixes (stretch)
* Background queues, scheduled syncs, monitoring
* Agent layer, natural-language analysis
* Multi-tenancy, billing, deployment infrastructure

## Why Not Just HubSpot

HubSpot has native tools for parts of this, and the tier determines what is available. This project does not compete with those features. It gives a consultant one repeatable audit: issues ranked together, one health score, a client-ready report, and approved fixes, whichever HubSpot tier the client is on. Verify current HubSpot features and pricing before relying on any comparison.

## Approach

* **Simple HubSpot client:** one module talks to HubSpot (Private App token). It retries on rate limits (429). Each audit does a full pull into SQLite, using upserts so re-running is safe.
* **Deterministic detectors:** plain rules, no AI. Duplicates use simple matching (exact email, normalized company domain and name).
* **Evidence of quality:** a synthetic messy CRM with known, labelled defects (`docs/dataset-and-evaluation-plan.md`). Report precision/recall for the detectors and show a before/after score.
* **Safe writes:** every CRM change needs approval and is logged.
* **AI** only explains results. It never decides or writes. It receives aggregated counts, not raw personal data.

## Technical Direction

* Backend: Node.js, TypeScript, Express
* Database: SQLite, Prisma
* UI: simple server-rendered pages from the same Express app (no separate frontend)
* CRM: HubSpot
* AI: LLM API
* Dev data: synthetic CRM data (CSV fallback)

## Success Criteria

1. Pull realistic HubSpot data and produce a scored, prioritized audit.
2. Detect duplicates and data issues, with measured precision/recall.
3. Produce a client-readable report.
4. Apply approved fixes and show an improved score on re-audit.
5. AI summary that matches the real numbers.

## Principle

Deliver a clear, working outcome: **audit a messy CRM, report it well, fix it with approval, and show it improved.** Simple and reliable beats feature-heavy.
