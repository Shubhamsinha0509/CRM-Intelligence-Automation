# Claude Code Instructions

## Core Rule

Work on **one task at a time**. Do not implement future tasks, unrelated features, or speculative abstractions.

**Keep it simple.** This is a freelance-oriented audit tool and a college major project. The outcome (a clear audit, a good report, approved fixes, a before/after demo) matters more than heavy engineering. When in doubt, pick the simpler option.

## Before Coding

1. Read `CLAUDE.md`, `docs/project.md`, and `docs/roadmap.md`.
2. Identify the current task.
3. Inspect relevant code/docs.
4. State the implementation approach briefly.
5. Ask if requirements are unclear.

## During Coding

* Prefer the simplest solution that works.
* Reuse existing code; avoid new dependencies and refactors.
* Do not modify unrelated files.
* Do not add queues, abstraction layers, or frameworks unless the current task needs them.
* Use deterministic logic for CRM rules and detection.
* Use AI only to explain results.
* Never let AI write to the CRM.

## CRM / HubSpot

This is a **HubSpot-centered audit tool**, not a CRM replacement or generic automation platform.

* Work in vertical slices; each slice must be demoable.
* Keep HubSpot calls in one module; implement HubSpot only.
* Check that data from HubSpot has the expected shape before using it, but keep messy values as they are; finding them is the point.
* Retry on HubSpot rate limits (429) and report other API errors clearly.
* CRM writes need explicit approval and are recorded in a simple change log (what changed, previous value).
* Use upserts so re-running a pull is safe.
* CSV is for development/testing only.

## Verification

Before completing a task:

* Run relevant tests (a few focused tests, not exhaustive coverage).
* Run type checking/linting when configured.
* Check that the task's demo works.

## Documentation

* `docs/project.md` → product definition
* `docs/roadmap.md` → tasks
* `README.md` → how to run

Update these only if the task changes them. Do not create extra documents unless asked.

## Git

After verification:

```bash
git add .
git commit -m "complete task X.X"
```

Keep commits task-focused.

## Completion

1. Verify.
2. Update `docs/roadmap.md`.
3. Summarize changes.
4. State the next task.
5. STOP.

**Inspect → implement → verify → stop.**
