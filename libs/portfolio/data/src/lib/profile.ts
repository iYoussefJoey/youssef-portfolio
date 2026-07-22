/**
 * Portfolio profile content (from CV + LinkedIn).
 * Keep copy here so Intro / Experience / Resume pages share one source of truth.
 */

export const PROFILE = {
  name: 'Youssef Khamis',
  title: 'Front-End Angular Developer',
  location: 'Alexandria, Egypt',
  /** Home-page avatar — served from apps/youssef-portfolio/public/ (root URL + this filename). */
  photo: 'youssef-khamis.jpg',
  /** Short "what I'm looking for" line shown on the home page. */
  seeking:
    "I'm open to Front-End / Angular Developer roles - remote or based in Alexandria, Egypt.",
  email: 'iyoussef.khamis@gmail.com',
  links: {
    github: 'https://github.com/iYoussefJoey',
    linkedin: 'https://www.linkedin.com/in/iyoussef-khamis/',
    emailCompose:
      'https://mail.google.com/mail/?view=cm&fs=1&to=iyoussef.khamis@gmail.com',
    /** Served from apps/youssef-portfolio/public/ (root URL + this filename). */
    resumePdf: 'Youssef-Khamis-Resume.pdf',
  },

  /**
   * About — short Brittany-style intro (first person).
   */
  about: [
    `I'm a Front-End Angular Developer with 2+ years of experience building enterprise web applications using Angular, TypeScript, RxJS, Angular Signals, and Reactive Forms.`,
    `I've developed reusable UI components with Angular Material and Tailwind CSS, implemented complex business features, integrated REST APIs, written unit tests with Jest, and improved application performance, all within NX monorepos and Agile Scrum teams using GitLab and Jira.`,
    `At GAMP Poland I contributed to dashboards, scheduling platforms, and workflow-driven apps: shared component libraries, dynamic forms, Signals-based stores, fewer redundant API calls, and UX wins through performance work. I'm looking for roles where I can own more technically and keep growing as an Angular engineer.`,
  ],

  /** Flat tech list for the Technologies section */
  technologies: [
    'Angular',
    'TypeScript',
    'RxJS',
    'Angular Signals',
    'Reactive Forms',
    'Angular Material',
    'Tailwind CSS',
    'SCSS',
    'HTML',
    'CSS',
    'Figma',
    'NX',
    'REST APIs',
    'Swagger / OpenAPI',
    'Jest',
    'Jasmine',
    'Git',
    'GitLab',
    'Docker',
    'Jira',
  ],

  /** Grouped skills — each group has a short blurb so the section has real height for scroll-spy. */
  skillGroups: [
    {
      title: 'Frontend',
      description:
        'I build accessible, responsive UIs with Angular and TypeScript: Signals and RxJS for reactive data, Material + Tailwind/SCSS for consistent design systems, and clean templates that stay maintainable as features grow.',
      items: [
        'Angular',
        'TypeScript',
        'RxJS',
        'Angular Signals',
        'Angular Material',
        'SCSS',
        'HTML',
        'CSS',
        'Tailwind CSS',
      ],
    },
    {
      title: 'Architecture',
      description:
        'I structure features for reuse across an NX monorepo: typed Reactive Forms, page-scoped Signals stores, shared UI libraries, and performance work that cuts redundant API calls and slow paths without rewriting the whole app.',
      items: [
        'Reactive Forms',
        'State management (Signals)',
        'Reusable component design',
        'NX monorepo',
        'Performance optimization',
      ],
    },
    {
      title: 'API & testing',
      description:
        'I integrate REST APIs from Swagger/OpenAPI contracts and back changes with unit tests: Jest (and Jasmine on legacy apps) for components, stores, and business logic with mocked services and Signals.',
      items: ['REST APIs', 'Swagger / OpenAPI', 'Jest', 'Jasmine'],
    },
    {
      title: 'Tools',
      description:
        'Day to day I move designs from Figma into code, ship through Git/GitLab MRs and CI/CD, track work in Jira, and collaborate in Agile Scrum with backend, QA, and design.',
      items: [
        'Figma',
        'Git',
        'GitLab',
        'CI/CD',
        'Docker',
        'Jira',
        'Agile Scrum',
      ],
    },
  ],

  /** Extra Education copy so the last section isn't a one-liner for scroll-spy. */
  education: {
    school: 'BHI',
    degree: "Bachelor's Degree in Computer Engineering",
    place: 'Alexandria, Egypt',
    period: 'Sept 2017 - June 2022',
    summary: [
      'Studied computer engineering with a focus on software fundamentals: algorithms, data structures, and building real projects that prepared me for professional frontend work.',
      "Since graduating I've applied that foundation daily in enterprise Angular apps: typed APIs, component architecture, testing, and shipping in Agile teams.",
    ],
  },

  /** GAMP role summary (Experience page intro) */
  experience: {
    company: 'GAMP Poland',
    role: 'Software Engineer / Frontend Developer',
    employment: 'Full-time · Remote',
    period: 'Feb 2024 - Present',
    place: 'Zielona Góra, Lubuskie, Poland',
    summary: `Developed and maintained enterprise Angular apps in an NX monorepo across industrial monitoring, identity management, and workforce scheduling, collaborating with backend, QA, design, and product in Agile Scrum.`,
    highlights: [
      'Built a configurable recurring report module (daily, weekly, monthly, yearly rules) with Reactive Forms, Signals, and strongly typed shared logic.',
      'Refactored duplicated business logic into reusable typed solutions to cut technical debt.',
      'Helped cut a slow workflow from ~9s to ~1s by tracing frontend, backend, and third-party bottlenecks.',
      'Designed shared notifications that sync unread state across pages without manual refresh.',
      'Built reusable page-scoped Signals stores to remove duplicated fetching and reduce API calls.',
      'Wrote Jest tests mocking services/Signals for components, stores, and business logic.',
      'Worked with Git, GitLab MRs, CI/CD, and Jira; shipped on Angular v7, v13, and v22 (legacy + modern).',
    ],
  },

  /**
   * Product projects at GAMP (Experience page).
   * Each has: overview (what it is + problem it solves), role (my part),
   * achievements (key wins), url (live/case-study link).
   */
  projects: [
    {
      id: 'safesys',
      name: 'Safesys Measurement System',
      period: 'June 2025 - July 2026',
      url: 'https://gamp.pl/safesys/',
      stack: ['Angular v22', 'TypeScript', 'RxJS', 'SCSS', 'Angular Signals'],
      overview:
        'Safesys is an industrial monitoring platform that turns raw measurement and consumption data into interactive dashboards, so operators can follow large fleets of assets and readings that are hard to track in plain tables.',
      role: 'Front-end developer: built the measurement and consumption dashboards and the shared page-scoped Signals store.',
      achievements: [
        'Built an interactive measurement dashboard where selecting assets synced map navigation and centered matching visuals for large datasets.',
        'Developed a consumption dashboard with historical readings and charts, plus unit tests for API mapping, loading states, and data transforms.',
        'Introduced a shared page-scoped store with Angular Signals to remove duplicated routing/fetch logic and cut unnecessary API requests.',
      ],
    },
    {
      id: 'emitum',
      name: 'Emitum',
      period: 'Dec 2024 - June 2025',
      url: 'https://gamp.pl/walne-zgromadzenia-akcjonariuszy/',
      stack: ['Angular v13', 'TypeScript', 'SCSS', 'REST APIs'],
      overview:
        'Emitum is a platform for running online general meetings and shareholder votes. It replaces slow, error-prone, operator-heavy meeting tools so companies can host AGMs and consultations themselves, with simple voting, instant results, and clear meeting history.',
      role: 'Front-end developer: built responsive registration, account management, and privacy workflows against REST APIs.',
      achievements: [
        'Delivered account and privacy flows that let organizations set up and manage meetings without hiring external operators.',
        'Built responsive Angular forms integrated with REST APIs for registration and account management.',
        'Contributed to a product aimed at launching as a SaaS to grow the customer base.',
      ],
    },
    {
      id: 'pogotowie',
      name: 'Pogotowie',
      period: 'Feb 2024 - Dec 2024',
      url: 'https://www.linkedin.com/posts/gampzg_dedykowane-rozwi%C4%85zanie-it-dla-wojew%C3%B3dzkiej-activity-7482384590997889024-lTta',
      stack: ['Angular v7', 'TypeScript', 'RxJS', 'Angular CDK'],
      overview:
        'Pogotowie is a workforce scheduling system for a regional emergency medical service, coordinating shifts and vacations for 50+ resources that were previously hard to plan and keep in sync.',
      role: 'Front-end developer: built the scheduling UI, role-based access, and real-time notifications.',
      achievements: [
        'Developed scheduling features for 50+ resources using interactive tables and Angular CDK drag-and-drop.',
        'Implemented role-based access control and real-time notifications for scheduling and vacation workflows.',
      ],
    },
  ],
} as const;
