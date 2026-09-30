# cv-builder

A PDF CV generator built with [`@react-pdf/renderer`](https://react-pdf.org/). It works along three independent dimensions:

- **CVs**: the content. Each CV is a self-contained file `cv/<name>.ts`, with no base version to derive from;
- **layouts**: how a CV is laid out. Each CV declares its own. Available: `sidebar`, a single A4 page with a coloured sidebar on the left and a main column;
- **themes**: default (`out/cv-<name>.pdf`) and high contrast, black on white with no coloured backgrounds, suited to black-and-white printing (`out/cv-<name>-hc.pdf`).

## Commands

`build`, `watch` and `check` take the name of the CV to generate, i.e. the file name in `cv/` without extension. Without a name, or with an unknown one, the command stops and lists the available CVs. Use `--theme high-contrast` for the high-contrast theme.

The live preview (`npm run dev`) has a side menu listing every CV in `cv/` alphabetically, plus a theme switch; the optional name selects the CV opened at startup.

```sh
npm install
npm run build -- <name>                          # generates out/cv-<name>.pdf
npm run build -- <name> --theme high-contrast    # generates out/cv-<name>-hc.pdf
npm run watch -- <name>                          # regenerates on every change
npm run check -- <name>                          # checks the page count expected by the layout
npm run dev [-- <name>]                          # live preview in the browser, http://localhost:5173
npm run typecheck                                # type-checks code and CVs

# try it with the bundled sample CV
npm run build -- esempio
```

## Creating a CV

A CV is a file `cv/<name>.ts` whose **default** export is an object of type `CvData` (defined in `src/data/types.ts`). The file name is the name you generate it with: `cv/jane.ts` is built with `npm run build -- jane` and produces `out/cv-jane.pdf`.

Only `cv/esempio.ts`, with fictitious data, is tracked in the repository: every other file in `cv/` is ignored by `.gitignore`, so real CVs stay on your machine.

### 1. Start from the sample

```sh
cp cv/esempio.ts cv/jane.ts      # on Windows: copy cv\esempio.ts cv\jane.ts
npm run dev -- jane              # opens the preview on the new CV
```

Keep the preview open while you write: the PDF refreshes every time you save the file. Since the file is typed, your editor flags missing or misspelled fields right away.

The sample CV is written in Italian; all the text, section titles included, comes from the CV file, so you can write yours in any language.

### 2. Fill in the data

The file skeleton:

```ts
import type { CvData } from '../src/data/types';

const cv: CvData = {
  layout: 'sidebar',
  contacts: { /* … */ },
  lang: 'en',
  headline: '…',
  labels: { /* … */ },
  profile: ['…'],
  employers: [ /* … */ ],
  skills: [ /* … */ ],
  certifications: [ /* … */ ],
  education: [ /* … */ ],
  languages: [ /* … */ ],
  interests: [ /* … */ ],   // optional
  privacy: '…',             // optional
};

export default cv;
```

**Header and settings**

| Field | Content | Shown in |
| --- | --- | --- |
| `layout` | layout used to render the CV (currently only `'sidebar'`) | — |
| `lang` | document language, e.g. `'en'` or `'it'` | PDF metadata |
| `contacts` | `name`, `email`, `phone`, `linkedin`, `instagram`, `location`; all required | name at the top of the sidebar, the rest in the contacts block |
| `headline` | job title under the name; use `\n` for a line break | sidebar, under the name |
| `labels` | section titles: `contacts`, `profile`, `experience`, `skills`, `certifications`, `education`, `languages`, `interests` | each section |

Write `linkedin` and `instagram` without `https://` (e.g. `linkedin.com/in/jane`): they become clickable links in the PDF.

**Main column**

- `profile`: one or more introductory paragraphs (one array item per paragraph).
- `employers`: work experience, grouped by employer. Each employer has `company`, `role` (your position), `period` and `experiences`.

Each entry in `experiences` has:

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | name of the project or activity |
| `role` | no | specific role; omit it when it matches the employer's |
| `period` | no | omit it when it matches the employer's |
| `context` | no | short context, shown in grey after the role (e.g. the industry) |
| `intro` | no | introductory sentence |
| `bullets` | no | bullet points |
| `subInitiatives` | no | sub-projects, each with a `title`, optional `period` and `intro`, and `bullets` |

A bullet point has an optional `title`, shown in bold before a colon, and a `text`:

```ts
{ title: 'Migration', text: 'services moved to the cloud with progressive rollouts.' }
```

To add links:

```ts
// a link on part of the text
{ text: ['winner of the ', { text: 'Best Game', href: 'https://…' }, ' award.'] }

// the whole text as a link
{ title: 'Portfolio', text: 'example.com', href: 'https://example.com' }

// a row of links only, each preceded by a link icon
{ links: [{ text: 'Article', href: 'https://…' }, { text: 'Demo', href: 'https://…' }] }
```

**Sidebar**

- `skills`: skill groups, each with an `area` (the group title) and `items` (a single string, usually comma-separated).
- `certifications`: `name` and `date`.
- `education`: `title`, `school` and `period`.
- `languages`: `name` and `level`.

**Optional**

- `interests`: last section of the main column, using the same bullet points as experiences; omitted when missing.
- `interestsQr`: a URL rendered as a QR code next to the interests, handy on printed copies.
- `privacy`: the data-processing consent clause, printed small and vertically along the edge of the sidebar.

### 3. Generate and check

```sh
npm run build -- jane && npm run check -- jane
npm run build -- jane --theme high-contrast      # version for black-and-white printing
```

`check` verifies that the PDF has the page count expected by the layout: the `sidebar` layout must fit on **one page**. If it overflows:

- shorten the text or drop the least important points before considering a smaller font;
- look for lines that wrap for a single word: rephrasing them saves space without losing content;
- check visually that the sidebar does not run off the bottom edge (the last block, languages, must be visible): an overlong sidebar still produces a one-page PDF, so `check` does not catch it.

The font only includes Latin characters: symbols such as arrows (`→`) are not rendered.

### Multiple CVs

CVs are independent: you can keep several in `cv/` (for example one per role or per language), and changing one never affects the others. The preview (`npm run dev`) lists them all in its side menu.

## Layouts

Each layout lives in `src/layouts/<name>/` with its own document, components and theme (colour roles and sizes). Shared across layouts: colour primitives, fonts and theme selection (`src/theme.ts`), and the generic `LinkIcon` and `QrCode` components (`src/components/`).

To create a layout:

1. create `src/layouts/<name>/` with a document that receives `{ data: CvData }` and a `theme.ts` with a palette for each theme (`default`, `high-contrast`), mapping primitives to roles;
2. add the name to `src/layouts/names.ts` and an entry to `src/layouts/index.ts`, with the expected page count;
3. set `layout: '<name>'` in the CVs that use it.

A CV's text is tuned to its layout (line breaks, a full page): moving it to another layout means revising it.

### The `sidebar` layout

- Sidebar: name, headline, contacts, skills, certifications, education, languages. Main column: profile, experience grouped by employer, optional interests (with an optional QR code). Optional privacy clause, printed vertically along the left edge of the sidebar.
- Look: `src/layouts/sidebar/theme.ts` for colours and sizes, `SidebarDocument.tsx` and `components/` for the structure.
- It must fit on one page. If it overflows, trim content before reducing the font size (not below 8.5pt, except for the privacy clause). The sidebar is absolutely positioned: if it grows too long it runs off the page without `check` noticing, so make sure the languages block is visible.

## Where to change things

- **Content, contacts and labels**: the CV file. Components contain no text.
- **Look of a layout**: `src/layouts/<name>/`.
- **Colour primitives, fonts, available themes**: `src/theme.ts`; pick the theme with `--theme` (`default` or `high-contrast`).
- **Output files**: `src/output.ts`.
