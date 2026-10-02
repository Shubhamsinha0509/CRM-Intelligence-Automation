# CRM RevOps Intelligence & Automation Platform

A tool that audits a client's HubSpot CRM, shows what is wrong and what to fix first, and applies approved fixes. It improves a CRM without replacing it.

Built as a college major project, a portfolio project, and a foundation for CRM/RevOps freelance work.

**Status:** Slice 0 — Foundation (planning).

* Product definition: [docs/project.md](docs/project.md)
* Roadmap: [docs/roadmap.md](docs/roadmap.md)

## Run

```bash
npm install
cp .env.example .env
npm run db:push     # create the SQLite database
npm run dev         # http://localhost:3000/health
npm test            # tests
npm run typecheck   # type check
```
