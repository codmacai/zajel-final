# CMS

Admin at `/admin`. Content is stored in Supabase and laid over the defaults in each page's `content.ts`.
With nothing saved, the site shows the defaults.

## Setup

1. Run `supabase/migrations/20261104000000_cms.sql`, then `20261110000000_cms_hardening.sql`, in the Supabase SQL Editor.
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` and `CMS_ADMIN_EMAILS` (see `.env.example`).
3. In Supabase Auth, disable sign-ups and add editors under Users.

## Notes

- Tables: `cms_content` (one row per section, `en` content and `ar` translations), `cms_history` (every save).
- Images go to the `cms-media` storage bucket.
- Saving revalidates the `cms` tag; pages also revalidate every 5 minutes.
- Arabic for edited text is served at `/cms/ar` and picked up by `lib/i18n/translator.ts`.
- Page on/off is stored in the `global.pages` row; pages call `notFoundIfHidden()`.
- Careers jobs come from the careers portal feed (`lib/careers/jobFeed.ts`), not the CMS.
- Support tickets, tracking, rates and accounts use the Zajel API, not the CMS.

## Code

| Path | |
|---|---|
| `app/admin/` | Admin pages, server actions, styles |
| `components/cms/` | Admin UI, `CmsProvider`, `CmsScope` |
| `lib/cms/registry.ts`, `lib/cms/pages/` | Editable pages and sections, field hints |
| `lib/cms/content.ts` | Merging and sanitising content |
| `lib/cms/validate.ts` | Save validation |
| `lib/cms/fields.ts` | Field types and labels |
| `lib/cms/store.ts` | Supabase access |
| `lib/cms/auth.ts` | Admin sign-in |
| `lib/cms/server.tsx` | `getSection`, `serverSection`, `cmsMetadata` |

## Adding a section

1. Move its content into the page's `content.ts`.
2. Wrap the component with `cmsSection('page.section', CONTENT, Component)` (client) or `serverSection(...)` (server).
3. Register it in `lib/cms/pages/`.
4. Pages with client sections wrap `<main>` in `<CmsScope page="page-id">`.

Field hints: `hidden`, `fixed`, `allowEmpty`, `optional`, `required`, `kind` (`date`, `select`, `slug`, …), `options`, `prefix`, `when`.
