# HubSpot CRM API — Notes

Working notes for pulling data and making the two approved fixes.

## Objects

Contacts, Companies, Deals.

* `GET /crm/v3/objects/{contacts|companies|deals}` — list (paginated)
* `POST /crm/v3/objects/{type}` — create (used by the seed script)
* `PATCH /crm/v3/objects/{type}/{id}` — update (owner assignment)
* Tasks are created through the CRM tasks object and associated to the record.

## Associations

Links between objects (deal → company/contact) are not embedded in the default response. Pass the `associations` query parameter (e.g. `?associations=companies,contacts`) or use the associations API.

## Authentication

A **Private App token** (Settings → Integrations → Private Apps), stored in an environment variable. Scopes: read and write on contacts, companies, deals, plus tasks. One consultant and one client account at a time, so no OAuth.

## Pagination

Cursor-based: pass `after` and follow `paging.next.after` until it's absent. Request properties explicitly (`properties=...`); the default response includes only a few.

## Rate limits

* Free/Starter: 100 requests / 10 seconds. Higher on Pro/Enterprise.
* Over the limit returns `429` with a `Retry-After` header: wait, then retry.
* At the data sizes here (hundreds of records, 100 per page) a full pull is a handful of calls, so this rarely matters. Handle 429 with a simple wait-and-retry.

## Sources

* [CRM API | Companies — HubSpot docs](https://developers.hubspot.com/docs/api-reference/crm-companies-v3/guide)
* [API usage guidelines and limits — HubSpot docs](https://developers.hubspot.com/docs/developer-tooling/platform/usage-guidelines)
