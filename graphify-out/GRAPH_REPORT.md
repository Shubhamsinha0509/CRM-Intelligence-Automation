# Graph Report - CRM-Intelligence & Automation  (2026-10-02)

## Corpus Check
- Corpus is ~6,187 words - fits in a single context window. You may not need a graph.

## Summary
- 58 nodes · 61 edges · 16 communities (6 shown, 10 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 112,993 output

## Community Hubs (Navigation)
- Project Overview & Sync Design
- MVP Scope & HubSpot Integration
- Sync & Action Run Architecture
- Rate Limiting & Retry Safety
- Adapter Boundary & Separation
- Duplicate Detection & Merge
- Evaluation Metrics & Success Criteria
- AI Boundaries & Determinism
- HubSpot Private App Auth
- Freelance Track
- Roadmap Slice 3
- Roadmap Slice 4
- Roadmap Slice 5
- Stretch Goals

## God Nodes (most connected - your core abstractions)
1. `ADR 0001: Sync Strategy, Adapter Boundary, Job Queue` - 7 edges
2. `Sync Strategy (on-demand, queued)` - 5 edges
3. `Slice 1 — Read-Only Audit` - 5 edges
4. `Audit Important Actions, Require Approval for Destructive Changes` - 4 edges
5. `Documentation Map (project/roadmap/architecture/decisions/workflows)` - 4 edges
6. `SyncRun Record` - 4 edges
7. `Job Queue (pg-boss)` - 4 edges
8. `ActionRun Record` - 4 edges
9. `Mapper Structural Validation` - 4 edges
10. `CRM RevOps Intelligence & Automation Platform (Project Definition)` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Audit Important Actions, Require Approval for Destructive Changes` --rationale_for--> `Duplicate Merge Workflow`  [INFERRED]
  CLAUDE.md → docs/project.md
- `Audit Important Actions, Require Approval for Destructive Changes` --rationale_for--> `ActionRun Record`  [INFERRED]
  CLAUDE.md → docs/architecture.md
- `Audit Important Actions, Require Approval for Destructive Changes` --rationale_for--> `SyncRun Record`  [INFERRED]
  CLAUDE.md → docs/architecture.md
- `Engineering Goals` --conceptually_related_to--> `Audit Important Actions, Require Approval for Destructive Changes`  [EXTRACTED]
  docs/project.md → CLAUDE.md
- `Roadmap Document` --references--> `Core Rule: One Task at a Time`  [EXTRACTED]
  docs/roadmap.md → CLAUDE.md

## Hyperedges (group relationships)
- **Sync Pipeline Design System** — docs_architecture_sync_strategy, docs_architecture_hubspotclient, docs_architecture_job_queue, docs_decisions_0001_sync_adapter_queue_adr, docs_hubspot_api_notes_rate_limits [INFERRED 0.85]
- **Duplicate Merge Workflow Group** — docs_project_duplicate_merge_workflow, docs_hubspot_api_notes_merge, docs_roadmap_slice2, docs_dataset_and_evaluation_plan_defect_taxonomy [INFERRED 0.80]
- **CLAUDE.md Governing Principles** — claude_hubspot_adapter_rule, claude_deterministic_ai_rule, claude_retry_safety_rule, claude_audit_approval_rule, claude_separation_of_concerns_rule [EXTRACTED 1.00]

## Communities (16 total, 10 thin omitted)

### Community 0 - "Project Overview & Sync Design"
Cohesion: 0.24
Nodes (8): Documentation Map (project/roadmap/architecture/decisions/workflows), Pagination Checkpointing, Sync Strategy (on-demand, queued), ADR 0001: Sync Strategy, Adapter Boundary, Job Queue, Cursor-Based Pagination, CRM RevOps Intelligence & Automation Platform (Project Definition), Roadmap Document, CRM RevOps Intelligence & Automation Platform (README)

### Community 1 - "MVP Scope & HubSpot Integration"
Cohesion: 0.22
Nodes (8): HubSpotClient Adapter Module, Mapper Structural Validation, Synthetic Dataset Generator, Associations API, HubSpot Objects in Scope (Contacts/Companies/Deals), MVP Scope, Slice 0 — Foundation, Slice 1 — Read-Only Audit

### Community 2 - "Sync & Action Run Architecture"
Cohesion: 0.38
Nodes (4): ActionRun Record, Job Queue (pg-boss), SyncRun Record, Technical Direction / Stack

### Community 3 - "Rate Limiting & Retry Safety"
Cohesion: 0.33
Nodes (3): Dual-Cap Reactive Rate Limiting, HubSpot Rate Limits (burst/daily tiers), Engineering Goals

### Community 5 - "Duplicate Detection & Merge"
Cohesion: 0.50
Nodes (5): Defect Taxonomy (D1-D9), Native Merge Endpoint Behavior, Duplicate Merge Workflow, CRM Problems Taxonomy, Slice 2 — Safe Actions

### Community 6 - "Evaluation Metrics & Success Criteria"
Cohesion: 0.67
Nodes (3): Evaluation Metrics Plan (precision/recall/F1), Ground Truth Labelling File, Success Criteria

## Knowledge Gaps
- **14 isolated node(s):** `HubSpotClient Adapter Module`, `Dual-Cap Reactive Rate Limiting`, `Associations API`, `Private App Token Authentication`, `CRM Problems Taxonomy` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 24 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ADR 0001: Sync Strategy, Adapter Boundary, Job Queue` connect `Project Overview & Sync Design` to `MVP Scope & HubSpot Integration`, `Rate Limiting & Retry Safety`, `Duplicate Detection & Merge`?**
  _High betweenness centrality (0.305) - this node is a cross-community bridge._
- **Why does `MVP Scope` connect `MVP Scope & HubSpot Integration` to `Adapter Boundary & Separation`?**
  _High betweenness centrality (0.160) - this node is a cross-community bridge._
- **Why does `Slice 1 — Read-Only Audit` connect `MVP Scope & HubSpot Integration` to `Duplicate Detection & Merge`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Audit Important Actions, Require Approval for Destructive Changes` (e.g. with `ActionRun Record` and `SyncRun Record`) actually correct?**
  _`Audit Important Actions, Require Approval for Destructive Changes` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `HubSpotClient Adapter Module`, `Dual-Cap Reactive Rate Limiting`, `Associations API` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._