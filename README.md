# Youssef Khamis — Portfolio

Personal portfolio for **Youssef Khamis**, Front-End Angular Developer.

Built as an **NX monorepo** with Angular standalone components, Angular Material, Tailwind CSS v4, and a light/dark theme.

**Live goal:** present Intro (about / skills), Experience, Projects, and Resume in a clean, interview-ready codebase.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Angular 22 (standalone) |
| Workspace | NX |
| UI | Angular Material + Tailwind CSS v4 |
| Icons | `@ng-icons/tabler-icons` |
| Theme | M3 tokens via `light-dark()` + `ThemeService` |
| Content | Shared `PROFILE` data in `libs/portfolio/data` |

---

## App routes

| Path | Page |
| --- | --- |
| `/` | Intro — sticky rail, scroll-spy, about / tech / skills / education |
| `/experience` | GAMP role + highlights |
| `/projects` | Safesys, Emitum, Pogotowie |
| `/resume` | Web resume (summary, experience, education, skills) |

Header nav sits beside the brand (Josh Comeau–style). Sub-pages show an animated **Back** control to return home.

---

## Workspace structure

```text
apps/youssef-portfolio/     # Shell app (header + router-outlet)
libs/portfolio/
  features/                 # Pages: Intro, Experience, Projects, Resume
  ui/                       # Header, IntroAside, ThemeService, ScrollSpyService
  data/                     # PROFILE (CV content — single source of truth)
  styles/                   # Shared theme tokens + brand animations (yk-*)
```

Path aliases (see `tsconfig.base.json`):

- `@youssef-portfolio/portfolio-features`
- `@youssef-portfolio/portfolio-ui`
- `@youssef-portfolio/portfolio-data`

---

## Getting started

```sh
npm install
npx nx serve youssef-portfolio
```

Other useful commands:

```sh
npx nx build youssef-portfolio
npx nx test features
npx nx test ui
npx nx test data
npx nx graph
```

---

## Shared breakpoints (DRY)

Defined once in `libs/portfolio/styles/yk-theme.css`:

| Token | Min width | Use |
| --- | --- | --- |
| `yk-nav` | 431px | Desktop header tabs (`yk-nav:` / `max-yk-nav:`) |
| `yk-aside` | 431px | Intro sticky rail (`yk-aside:` / `max-yk-aside:`) |

Import that file after `@import 'tailwindcss'` in any SCSS that `@apply`s these variants.

---

## Theme

- Preferences: **Light** / **Dark** / **System** (header contrast menu)
- Stored in `localStorage` key `yk-theme`
- Tokens live in `apps/youssef-portfolio/src/tokens-theme.scss`
- Theme `mat-menu` colors use Material `menu-overrides` in `apps/youssef-portfolio/src/styles.scss` (must be global — the menu renders in a CDK overlay)

Brand name / YK motion keyframes live in `libs/portfolio/styles/yk-animations.css`.

---

## Intro sticky rail

`yk-intro-aside` (`libs/portfolio/ui`) owns the sticky section links + socials.
The Intro page owns `PROFILE` content and `ScrollSpyService` observe/disconnect.

---

## Shared chip hover

All Material chips use the global class `yk-chip`.

Hover motion uses shared **`yk-shake`** (`libs/portfolio/styles/yk-shake.css`).
Chip colors live in `libs/portfolio/styles/yk-chip.css` (imported from `styles.scss`).

```html
<mat-chip class="yk-chip">Angular</mat-chip>
```

---

## Updating content

Edit `libs/portfolio/data/src/lib/profile.ts` — Intro, Experience, Projects, and Resume all read from `PROFILE`.

---

## Deploy (GitHub Pages)

Live URL after the first successful run:

**https://iyoussefjoey.github.io/youssef-portfolio/**

Workflow: `.github/workflows/deploy-pages.yml`  
On every push to `master` (or manual **Run workflow**), GitHub builds the app and publishes Pages. No separate “release” step.

### One-time setup

1. Repo **Settings → Pages → Build and deployment → Source** = **GitHub Actions** (you already did this).
2. Do **not** use the suggested Jekyll / Static HTML templates — this repo uses the custom workflow above.
3. Commit + push the workflow (and any pending app changes) to `master`.
4. Open **Actions**, wait for **Deploy GitHub Pages** to finish green.
5. Open the live URL above.

Note: if the repo is private, the **published site is still public** (GitHub’s warning on the Pages settings page).

### Manual / local production build

```sh
npx nx build youssef-portfolio --configuration=production --base-href=/youssef-portfolio/
```

Output: `dist/apps/youssef-portfolio/browser`

---

## Author

**Youssef Khamis** — Front-End Angular Developer  
Alexandria, Egypt · [GitHub](https://github.com/iYoussefJoey) · [LinkedIn](https://www.linkedin.com/in/iyoussef-khamis/)
