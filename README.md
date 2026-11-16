# Youssef Khamis — Portfolio

One-page portfolio for **Youssef Khamis**, UI/UX Designer & Front-End Developer, built in **Angular 22** on **Joey Frost UI**, his own design system.

Live: **https://iyoussefjoey.github.io/youssef-portfolio/**

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Angular 22: standalone components, signals, `@if` / `@for`, OnPush, zoneless |
| Rendering | Prerendered to static HTML at build time (`outputMode: "static"`); header and hero hydrate at once, every section below hydrates when it scrolls into view (incremental hydration) |
| Workspace | Nx |
| Styles | Plain CSS: Joey Frost UI tokens + one stylesheet per section, container queries at 700px and 1100px |
| Fonts | Lexend 300–800, Geist Mono 400/500, self-hosted Latin subsets in `public/fonts`, preloaded, `font-display: swap` |
| Images | WebP in `public/img`, `NgOptimizedImage` with width/height and lazy loading; the hero portrait is a `<picture>` that loads first on tablet/desktop and not at all on phones (it is hidden there) |

### Performance notes

- `src/index.html` has a tiny boot script that runs before the first paint: it applies the saved/OS theme and, with
  Motion allowed, opens the hero on the UX view, so nothing jumps when Angular takes over.
- Animations that move things use `transform`, never `left`/`top`, so they are not counted as layout shift.
- Content that differs per theme (palette chips, inspect spec line) is rendered for both themes and shown by CSS,
  so sections are correct before they hydrate.

---

## Structure

```text
apps/youssef-portfolio/
  public/                 img/, docs/ (CV), robots.txt, sitemap.xml, favicon
  src/
    index.html            <head> SEO: title, description, canonical, Open Graph, Twitter, Person JSON-LD
    styles.css            global layer: base, type, buttons, rising fill, loading sheen, grow reveal
    styles/tokens.css     Joey Frost UI colour tokens (light / dark) on .root[data-theme]
    app/
      app.ts / app.html   the page root: .root (theme, motion, reveal) > .cq (container) > sections
      data/               typed content: projects, roles, quotes, skills, palette, stats, inspect parts…
      sections/           header, hero, what-i-do (+ inspect card), work, experience, skills,
                          design-system, contact, footer — one standalone component each
      shared/             ThemeService, MotionService, RevealDirective, ScrollSpy, PressFeedbackDirective,
                          LightboxComponent (native <dialog>)
```

Section stylesheets use `ViewEncapsulation.None`, so every selector stays exactly as the design system wrote it
(`.root[data-theme="dark"] .ptabs button.on`, `.reveal-on.motion-on .gr`, …).

---

## Behaviour

- **Theme** follows the OS until the visitor presses the theme button, then remembers it in `localStorage['jf-theme']`.
- **Motion** switch (beside the name) turns every animation off; it starts off when the OS asks for reduced motion.
- **Grow reveal** once per block, **rising fill** on hover/focus, **loading sheen + line** on press (no spinners).
- **Hire me** pops every 5s, 3 times, and stops for good at Contact or when pressed.
- **Scroll spy** underlines the current section in the nav (and a blue bar in the phone menu).

---

## Updating content

Edit the files in `apps/youssef-portfolio/src/app/data/`. Templates read from them; images go in `public/img`
(add the width and height next to the path).

---

## Commands

```sh
npm install
npx nx serve youssef-portfolio        # dev server on http://localhost:4200
npx nx test youssef-portfolio         # unit tests (Jest)
npx nx lint youssef-portfolio
npx nx build youssef-portfolio --configuration=production --base-href=/youssef-portfolio/
```

Output: `dist/apps/youssef-portfolio/browser` (prerendered `index.html`).
On Windows Git Bash, prefix the build with `MSYS_NO_PATHCONV=1` so `/youssef-portfolio/` is not rewritten into a Windows path.

---

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` runs on every push to `master`: install, build + prerender with the
`/youssef-portfolio/` base href, copy `index.html` to `404.html`, publish. Repo **Settings → Pages → Source** must be
**GitHub Actions**.

**Custom domain later:** add `public/CNAME`, set `BASE_HREF: /` in the workflow, and update the canonical URL,
Open Graph URLs and JSON-LD in `src/index.html`, plus `public/robots.txt` and `public/sitemap.xml`.
