import { Picture, Project } from './models';

const desktop = (src: string, width = 1440, height = 900): Picture => ({ src, width, height });
const phone = (src: string): Picture => ({ src, width: 780, height: 1688 });

/** Selected work, in display order: featured page cards first, then the rest. */
export const PROJECTS: readonly Project[] = [
  {
    type: 'pages',
    key: 'mPage',
    title: 'Monglish website redesign',
    meta: 'Monglish · 2026',
    kind: 'both',
    feat: true,
    url: 'monglish.co.uk',
    desc: 'The sole UI/UX designer for an online English academy serving families across Egypt and the Gulf. Mobile-first, bilingual pages (Arabic RTL and English), since about 90% of visitors are on phones, delivered as Next.js pages. Kids Courses, Adult Courses and IELTS Courses are live. Pick a page:',
    tags: ['UI/UX', 'Next.js', 'Arabic RTL & English', 'WCAG 2.2'],
    pages: [
      {
        label: 'Kids Courses',
        desktop: desktop('img/screens/monglish-kids-courses-desktop.webp', 1160, 630),
        liveUrl: 'https://monglish.co.uk/ar/kids-courses',
      },
      {
        label: 'Adult Courses',
        desktop: desktop('img/screens/monglish-adult-courses-desktop.webp'),
        liveUrl: 'https://monglish.co.uk/ar/adult-courses',
      },
      {
        label: 'IELTS',
        desktop: desktop('img/screens/monglish-ielts-desktop.webp'),
        liveUrl: 'https://monglish.co.uk/ar/ielts-courses',
      },
      {
        label: 'Kids360',
        desktop: desktop('img/screens/monglish-kids360-desktop.webp'),
        phone: phone('img/screens/monglish-kids360-phone.webp'),
        liveUrl: 'https://monglish.co.uk/kids360',
      },
      {
        label: 'Blog',
        desktop: desktop('img/screens/monglish-blog-desktop.webp', 1000, 625),
        liveUrl: 'https://monglish.co.uk/ar/blog',
      },
    ],
  },
  {
    type: 'pages',
    key: 'ePage',
    title: 'Edulixa360 pages',
    meta: 'Edulixa360 · 2026',
    kind: 'ux',
    feat: true,
    url: 'edulixa360.com',
    desc: 'Landing pages for Monglish’s sister brand, an education platform, in Arabic and English. Conversion flows: lead-generation pages and parent-friendly forms with inline validation and duplicate-submit protection.',
    tags: ['Landing pages', 'Conversion flows', 'Mobile first', 'Arabic & English'],
    pages: [
      {
        label: 'AI for Teachers',
        desktop: desktop('img/screens/edulixa-ai-for-teachers-desktop.webp'),
        phone: phone('img/screens/edulixa-ai-for-teachers-phone.webp'),
        liveUrl: 'https://edulixa360.com/ai-for-teachers',
      },
      {
        label: 'Mental Math',
        desktop: desktop('img/screens/edulixa-mental-math-desktop.webp'),
        phone: phone('img/screens/edulixa-mental-math-phone.webp'),
        liveUrl: 'https://edulixa360.com/ar/mental-math',
      },
      {
        label: 'Courses for Teachers',
        desktop: desktop('img/screens/edulixa-courses-for-teachers-desktop.webp'),
        liveUrl: 'https://edulixa360.com/courses-for-teachers',
      },
    ],
  },
  {
    type: 'shot',
    title: 'Two design systems',
    meta: 'Monglish & Edulixa · 2026',
    kind: 'ux',
    picture: { src: 'img/design-systems.webp', width: 2800, height: 1600 },
    alt: 'Real components from both systems: the Monglish app login screen and an Edulixa plan card',
    desc: 'Monglish DS V2 and Edulixa DS V2, including a React component library with 100+ documented components, tokens, a responsive grid and motion rules, packaged as Claude Code skills so pages ship with fewer design bugs.',
    tags: ['100+ components', 'Tokens', 'Motion', 'Claude Code skills'],
  },
  {
    type: 'gap',
    title: 'GapMap',
    meta: 'GAMP · 2022–23',
    kind: 'ux',
    picture: { src: 'img/gapmap.webp', width: 558, height: 611 },
    alt: 'GapMap object map screen shown on a laptop',
    desc: 'A management system for agricultural markets: stall, partition and parking management, in English and Polish. I designed the user flows, wireframes and high-fidelity Figma screens. ZRRT later used it to sell nearly 500 market stalls online.',
    tags: ['~500 stalls sold online', 'User flows', 'Figma', 'English & Polish'],
  },
  {
    type: 'shot',
    title: 'Safesys Pomiary',
    meta: 'GAMP · Angular 22',
    kind: 'fe',
    picture: { src: 'img/safesys-pomiary.webp', width: 1073, height: 608 },
    alt: 'Safesys Pomiary measurement dashboard with a live line chart, shown on a laptop',
    desc: 'A measurement dashboard (pomiary is Polish for measurements) that syncs the selected assets with the map, with consumption charts and a page-scoped Signals store that reduced API requests. Alert counts went from about 9s to 1s once they came from a dedicated endpoint instead of a front-end table filter.',
    tags: ['Angular 22', 'Signals', 'RxJS', 'Charts'],
  },
  {
    type: 'code',
    title: 'gampfrontend',
    meta: 'GAMP · NX monorepo',
    kind: 'fe',
    file: 'app.component.ts',
    desc: 'A shared Angular library I co-built in an NX monorepo with the Safesys app and Keycloak auth: reusable components, from buttons to shared services, styled with Tailwind CSS and BEM, imported by projects instead of rebuilt.',
    tags: ['NX', 'Angular library', 'Tailwind CSS', 'Keycloak'],
    code: [
      { c: 'c', t: '// import once, reuse in every project' },
      { c: 'k', t: 'import { GButton, GTable }' },
      { c: '', t: "  from '@gamp/frontend';" },
      { c: 'k', t: '@Component({' },
      { c: '', t: '  imports: [GButton, GTable],' },
      { c: 'k', t: '})' },
    ],
  },
  {
    type: 'code',
    title: 'Emitum',
    meta: 'GAMP · Angular 13',
    kind: 'fe',
    file: 'signup.component.ts',
    desc: 'Self-service registration, account and privacy flows for online shareholder meetings, with a progress bar instead of numbered steps.',
    tags: ['Angular 13', 'Reactive Forms', 'SCSS'],
    code: [
      { c: 'c', t: '// progress bar instead of numbered steps' },
      { c: 'k', t: 'get progress(): number {' },
      { c: '', t: '  return (this.step / this.total) * 100;' },
      { c: 'k', t: '}' },
      { c: 's', t: '<div class="bar" [style.width.%]="progress">' },
    ],
  },
  {
    type: 'code',
    title: 'ControlER',
    meta: 'GAMP · Angular 7',
    kind: 'fe',
    file: 'schedule.component.ts',
    desc: 'Drag-and-drop scheduling for 50+ resources, with role-based access and live notifications.',
    tags: ['Angular 7', 'Angular CDK', 'RBAC'],
    code: [
      { c: 'c', t: '// drag a resource to a new slot' },
      { c: 'k', t: 'drop(e: CdkDragDrop<Slot[]>) {' },
      { c: '', t: '  transferArrayItem(e.previousContainer.data,' },
      { c: '', t: '    e.container.data, e.previousIndex,' },
      { c: '', t: '    e.currentIndex);' },
      { c: 'k', t: '}' },
    ],
  },
];

export const KIND_LABELS = { ux: 'UI/UX', fe: 'Front-end', both: 'UI/UX + Front-end' } as const;
