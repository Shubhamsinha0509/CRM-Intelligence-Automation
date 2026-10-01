# Architecture

One Node/TypeScript/Express app with a SQLite database. No queue, no separate frontend.

```text
HubSpot ──(1) pull──▶ SQLite ──(2) detectors──▶ issues + health score
                                                    │
                                   (3) report / dashboard (HTML)
                                                    │
                       (4) client approves ──▶ fix written to HubSpot ──▶ change log
```

## Pieces

* **HubSpot module:** the only code that calls HubSpot. Pulls contacts, companies, deals and applies the two approved fixes. Waits and retries on 429.
* **Pull:** runs when the consultant starts an audit. Full pull, saved with upserts, so running it again is safe.
* **Detectors:** plain functions that read SQLite and return issues. No HubSpot calls, no AI.
* **Scoring:** turns issues into a priority and one health score.
* **Report and dashboard:** server-rendered HTML pages. The report can be printed to PDF from the browser.
* **Fixes:** approve/reject page. An approved fix is sent to HubSpot and written to the change log (what changed, previous value, when).
* **AI summary:** an LLM turns aggregated counts and issue types into plain-English explanations. It never sees raw personal data and never writes to HubSpot.

## Not included (stretch)

Background queue, scheduled syncs, rollback, duplicate merge, Docker, deployment.
