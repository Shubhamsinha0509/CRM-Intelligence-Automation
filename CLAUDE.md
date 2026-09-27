# Claude Code Instructions

## Core Rule

Work on **one task at a time**. Do not implement future tasks, unrelated features, or speculative abstractions.

## Before Coding

1. Read `CLAUDE.md`, `docs/project.md`, and `docs/roadmap.md`.
2. Identify the current task.
3. Inspect relevant code/docs.
4. State the implementation approach briefly.
5. Ask if requirements are unclear.

## During Coding

* Follow the existing architecture and conventions.
* Prefer simple, maintainable solutions.
* Reuse existing code.
* Avoid unnecessary dependencies and refactors.
* Do not modify unrelated files.
* Keep domain, infrastructure, and presentation concerns separated.
* Use deterministic logic for CRM rules and automation.
* Use AI only where it provides clear value.
* Never allow unrestricted AI-driven CRM writes.

## CRM / HubSpot

This is a **HubSpot-centered CRM/RevOps system**, not a CRM replacement or generic automation platform.

* Work in vertical slices; each slice must be demoable.
* Validate external CRM data.
* Keep HubSpot-specific logic behind an adapter; implement HubSpot only.
* Handle API failures and rate limits.
* Make integrations retry-safe and idempotent.
* Audit important CRM actions.
* Require approval for destructive/high-impact actions.
* CSV is primarily for development/testing.

## Verification

Before completing a task:

* Run relevant tests.
* Run type checking/linting when configured.
* Run the build when relevant.
* Test failure/retry behavior for changed workflows.

## Documentation

* `docs/project.md` → product definition
* `docs/roadmap.md` → next tasks
* `requirements.md` → requirements
* `architecture.md` → system design
* `decisions/` → technical decisions
* `workflows/` → subsystem behavior

Update relevant documentation after implementation.

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
3. Update relevant documentation.
4. Summarize changes.
5. State the next task.
6. STOP.

**Inspect → understand → implement → verify → document → stop.**
