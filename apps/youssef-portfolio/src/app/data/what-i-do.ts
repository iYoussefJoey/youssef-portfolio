import { Commit, InspectPart, Side, Stat } from './models';

export const STATS: readonly Stat[] = [
  { n: '15+', label: $localize`:@@stat.pages.label:pages in 2 months`, sub: $localize`:@@stat.pages.sub:2 brands, mobile first, Arabic & English` },
  { n: '100+', label: $localize`:@@stat.components.label:components`, sub: $localize`:@@stat.components.sub:documented in my React library` },
  { n: '92', label: $localize`:@@stat.a11y.label:Lighthouse accessibility`, sub: $localize`:@@stat.a11y.sub:average of my 3 live pages, mobile` },
  { n: '9s → 1s', label: $localize`:@@stat.load.label:load time`, sub: $localize`:@@stat.load.sub:Safesys alert counts, moved to a backend endpoint` },
  { n: '80%+', label: $localize`:@@stat.tests.label:test coverage`, sub: $localize`:@@stat.tests.sub:Jest, on several Angular features` },
  { n: '~500', label: $localize`:@@stat.stalls.label:market stalls sold`, sub: $localize`:@@stat.stalls.sub:online with GapMap, which I designed` },
];

export const SIDES: readonly Side[] = [
  {
    icon: 'design',
    kind: $localize`:@@side.ux.kind:UI/UX Design`,
    since: $localize`:@@side.ux.since:since 2022`,
    title: $localize`:@@side.ux.title:I turn messy ideas into clear, accessible screens.`,
    ticks: [
      $localize`:@@side.ux.t1:User research & usability testing`,
      $localize`:@@side.ux.t2:User flows, wireframes & prototypes`,
      $localize`:@@side.ux.t3:Design systems & tokens`,
      $localize`:@@side.ux.t4:Accessibility to WCAG 2.2 (AA / AAA)`,
      $localize`:@@side.ux.t5:Mobile first & bilingual: Arabic (RTL), English, Polish`,
    ],
    proof: [$localize`:@@brand.monglish:Monglish`, 'Edulixa360', 'GapMap'],
  },
  {
    icon: 'code',
    kind: $localize`:@@side.fe.kind:Front-end Development`,
    since: $localize`:@@side.fe.since:since 2023`,
    title: $localize`:@@side.fe.title:I build those screens as clean, reusable components.`,
    ticks: [
      $localize`:@@side.fe.t1:Angular, TypeScript & Signals`,
      $localize`:@@side.fe.t2:Next.js & React pages`,
      $localize`:@@side.fe.t3:RxJS & REST APIs`,
      $localize`:@@side.fe.t4:Shared libraries in an NX monorepo`,
      $localize`:@@side.fe.t5:Jest unit tests, 80%+ coverage`,
    ],
    proof: ['Safesys', 'Emitum', 'ControlER'],
  },
];

/** "How I work" as a commit history: design lane, the merge, then the code lane. */
export const COMMITS: readonly Commit[] = [
  { lane: 'd', hash: 'a1f3e2', verb: $localize`:@@commit.understand.verb:understand:`, msg: $localize`:@@commit.understand.msg:users, goals and content`, tag: 'UX', tagCls: '' },
  { lane: 'd', hash: 'b7c204', verb: $localize`:@@commit.wireframe.verb:wireframe:`, msg: $localize`:@@commit.wireframe.msg:structure and flow`, tag: 'UX', tagCls: '' },
  { lane: 'd', hash: 'c9e0a1', verb: $localize`:@@commit.design.verb:design:`, msg: $localize`:@@commit.design.msg:colour, type, components`, tag: 'UI', tagCls: '' },
  { lane: 'm', hash: 'd00d5e', verb: $localize`:@@commit.merge.verb:merge:`, msg: $localize`:@@commit.merge.msg:design into code`, tag: $localize`:@@commit.tag.handoff:handoff`, tagCls: 'both' },
  { lane: 'c', hash: 'e4b1f7', verb: $localize`:@@commit.build.verb:build:`, msg: $localize`:@@commit.build.msg:Angular or Next.js components`, tag: $localize`:@@commit.tag.code:Code`, tagCls: 'fe' },
  { lane: 'c', hash: 'f8f6c3', verb: $localize`:@@commit.test.verb:test:`, msg: $localize`:@@commit.test.msg:devices, accessibility, feedback`, tag: $localize`:@@commit.tag.ux-code:UX + Code`, tagCls: 'fe' },
];

/** The inspect card: each part of the sample card, its line of Angular and its spec (values from page-logic.js PARTS). */
export const INSPECT_PARTS: readonly InspectPart[] = [
  {
    id: 'img',
    label: 'image',
    tag: 'image',
    a: '[image]',
    s: '"kidsCourses"',
    k: 'image',
    v: { light: 'WebP, 16:9 · alt text comes with it', dark: 'WebP, 16:9 · alt text comes with it' },
    note: $localize`:@@part.img.note:The picture is one input, and its alt text travels with it, so no image ships without one.`,
  },
  {
    id: 'chip',
    label: 'chip',
    tag: 'chip',
    a: '[chip]',
    s: '"\'UI/UX + Front-end\'"',
    k: 'chip',
    v: { light: 'Sapphire #1D46B8 · 11px / 650 · 8.0:1', dark: 'Periwinkle #9BB8FF · 11px / 650 · 9.2:1' },
    note: $localize`:@@part.chip.note:In Figma the chip is a token. In code it is one input, with the same colour and the same contrast.`,
  },
  {
    id: 'title',
    label: 'title',
    tag: 'title',
    a: '[title]',
    s: '"\'Monglish redesign\'"',
    k: 'h3',
    v: { light: 'Lexend 16px / 680 · 17.9:1', dark: 'Lexend 16px / 680 · 13.9:1' },
    note: $localize`:@@part.title.note:The title stays a real h3, so screen readers keep the page outline.`,
  },
  {
    id: 'meta',
    label: 'meta',
    tag: 'meta',
    a: '[meta]',
    s: '"\'Mobile first · EN / AR\'"',
    k: 'meta',
    v: { light: '12px · Slate #424E6C · 8.3:1', dark: '12px · Mist #B4C1DF · 8.7:1' },
    note: $localize`:@@part.meta.note:Even the smallest text passes AAA contrast (7:1).`,
  },
  {
    id: 'btn',
    label: 'button',
    tag: 'button',
    a: '(view)',
    s: '"openCase()"',
    k: 'button',
    v: { light: 'event output · fill-up hover · 3px focus ring', dark: 'event output · fill-up hover · 3px focus ring' },
    note: $localize`:@@part.btn.note:The button is an output: the card tells the page, and the page opens the case study.`,
  },
];
