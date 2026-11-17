# AGENTS.md

## Repo shape

- Vite + React 19 single-page site, deployed as a static SPA on Vercel.
- Entry: `src/main.tsx` -> `src/app/App.tsx`. Routing uses `react-router` v8 (`react-router`, not `react-router-dom`) with `BrowserRouter`; routes are declared in `App.tsx` (`/`, `/work`, `/work/:slug`, `/journal`, `/journal/:slug`, `/about`, catch-all redirect).
- API: `api/health.ts` is a Vercel serverless function (`/api/health`); everything else is static.
- SPA fallback for deep links is configured in `vercel.json` (rewrites unmatched routes to `index.html`).

## Commands

- `bun install` — this repo uses bun (`bun.lock`); do not switch to npm/pnpm.
- `bun run dev` — Vite on port 3000, host `0.0.0.0`.
- `bun run build` — `vite build`; emits the static site to `dist`.
- `bun run typecheck` — the only verification step. There are no test, lint, format, or CI scripts/configs.
- `bun run theme` — regenerates `src/material-tokens.css` from the seed in `scripts/generate-theme.mjs`. Runs under bun; `node` fails on the package's extensionless ESM imports. Commit the generated CSS.

## Content

- `src/data/site.ts` — identity, contact, socials, stats, capabilities, tools.
- `src/data/work.ts` — projects, pieces, results, slug helpers.
- `src/data/journal.ts` — blog posts, date formatting, sorting.
- Editing copy usually means editing these files, not the page JSX. `README.md` documents the same mapping.
- Copy is formal Indonesian using `saya`/`Anda`. Keep common industry terms (`website`, `marketplace`, `brand`, `thumbnail`) unless the user asks for stricter baku wording.
- Placeholder images: set `piece.image` to `/work/<brand>/<file>.jpg` and place the file under `public/work/...`. Empty `image` renders the CSS placeholder from `src/app/components/Mock.tsx`. The About portrait is also a placeholder in `src/app/pages/About.tsx`.
- Stats and project "Hasil" values are sample data; the README says to replace them before public use.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config.*`. Tokens and custom utilities are in `src/styles.css` under `@theme` / `@utility`.
- The visual language is Material You (MD3) flat: tonal surfaces, rounded corners (cards 20–28px, buttons pill), no gradients, no shadows, no grain. Depth comes only from surface-container steps.
- Colors are generated, not hand-picked. `scripts/generate-theme.mjs` uses `SchemeFidelity` on seed `#ee4d2d` and writes `src/material-tokens.css` (`--md-*` roles for dark in `:root`, light in `html[data-theme='light']`). `src/styles.css` maps those to Tailwind tokens such as `bg-surface-container`, `text-on-surface-variant`, `border-outline-variant`, `bg-primary`. Never hardcode a color in a component; add a token instead. Do not edit `src/material-tokens.css` by hand.
- Fonts: Hanken Grotesk for display, Inter for body, Geist Mono for labels/numbers, all via `@fontsource-variable` in `src/styles.css`.
- Themes are driven by `data-theme="dark" | "light"` on `<html>`; the stored value can also be `system` (`src/app/lib/theme.ts`, inline script in `index.html`). Theme color meta: `#fff8f6` light, `#1e100d` dark.
- Icons are Material Symbols Rounded from the self-hosted subset `public/fonts/material-symbols-rounded.woff2` (10 KB). It contains only `arrow_back`, `arrow_outward`, `brightness_auto`, `check`, `close`, `dark_mode`, `light_mode`, `menu`; render them through `src/app/components/ui/Icon.tsx`. To add an icon you must re-request a subset from Google Fonts with a longer `icon_names=` list, and keep `IconName` in sync. `lucide-react` is no longer used.
- `src/app/components/ui/` holds the M3 primitives: `Button` (`filled`/`tonal`/`outlined`/`text`, plus `buttonStyles` + `ButtonContent` for links), `IconButton`, `Chip`, `SegmentedButton`, `Icon`. Hover/press overlays use the `state-layer` utility with content wrapped in `relative z-10`.
- If the seed changes, update `public/favicon.svg` and the theme-color values in `index.html` and `src/app/lib/theme.ts`, then run `bun run theme`.
- Minimum type sizes: metadata/labels 12px, body 16px, article prose 18px. Keep headings on their existing `clamp(...)` scale.
- Reuse the existing utilities instead of inventing new ones: `font-display`, `font-display-tight`, `label`, `num`, `hairline`, `link-draw`, `state-layer`, `material-symbols-rounded`, `prose-site`.
- Animations use GSAP only (`gsap` + `@gsap/react`); plugins register in `src/app/lib/gsap.ts` and the shared motion components live in `src/app/components/anim.tsx` (`Lines`, `Reveal`, `Magnetic`, `Marquee`). Every animation must bail out under `prefersReducedMotion()`. `motion` and `framer-motion` are no longer dependencies.
- Existing code uses relative imports (`../../data/site`). The `@/*` alias in `tsconfig.json` is unused.
