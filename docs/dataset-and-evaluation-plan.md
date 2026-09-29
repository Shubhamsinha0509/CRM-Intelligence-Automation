# Synthetic Dataset & Evaluation Plan (Task 0.4)

Design for the synthetic messy dataset used to develop and evaluate the detectors in Slice 1, and
the evaluation methodology used to measure them. This is a design document — the generator itself
is implemented in task 1.1 once the repo skeleton (0.6) exists.

## Why synthetic data

Real client data has no known ground truth — there's no way to know precision/recall against it.
A synthetic dataset with **injected, labelled defects** is the only way to measure detector
correctness (`project.md` → Technical Core and Evaluation). Real client data is still used later
(freelance track) for qualitative validation, not for precision/recall numbers.

## Generator/detector separation

The generator and the detectors must not share code or assumptions about *how* a defect is
represented — otherwise evaluation becomes circular (a detector "correctly" finding exactly the
pattern the generator happens to produce, rather than the pattern a messy CRM actually produces).

* The generator lives in its own module (e.g. `data/generator/`, decided in 0.6), independent of
  the detector modules in the backend.
* The generator's *output* is either:
  * HubSpot-object-shaped JSON (matching the real `crm/v3/objects/{type}` shape) — used to seed a
    real HubSpot sandbox account for task 1.1, so detectors are exercised through the same sync
    path (HubSpot → Postgres) they'll use in production.
  * CSV — fallback for fast local iteration without hitting the HubSpot API (`project.md`: "CSV is
    primarily for development/testing").
* The generator writes defects using realistic mechanisms (e.g., a typo'd duplicate, a truncated
  phone number) — it does not simply set an `isDuplicate: true` flag on the record itself. That
  flag only exists in the separate ground truth file (below), which detectors never read.

## Dataset shape

Small enough to hand-verify every injected defect, large enough for a defensible precision/recall
number.

| Object | Count | Notes |
|---|---|---|
| Companies | ~60 | includes exact and near-duplicate company clusters |
| Contacts | ~250 | 2–5 contacts per company on average |
| Deals | ~150 | associated to companies/contacts; spread across a typical pipeline (4–6 stages) |

Field set is limited to the standard HubSpot properties the MVP detectors actually use, so the
generator doesn't build fields nothing reads:

* **Contacts:** `email`, `firstname`, `lastname`, `phone`, `lifecyclestage`, `hs_lead_status`,
  `hubspot_owner_id`, `createdate`, `lastmodifieddate`, `notes_last_contacted` (or last-activity
  timestamp), association to company.
* **Companies:** `name`, `domain`, `phone`, `city`/`state`/`country`, `industry`, `createdate`,
  `lastmodifieddate`.
* **Deals:** `dealname`, `amount`, `dealstage`, `pipeline`, `closedate`, `hubspot_owner_id`,
  `createdate`, `lastmodifieddate` (or stage-entry timestamp), association to company/contact.

## Defect taxonomy

Each defect type below maps directly to a `project.md` → Problems entry and to a Slice 1/2
detector task, so nothing is generated that nothing will detect.

| # | Defect type | Maps to | Injection method |
|---|---|---|---|
| D1 | Exact duplicate | Duplicate records (1.6) | Identical record re-inserted with a new ID |
| D2 | Near-duplicate (typo/format) | Duplicate records (1.6) | Same entity, one field perturbed: typo in name, `.` vs no `.` in domain, phone with/without formatting, nickname vs full name |
| D3 | Cross-field duplicate | Duplicate records (1.6) | Same person/company inferable only via a secondary field (e.g. same phone, different email domain due to job change) — a harder tier |
| D4 | Missing required field | Missing data (1.4) | Required field (email, company name, deal amount) left blank |
| D5 | Invalid field value | Invalid data (1.4) | Malformed email, non-numeric phone, negative/zero deal amount, close date in the past for an open deal |
| D6 | Inconsistent formatting | Inconsistent data (1.4) | Mixed case, inconsistent date formats, inconsistent country naming ("USA" vs "United States") across otherwise-valid records |
| D7 | Stale record | Stale records (1.5) | `lastmodifieddate` set far in the past relative to "now" (generator's synthetic clock) with no recent activity |
| D8 | Unassigned/neglected lead | Neglected leads (2.5) | `hubspot_owner_id` null, or owned but no activity within the neglect threshold |
| D9 | Stuck/inactive deal | Stuck deals (2.5) | Deal stage unchanged for longer than a stage-specific threshold; open deal past its `closedate` |

Duplicate defects (D1–D3) are generated in **clusters**, not just pairs — a cluster can have 2–4
records referring to the same real-world entity, since HubSpot duplicate sets in practice are
often >2 records. Difficulty tiers (D1 exact / D2 near / D3 cross-field) let evaluation report
recall broken down by difficulty, not just a single aggregate number.

A clean subset (no injected defects) is included in every generated dataset so precision can be
measured against true negatives, not just recall against true positives.

## Ground truth labelling

The generator writes two artifacts per run, sharing a run/seed ID:

1. **The dataset itself** — what the detectors and sync pipeline consume (HubSpot-shaped JSON or
   CSV). Contains no defect labels.
2. **A ground truth file** (JSON) — never read by any detector, only by the evaluation harness:
   ```json
   {
     "runId": "...",
     "seed": 12345,
     "records": {
       "<record-id>": { "defects": ["D4", "D6"] }
     },
     "duplicateClusters": [
       { "clusterId": "c1", "recordIds": ["...", "..."], "objectType": "contact", "tier": "D2" }
     ],
     "neglectedLeads": ["<record-id>", "..."],
     "stuckDeals": ["<record-id>", "..."]
   }
   ```
   The seed makes generation reproducible so a failing evaluation run can be replayed exactly.

## Evaluation plan

Metrics are computed by comparing each detector's output against the ground truth file for the
same run. No detector code path may read the ground truth file at runtime — the evaluation harness
is a separate script that runs after detection completes.

| Detector | Metric | Notes |
|---|---|---|
| Duplicate detection (1.6) | Precision, recall, F1 — overall and per difficulty tier (D1/D2/D3) | Pairwise: a detector "hit" is a candidate pair where both records are in the same ground-truth cluster |
| Missing/invalid/inconsistent (1.4) | Precision, recall per defect type (D4/D5/D6) | Field-level: did the detector flag the specific field that was perturbed |
| Field fill rate | Compared directly against the known injection rate | Sanity check, not precision/recall — it's a count, not a classifier |
| Stale records (1.5) | Precision, recall | Threshold-based; also sanity-check behavior right at the threshold boundary |
| Neglected leads / stuck deals (2.5) | Precision, recall | Same pattern as stale records |
| Health score (1.7) | Directional sanity check only | No ground-truth "correct" score exists. Verify the score decreases monotonically as more defects are injected into an otherwise-clean dataset, and that removing a defect (simulating cleanup) increases it. |
| AI issue explanations / summaries (3.3/3.4) | Out of scope for this plan | Evaluated separately in Slice 3 against a rubric/ground truth for explanation quality, not against this dataset's defect labels |

Target thresholds are not fixed yet — they'll be set once the first detector (1.6, duplicate
detection) produces a baseline number, since "good enough" precision/recall depends on what's
achievable on this defect taxonomy, not on an arbitrary target picked in advance.

## Relationship to later tasks

* **1.1 (seed messy data into HubSpot)** implements this generator and pushes its HubSpot-shaped
  output into the sandbox account via the create endpoints, then the normal sync path (1.2/1.3)
  pulls it back — so detectors are always tested through the same pipeline as production.
* **1.6, 1.4, 1.5, 2.5** each get their precision/recall numbers from this same generated dataset
  and the same ground truth file format, so results are comparable across detectors.
* Re-running the generator with a new seed produces a second, independent dataset for held-out
  validation once detectors are tuned against the first.
