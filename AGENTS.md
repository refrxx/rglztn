# AGENTS.md

## Repo shape

- Vite + React 19 single-page site, wrapped in a Hono Cloudflare Worker for deployment to Freebuff Sites.
- Entry: `src/main.tsx` -> `src/app/App.tsx`. Routing uses `react-router` v8 (`react-router`, not `react-router-dom`) with `BrowserRouter`; routes are declared in `App.tsx` (`/`, `/work`, `/work/:slug`, `/journal`, `/journal/:slug`, `/about`, catch-all redirect).
- Worker: `src/worker/index.ts` serves `/api/health` and delegates everything else to the `ASSETS` binding. SPA fallback is configured in `wrangler.jsonc`.
- Build uses `@cloudflare/vite-plugin` reading `wrangler.jsonc`; `deploy.json` points at `dist/portfolio/index.js` + `dist/client`.

## Commands

- `bun install` — this repo uses bun (`bun.lock`); do not switch to npm/pnpm.
- `bun run dev` — Vite on port 3000, host `0.0.0.0`.
- `bun run build` — `vite build && node scripts/postbuild.mjs`; emits `dist/client` (assets) and `dist/portfolio/index.js` (Worker).
- `bun run typecheck` — the only verification step. There are no test, lint, format, or CI scripts/configs.
- `scripts/postbuild.mjs` deletes dotfiles and `.map` files from `dist` because the Sites uploader rejects them; do not rely on sourcemaps in the output.

## Content

- `src/data/site.ts` — identity, contact, socials, stats, capabilities, tools.
- `src/data/work.ts` — projects, pieces, results, slug helpers.
- `src/data/journal.ts` — blog posts, date formatting, sorting.
- Editing copy usually means editing these files, not the page JSX. `README.md` documents the same mapping.
- Copy is formal Indonesian using `saya`/`Anda`. Keep common industry terms (`website`, `marketplace`, `brand`, `thumbnail`) unless the user asks for stricter baku wording.
- Placeholder images: set `piece.image` to `/work/<brand>/<file>.jpg` and place the file under `public/work/...`. Empty `image` renders the CSS placeholder from `src/app/components/Mock.tsx`. The About portrait is also a placeholder in `src/app/pages/About.tsx`.
- Stats and project "Hasil" values are sample data; the README says to replace them before public use.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config.*`. Design tokens and custom utilities are in `src/styles.css` under `@theme` / `@utility`.
- Fonts: Hanken Grotesk for display, Inter for body, Geist Mono for labels/numbers. All are loaded through `@fontsource-variable` imports in `src/styles.css`.
- Themes are driven by `data-theme="dark" | "light"` on `<html>`, set by the inline script in `index.html` and by `src/app/lib/theme.ts`. Dark values live in `@theme`; light overrides live in the `html[data-theme='light']` block in `@layer base`. Never hardcode a color in a component — add or use a token instead.
- Accent tokens are theme-aware: `--color-accent` / `--color-accent-deep` are the same orange (`#ee4d2d` / `#d63e1f`) in dark and light. `--color-on-accent` is the text color for accent buttons. Mock artwork follows the theme through `--color-stage`, `--color-stage-plate`, `--stage-gradient`, and `--stage-shadow`.
- If the accent changes, also update `public/favicon.svg` (the favicon stays yellow as a static brand mark) and the dark/light values in `README.md`.
- Minimum type sizes: metadata/labels 12px, body 16px, article prose 18px. Keep headings on their existing `clamp(...)` scale.
- Reuse the existing utilities instead of inventing new ones: `font-display`, `font-display-tight`, `label`, `num`, `panel`, `grain`, `link-draw`, `hairline`, `accent-glow`, `prose-site`, `stage-gradient`, `stage-shadow`, `stage-accent-glow`, `hero-glow`, `portrait-gradient`, `portrait-glow`.
- Visual language: near-black (dark) or warm paper (light) background, sharp corners, 1px hairlines, yellow (dark) or blue (light) accent used only for labels, CTAs, and markers.
- Existing code uses relative imports (`../../data/site`). The `@/*` alias in `tsconfig.json` is unused.
