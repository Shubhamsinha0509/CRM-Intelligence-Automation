# Messy Test Dataset & Evaluation (Task 0.4)

A small synthetic CRM with known, labelled problems, so we can check that the detectors actually find them and report real precision/recall. Real client data has no answer key, so it can't give those numbers.

## Dataset

Seeded into a free HubSpot account (task 1.1) and read back through the normal pull (1.2), so the audit is tested the same way it will run for a client.

| Object | Count |
|---|---|
| Companies | ~40 |
| Contacts | ~150 |
| Deals | ~80 |

Only the standard HubSpot properties the detectors use:

* **Contacts:** email, first/last name, phone, lifecycle stage, owner, create/last-modified date, last-contacted date, company
* **Companies:** name, domain, phone, country, industry, create/last-modified date
* **Deals:** name, amount, stage, close date, owner, create/last-modified date, company/contact

## Injected problems

| # | Problem | Example |
|---|---|---|
| 1 | Duplicate | Same person or company twice: identical, or with a typo, different casing, or a formatted vs unformatted phone/domain |
| 2 | Missing value | Blank email, company name, or deal amount |
| 3 | Invalid value | Malformed email, non-numeric phone, zero/negative deal amount |
| 4 | Inconsistent format | "USA" vs "United States", mixed name casing |
| 5 | Stale record | Not modified or contacted for a long time |
| 6 | Neglected/stuck | Lead with no owner or no recent contact; open deal stuck in a stage or past its close date |

A set of clean records (no injected problems) is included so precision can be measured, not just recall.

## Answer key

The generator writes a small `ground-truth.json` next to the data listing which records got which problem, and which records are duplicates of each other. Detectors never read it; only the evaluation script does. The generator is a separate script from the detectors so we don't just test a detector against its own assumptions.

Re-running the generator with a different seed gives a second dataset to check the detectors against.

## Evaluation

| What | How |
|---|---|
| Duplicate detection | Precision and recall on record pairs |
| Missing / invalid / inconsistent / stale / neglected | Precision and recall per problem type |
| Fill rates | Compare with the known injection rates |
| Health score | Sanity check: score goes down as problems are added and up after fixes |
| Before/after | Audit, apply approved fixes, re-audit: score and issue count improve |

No target numbers up front. Set them once the first detector gives a baseline.
