/**
 * Portfolio profile content (from CV + LinkedIn).
 * Keep copy here so Intro / Experience / Resume pages share one source of truth.
 */

export const PROFILE = {
  name: 'Youssef Khamis',
  title: 'Front-End Angular Developer',
  location: 'Alexandria, Egypt',
  email: 'iyoussef.khamis@gmail.com',
  links: {
    github: 'https://github.com/iYoussefJoey',
    linkedin: 'https://www.linkedin.com/in/iyoussef-khamis/',
    emailCompose:
      'https://mail.google.com/mail/?view=cm&fs=1&to=iyoussef.khamis@gmail.com',
  },

  /**
   * About — short Brittany-style intro (first person).
   */
  about: [
    `I'm a Front-End Angular Developer with 2+ years of experience building enterprise web applications using Angular, TypeScript, RxJS, Angular Signals, and Reactive Forms.`,
    `I've developed reusable UI components with Angular Material and Tailwind CSS, implemented complex business features, integrated REST APIs, written unit tests with Jest, and improved application performance — all within NX monorepos and Agile Scrum teams using GitLab and Jira.`,
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

  /** Grouped skills (Architecture / Testing / etc.) */
  skillGroups: [
    {
      title: 'Frontend',
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
      items: ['REST APIs', 'Swagger / OpenAPI', 'Jest', 'Jasmine'],
    },
    {
      title: 'Tools',
      items: ['Git', 'GitLab', 'CI/CD', 'Docker', 'Jira', 'Agile Scrum'],
    },
  ],

  education: {
    school: 'Behira Higher Institute',
    degree: "Bachelor's Degree in Computer Engineering",
    place: 'Alexandria, Egypt',
    period: 'Sept 2017 – June 2022',
  },

  /** GAMP role summary (Experience page intro) */
  experience: {
    company: 'GAMP Poland',
    role: 'Software Engineer / Frontend Developer',
    employment: 'Full-time · Remote',
    period: 'Feb 2024 – Present',
    place: 'Zielona Góra, Lubuskie, Poland',
    summary: `Developed and maintained enterprise Angular apps in an NX monorepo across industrial monitoring, identity management, and workforce scheduling — collaborating with backend, QA, design, and product in Agile Scrum.`,
    highlights: [
      'Built a configurable recurring report module (daily, weekly, monthly, yearly rules) with Reactive Forms, Signals, and strongly typed shared logic.',
      'Refactored duplicated business logic into reusable typed solutions to cut technical debt.',
      'Helped cut a slow workflow from ~9s to ~1s by tracing frontend, backend, and third-party bottlenecks.',
      'Designed shared notifications that sync unread state across pages without manual refresh.',
      'Built reusable page-scoped Signals stores to remove duplicated fetching and reduce API calls.',
      'Wrote Jest tests mocking services/Signals for components, stores, and business logic.',
      'Worked with Git, GitLab MRs, CI/CD, and Jira; shipped on Angular v7, v13, and v21 (legacy + modern).',
    ],
  },

  /** Product projects at GAMP (Experience page) */
  projects: [
    {
      id: 'safesys',
      name: 'Safesys Measurement System',
      period: 'June 2025 – July 2026',
      stack: ['Angular v21', 'TypeScript', 'RxJS', 'SCSS', 'Angular Signals'],
      summary:
        'Interactive measurement and consumption dashboards for industrial monitoring.',
      bullets: [
        'Built an interactive measurement dashboard where selecting assets synced map navigation and centered matching visuals for large datasets.',
        'Developed a consumption dashboard with historical readings and charts, plus unit tests for API mapping, loading states, and data transforms.',
        'Introduced a shared page-scoped store with Angular Signals to remove duplicated routing/fetch logic and cut unnecessary API requests.',
      ],
    },
    {
      id: 'emitum',
      name: 'Emitum',
      period: 'Dec 2024 – June 2025',
      stack: ['Angular v13', 'TypeScript', 'SCSS', 'REST APIs'],
      summary:
        'Identity and account workflows for registration, management, and privacy.',
      bullets: [
        'Developed responsive user workflows for registration, account management, and privacy settings integrated with REST APIs.',
      ],
    },
    {
      id: 'pogotowie',
      name: 'Pogotowie',
      period: 'Feb 2024 – Dec 2024',
      stack: ['Angular v7', 'TypeScript', 'RxJS', 'Angular CDK'],
      summary:
        'Workforce scheduling with interactive tables, RBAC, and live notifications.',
      bullets: [
        'Developed scheduling features for 50+ resources using interactive tables and Angular CDK drag-and-drop.',
        'Implemented role-based access control and real-time notifications for scheduling and vacation workflows.',
      ],
    },
  ],
} as const;

export type Profile = typeof PROFILE;
