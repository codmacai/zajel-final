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
- Images uploaded in the admin go to the Supabase Storage bucket `cms-media` (JPG, PNG, WebP, AVIF, GIF).
- **Checks before saving** (`lib/cms/validate.ts`), shown next to each field as you type and repeated on
  the server: images must be uploaded (or be on this site), lists keep at least one item unless the
  section allows none, dates are real and end after they start, page addresses are unique, links are
  safe. Anything that could break a page can't be saved.
- **Messages**: the contact form (and the quote form on the freight pages, if switched back on) saves to
  `cms_messages`; the team reads, answers and marks them done under **Messages**. Support tickets are
  separate: they go to Freshdesk through the Zajel API, as before.
- The website re-reads the CMS at most every 5 minutes on its own, and immediately after each save.
- **News**: articles are written under **News → Articles** from blocks (paragraph, heading, quote,
  bullet list, photo). The newest three show on the home page (Latest news); each article has its
  own page at `/news/<page-address>`, is listed in the sitemap and shares with its cover photo.
  Code: `components/news/`, `app/news/[slug]/`.

## Setup

1. Run both files in `supabase/migrations/` once, in order, in Supabase → SQL Editor
   (`…_cms.sql`, then `…_cms_hardening.sql`, which adds the Messages inbox).
2. Set the environment variables listed in `.env.example` (Zajel CMS block) on the server.
3. In Supabase → Authentication:
   - turn off **Allow new users to sign up**;
   - add each editor under **Users → Add user** (tick *Auto confirm user*).
4. Optional: set `CMS_ADMIN_EMAILS` so only those emails can sign in.
5. On Vercel, set the function region to the Supabase region (Settings → Functions; Singapore is
   `sin1`), so each admin click doesn't cross the world twice.

## Code map

| | |
|---|---|
| `app/admin/` | Admin pages, server actions (`actions.ts`), styles (`admin.css`) |
| `components/cms/admin/` | Admin UI: shell and search, section list, editor, uploads |
| `lib/cms/registry.ts`, `lib/cms/pages/` | Every editable page and section, with field hints |
| `lib/cms/content.ts` | Merging saved content over built-in content, and cleaning saves |
| `lib/cms/validate.ts` | The checks run before a save (editor and server) |
| `lib/cms/fields.ts` | How each field is edited (text, image, link, list…) and its label |
| `lib/cms/store.ts` | Supabase reads and writes (content, history, uploads, messages) |
| `app/contact/actions.ts` | Receives website form messages (spam checks, limits) |
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
from the existing items (when a component picks an icon by item id, use `pickIcon()` from
`lib/cms/pick-icon.ts` so new items get one too).

Useful field hints: `fixed: true` (the design needs exactly this many items), `allowEmpty: true` (the
list may have none), `optional: true` (an image or date may be empty), `kind: 'date' | 'select' | 'slug'`
with `options` or `prefix`, `required: true` (must be filled in), `when: { key, is }` (a field used only
when a field next to it has one of those values, e.g. a block's photo only for "Image" blocks), and
`hidden: true` for values editors shouldn't change.
