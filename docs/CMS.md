# Zajel CMS

Edit the text, images and Arabic of every page at **/admin**. Changes go live within seconds.

## How it works

- Every page section has **built-in content** in the code (for example `components/sea-freight/content.ts`).
  With nothing saved in the CMS, the site shows exactly that.
- When someone saves a section in `/admin`, its content is stored in Supabase (`cms_content`) and laid
  over the built-in content. Every save is also kept in `cms_history`, so it can be restored.
- Saving refreshes the affected pages straight away (`updateTag('cms')` + `revalidatePath`).
- **Arabic**: each text field has an Arabic field next to it, filled in from `locales/ar.json`.
  Arabic for edited text is served at `/cms/ar` and used by the site translator.
- Images uploaded in the admin go to the Supabase Storage bucket `cms-media`.

## Setup

1. Run `supabase/migrations/20261104000000_cms.sql` once in Supabase → SQL Editor.
2. Set the environment variables listed in `.env.example` (Zajel CMS block) on the server.
3. In Supabase → Authentication:
   - turn off **Allow new users to sign up**;
   - add each editor under **Users → Add user** (tick *Auto confirm user*).
4. Optional: set `CMS_ADMIN_EMAILS` so only those emails can sign in.

## Code map

| | |
|---|---|
| `app/admin/` | Admin pages, server actions (`actions.ts`), styles (`admin.css`) |
| `components/cms/admin/` | Admin UI: shell and search, section list, editor, uploads |
| `lib/cms/registry.ts`, `lib/cms/pages/` | Every editable page and section, with field hints |
| `lib/cms/content.ts` | Merging saved content over built-in content, and checking saves |
| `lib/cms/fields.ts` | How each field is edited (text, image, link, list…) and its label |
| `lib/cms/store.ts` | Supabase reads and writes |
| `lib/cms/auth.ts` | Admin sign-in (Supabase Auth) |
| `components/cms/CmsProvider.tsx` | `cmsSection()` / `useSection()` for client sections |
| `lib/cms/server.tsx` | `getSection()` / `serverSection()` / `cmsMetadata()` for server code |
| `lib/cms/seo.ts` | Each page's built-in Google title and description |

## Making a new section editable

1. Put its content in a plain object in the page's `content.ts` (no `'use client'` in that file).
2. Connect the component:
   - client component: `export default cmsSection('page.section', CONTENT, Component)`;
   - server component: `export default serverSection('page.section', CONTENT, Component)`.
   The component receives the content as its `content` prop.
3. List it in the page's file in `lib/cms/pages/` (same id, a label, and any field hints).
4. Pages with client sections wrap their `<main>` in `<CmsScope page="page-id">`.

Icons and anything else written as code stay in the code; list items added in the CMS borrow them
from the existing items. Use `fixed: true` in the hints when a design needs an exact number of items.
