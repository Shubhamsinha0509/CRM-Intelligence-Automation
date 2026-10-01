# Graph Report - CRM-Intelligence & Automation  (2026-10-02)

## Corpus Check
- 7 files · ~2,367 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 52 nodes · 36 edges · 21 communities (3 shown, 18 thin omitted)
- Extraction: 44% EXTRACTED · 56% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.88)
- Token cost: 0 input · 91,593 output

## Community Hubs (Navigation)
- Project Overview & Docs Policy
- HubSpot Module & API Guidelines
- Detection Approach & Coding Rules
- MVP Scope & Roadmap Slices
- Dataset Plan & Project Status
- Fixes Component & Target Users
- Architecture Overview & Tech Stack
- Data Pull & Pagination
- Evaluation Methodology
- Completion Checklist
- Git Workflow
- Verification Steps
- Pipeline Architecture
- Report Dashboard
- Scoring Component
- HubSpot Associations API
- How It Works
- Problems Solved
- Success Criteria
- Target Client

## God Nodes (most connected - your core abstractions)
1. `CRM RevOps Intelligence & Automation Platform (Product Definition)` - 5 edges
2. `MVP Scope` - 4 edges
3. `Approach` - 4 edges
4. `Documentation Policy` - 3 edges
5. `Project Overview (README)` - 3 edges
6. `HubSpot Module` - 3 edges
7. `Detectors Component` - 3 edges
8. `HubSpot Rate Limits (429)` - 3 edges
9. `Roadmap Overview (10-Week Solo Timeline)` - 3 edges
10. `Before Coding Workflow` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Core Rule: One Task at a Time` --semantically_similar_to--> `Guiding Principle`  [INFERRED] [semantically similar]
  CLAUDE.md → docs/project.md
- `Before Coding Workflow` --references--> `CRM RevOps Intelligence & Automation Platform (Product Definition)`  [EXTRACTED]
  CLAUDE.md → docs/project.md
- `During Coding Guidelines` --conceptually_related_to--> `Approach`  [INFERRED]
  CLAUDE.md → docs/project.md
- `CRM / HubSpot Guidelines` --conceptually_related_to--> `HubSpot Module`  [INFERRED]
  CLAUDE.md → docs/architecture.md
- `CRM / HubSpot Guidelines` --conceptually_related_to--> `HubSpot Rate Limits (429)`  [INFERRED]
  CLAUDE.md → docs/hubspot-api-notes.md

## Hyperedges (group relationships)
- **Audit Pipeline Components** — docs_architecture_hubspot_module, docs_architecture_pull, docs_architecture_detectors, docs_architecture_scoring, docs_architecture_report_dashboard, docs_architecture_fixes, docs_architecture_ai_summary [EXTRACTED 1.00]
- **AI and Write Safety Guardrails** — claude_during_coding, claude_crm_hubspot_guidelines, docs_project_approach, docs_architecture_ai_summary [INFERRED 0.85]
- **Ten-Week Roadmap Slices** — docs_roadmap_slice0, docs_roadmap_slice1, docs_roadmap_slice2, docs_roadmap_slice3, docs_roadmap_slice4 [EXTRACTED 1.00]

## Communities (21 total, 18 thin omitted)

### Community 0 - "Project Overview & Docs Policy"
Cohesion: 0.43
Nodes (6): Before Coding Workflow, Documentation Policy, CRM RevOps Intelligence & Automation Platform (Product Definition), Freelance Track, Roadmap Overview (10-Week Solo Timeline), Project Overview (README)

### Community 1 - "HubSpot Module & API Guidelines"
Cohesion: 0.38
Nodes (5): HubSpot Module, HubSpot CRM Objects API, HubSpot API Documentation Sources, HubSpot CRM API -- Companies Guide, HubSpot API Usage Guidelines and Limits

### Community 3 - "MVP Scope & Roadmap Slices"
Cohesion: 0.29
Nodes (6): Not Included (Stretch) List, Synthetic Dataset Specification, MVP Scope, Slice 1 -- Audit and Report, Slice 2 -- Approved Fixes, Slice 3 -- AI Summary and Dashboard

## Knowledge Gaps
- **24 isolated node(s):** `Verification Steps`, `Git Commit Workflow`, `Completion Checklist`, `Slice 0 Foundation Status`, `Audit Pipeline Flow` (+19 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 34 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 4 inferred relationships involving `MVP Scope` (e.g. with `Not Included (Stretch) List` and `Slice 1 -- Audit and Report`) actually correct?**
  _`MVP Scope` has 4 INFERRED edges - model-reasoned connections that need verification._
- **Are the 4 inferred relationships involving `Approach` (e.g. with `During Coding Guidelines` and `AI Summary Component`) actually correct?**
  _`Approach` has 4 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Verification Steps`, `Git Commit Workflow`, `Completion Checklist` to the rest of the system?**
  _24 weakly-connected nodes found - possible documentation gaps or missing edges._