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
- The visual language is neutral: grayscale surfaces, rounded corners (cards 20–28px, buttons pill), and glass panels. No gradients, no grain, no colored tint.
- Colors are hand-picked neutral tokens in `src/styles.css`: `--ui-bg`, `--ui-surface`, `--ui-raised`, `--ui-line`, `--ui-line-strong`, `--ui-fg`, `--ui-muted`, `--ui-faint`, `--ui-ink`, `--ui-on-ink`, `--ui-accent` (dark in `:root`, light in `html[data-theme='light']`). They are exposed as Tailwind colors `bg`, `surface`, `raised`, `line`, `line-strong`, `fg`, `muted`, `faint`, `ink`, `on-ink`, `accent`. Never hardcode a color in a component; add a token instead.
- One accent only: calm blue (`#93c5fd` dark, `#1d4ed8` light). Use it sparingly for the status dot, focus ring, `::selection`, tags/markers, and link hover. Primary CTAs use solid `ink`, not the accent.
- Fonts: Hanken Grotesk for display, Inter for body, Geist Mono for labels/numbers, all via `@fontsource-variable` in `src/styles.css`.
- Themes are driven by `data-theme="dark" | "light"` on `<html>`; the stored value can also be `system` (`src/app/lib/theme.ts`, inline script in `index.html`). Theme color meta: `#fafafa` light, `#0a0a0b` dark.
- Icons are inline stroke SVGs in `src/app/components/ui/Icon.tsx` (24×24, stroke 1.6, `currentColor`). The available names are `arrow_back`, `arrow_outward`, `brightness_auto`, `check`, `close`, `dark_mode`, `light_mode`, `menu`; add a path and update `IconName` to extend the set. No icon font.
- `src/app/components/ui/` holds the primitives: `Button` (`filled`/`outlined`/`text`, plus `buttonStyles` + `ButtonContent` for links), `IconButton`, `Chip`, `SegmentedButton`, `Icon`. Hover/press overlays use the `state` utility with content wrapped in `relative z-10`.
- `glass` is the shared panel treatment: translucent surface + blur + hairline border + inset highlight. Hover only strengthens the border/background; no translate.
- Minimum type sizes: metadata/labels 12px, body 15px, article prose 16px. Keep headings on their existing `clamp(...)` scale.
- Reuse the existing utilities instead of inventing new ones: `font-display`, `font-display-tight`, `label`, `num`, `hairline`, `link-draw`, `state`, `glass`, `prose-site`.
- Animations use GSAP only (`gsap` + `@gsap/react`); plugins register in `src/app/lib/gsap.ts` and the shared motion components live in `src/app/components/anim.tsx` (`Lines`, `Reveal`, `Marquee`). Every animation must bail out under `prefersReducedMotion()`. `motion` and `framer-motion` are no longer dependencies.
- Existing code uses relative imports (`../../data/site`). The `@/*` alias in `tsconfig.json` is unused.
