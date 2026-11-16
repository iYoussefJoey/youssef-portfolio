# Youssef Khamis — Portfolio

One-page portfolio for **Youssef Khamis**, UI/UX Designer & Front-End Developer, built in **Angular 22** on **Joey Frost UI**, his own design system.

Live: **https://iyoussefjoey.github.io/youssef-portfolio/** · Arabic: **https://iyoussefjoey.github.io/youssef-portfolio/ar/**

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Angular 22: standalone components, signals, `@if` / `@for`, OnPush, zoneless |
| Rendering | Prerendered to static HTML at build time (`outputMode: "static"`); header and hero hydrate at once, every section below hydrates when it scrolls into view (incremental hydration) |
| Languages | English at the root, Arabic (RTL) under `/ar/`: Angular i18n, translated at build time, one prerendered page per language |
| Workspace | Nx |
| Styles | Plain CSS: Joey Frost UI tokens + one stylesheet per section, container queries at 700px and 1100px |
| Fonts | Lexend 300–800, Geist Mono 400/500 and Readex Pro 160–700 (Lexend's Arabic companion), self-hosted subsets in `public/fonts`, preloaded; `font-display: swap` for the Latin fonts and `optional` for Readex Pro, so the Arabic page never reflows when its font arrives |
| Images | WebP in `public/img`, `NgOptimizedImage` with width/height and lazy loading; the hero portrait is a `<picture>` that loads first on tablet/desktop and not at all on phones (it is hidden there) |

### Performance notes

- `src/index.html` has a tiny boot script that runs before the first paint: it applies the saved/OS theme and, with
  Motion allowed, opens the hero on the UX view, so nothing jumps when Angular takes over.
- Animations that move things use `transform`, never `left`/`top`, so they are not counted as layout shift.
- Content that differs per theme (palette chips, inspect spec line) is rendered for both themes and shown by CSS,
  so sections are correct before they hydrate.
- The Arabic font file is preloaded only on the Arabic page; the English page never downloads it.

---

## Structure

```text
apps/youssef-portfolio/
  public/                 img/, docs/ (CV), robots.txt, sitemap.xml, favicon
  src/
    index.html            <head> SEO: title, description, canonical, hreflang, Open Graph, Twitter, Person JSON-LD
    locale/               messages.json (extracted English) and messages.ar.json (Arabic translation)
    styles.css            global layer: base, type, buttons, rising fill, loading sheen, grow reveal
    styles/tokens.css     Joey Frost UI colour tokens (light / dark) on .root[data-theme]
    app/
      app.ts / app.html   the page root: .root (theme, motion, reveal) > .cq (container) > sections
      data/               typed content: projects, roles, quotes, skills, palette, stats, inspect parts…
      sections/           header, hero, what-i-do (+ inspect card), work, experience, skills,
                          design-system, contact, footer — one standalone component each
      shared/             ThemeService, MotionService, RevealDirective, ScrollSpy, PressFeedbackDirective,
                          LightboxComponent (native <dialog>), LogoMark (the YK mark), PageHead (lang, dir,
                          Arabic title and meta)
```

Section stylesheets use `ViewEncapsulation.None`, so every selector stays exactly as the design system wrote it
(`.root[data-theme="dark"] .ptabs button.on`, `.reveal-on.motion-on .gr`, …).
They use logical properties (`margin-inline-start`, `inset-inline-end`, …), so the same CSS mirrors for Arabic;
the few Arabic-only rules sit under `html[lang='ar']` / `html[dir='rtl']`.

---

## Behaviour

- **Theme** follows the OS until the visitor presses the theme button, then remembers it in `localStorage['jf-theme']`.
- **Motion** switch (beside the name) turns every animation off; it starts off when the OS asks for reduced motion.
- **Grow reveal** once per block, **rising fill** on hover/focus, **loading sheen + line** on press (no spinners).
- **Hire me** pops every 5s, 3 times, and stops for good at Contact or when pressed.
- **Scroll spy** underlines the current section in the nav (and a blue bar in the phone menu).
- **Language** button in the header (ع / EN) opens the other language's page at the section in view.

---

## Updating content

Edit the files in `apps/youssef-portfolio/src/app/data/`. Templates read from them; images go in `public/img`
(add the width and height next to the path).

Text is marked for translation with `$localize` (data files) and `i18n="@@id"` (templates). After changing English
text, run `npx nx run youssef-portfolio:extract-i18n` to refresh `src/locale/messages.json`, then add or update the
same id in `src/locale/messages.ar.json`. A missing id falls back to English and the build prints a warning.
LinkedIn quotes stay in English on both pages, since they are quoted as written.

---

## Commands

```sh
npm install
npx nx serve youssef-portfolio        # dev server on http://localhost:4200
npx nx serve youssef-portfolio --configuration=development-ar   # the Arabic page
npx nx test youssef-portfolio         # unit tests (Jest)
npx nx lint youssef-portfolio
npx nx build youssef-portfolio --configuration=production --base-href=/youssef-portfolio/
```

Output: `dist/apps/youssef-portfolio/browser`: English `index.html` at the root, Arabic in `ar/index.html`.
On Windows Git Bash, prefix the build with `MSYS_NO_PATHCONV=1` so `/youssef-portfolio/` is not rewritten into a Windows path.

---

## Deploy (GitHub Pages)

`.github/workflows/deploy-pages.yml` runs on every push to `master`: install, build + prerender both languages with
the `/youssef-portfolio/` base href (Arabic gets `/youssef-portfolio/ar/`), copy `index.html` to `404.html`, publish. Repo **Settings → Pages → Source** must be
**GitHub Actions**.

**Custom domain later:** add `public/CNAME`, set `BASE_HREF: /` in the workflow, and update the canonical URL,
Open Graph URLs, hreflang links and JSON-LD in `src/index.html`, the URLs in `src/app/shared/page-head.ts`, plus
`public/robots.txt` and `public/sitemap.xml`.
