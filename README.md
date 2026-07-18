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
  ui/                       # Header, ThemeService, ScrollSpyService
  data/                     # PROFILE (CV content — single source of truth)
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

---

## Shared chip hover

All Material chips use the global class `yk-chip`.

Tune once in `apps/youssef-portfolio/src/yk-chip.scss`:

```scss
:root {
  --yk-chip-hover-rotate: 6deg;
  --yk-chip-hover-scale: 1.05;
  --yk-chip-hover-duration: 200ms;
}
```

---

## Updating content

Edit `libs/portfolio/data/src/lib/profile.ts` — Intro, Experience, Projects, and Resume all read from `PROFILE`.

---

## Author

**Youssef Khamis** — Front-End Angular Developer  
Alexandria, Egypt · [GitHub](https://github.com/iYoussefJoey) · [LinkedIn](https://www.linkedin.com/in/iyoussef-khamis/)
