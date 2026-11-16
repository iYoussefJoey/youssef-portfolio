import { Commit, InspectPart, Side, Stat } from './models';

export const STATS: readonly Stat[] = [
  { n: '15+', label: 'pages in 2 months', sub: '2 brands, mobile first, Arabic & English' },
  { n: '100+', label: 'components', sub: 'documented in my React library' },
  { n: '92', label: 'Lighthouse accessibility', sub: 'average of my 3 live pages, mobile' },
  { n: '9s → 1s', label: 'load time', sub: 'a slow GAMP workflow I traced' },
  { n: '80%+', label: 'test coverage', sub: 'Jest, on several Angular features' },
  { n: '~500', label: 'market stalls sold', sub: 'online with GapMap, which I designed' },
];

export const SIDES: readonly Side[] = [
  {
    icon: 'design',
    kind: 'UI/UX Design',
    since: 'since 2022',
    title: 'I turn messy ideas into clear, accessible screens.',
    ticks: [
      'User research & usability testing',
      'User flows, wireframes & prototypes',
      'Design systems & tokens',
      'Accessibility to WCAG 2.2 (AA / AAA)',
      'Mobile first & bilingual: Arabic (RTL), English, Polish',
    ],
    proof: ['Monglish', 'Edulixa360', 'GapMap'],
  },
  {
    icon: 'code',
    kind: 'Front-end Development',
    since: 'since 2023',
    title: 'I build those screens as clean, reusable components.',
    ticks: [
      'Angular, TypeScript & Signals',
      'Next.js & React pages',
      'RxJS & REST APIs',
      'Shared libraries in an NX monorepo',
      'Jest unit tests, 80%+ coverage',
    ],
    proof: ['Safesys', 'Emitum', 'ControlER'],
  },
];

/** "How I work" as a commit history: design lane, the merge, then the code lane. */
export const COMMITS: readonly Commit[] = [
  { lane: 'd', hash: 'a1f3e2', verb: 'understand:', msg: 'users, goals and content', tag: 'UX', tagCls: '' },
  { lane: 'd', hash: 'b7c204', verb: 'wireframe:', msg: 'structure and flow', tag: 'UX', tagCls: '' },
  { lane: 'd', hash: 'c9e0a1', verb: 'design:', msg: 'colour, type, components', tag: 'UI', tagCls: '' },
  { lane: 'm', hash: 'd00d5e', verb: 'merge:', msg: 'design into code', tag: 'handoff', tagCls: 'both' },
  { lane: 'c', hash: 'e4b1f7', verb: 'build:', msg: 'Angular or Next.js components', tag: 'Code', tagCls: 'fe' },
  { lane: 'c', hash: 'f8f6c3', verb: 'test:', msg: 'devices, accessibility, feedback', tag: 'UX + Code', tagCls: 'fe' },
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
    note: 'The picture is one input, and its alt text travels with it, so no image ships without one.',
  },
  {
    id: 'chip',
    label: 'chip',
    tag: 'chip',
    a: '[chip]',
    s: '"\'UI/UX + Front-end\'"',
    k: 'chip',
    v: { light: 'Sapphire #1D46B8 · 11px / 650 · 8.0:1', dark: 'Periwinkle #9BB8FF · 11px / 650 · 9.2:1' },
    note: 'In Figma the chip is a token. In code it is one input, with the same colour and the same contrast.',
  },
  {
    id: 'title',
    label: 'title',
    tag: 'title',
    a: '[title]',
    s: '"\'Monglish redesign\'"',
    k: 'h3',
    v: { light: 'Lexend 16px / 680 · 17.9:1', dark: 'Lexend 16px / 680 · 13.9:1' },
    note: 'The title stays a real h3, so screen readers keep the page outline.',
  },
  {
    id: 'meta',
    label: 'meta',
    tag: 'meta',
    a: '[meta]',
    s: '"\'Mobile first · EN / AR\'"',
    k: 'meta',
    v: { light: '12px · Slate #424E6C · 8.3:1', dark: '12px · Mist #B4C1DF · 8.7:1' },
    note: 'Even the smallest text passes AAA contrast (7:1).',
  },
  {
    id: 'btn',
    label: 'button',
    tag: 'button',
    a: '(view)',
    s: '"openCase()"',
    k: 'button',
    v: { light: 'event output · fill-up hover · 3px focus ring', dark: 'event output · fill-up hover · 3px focus ring' },
    note: 'The button is an output: the card tells the page, and the page opens the case study.',
  },
];
