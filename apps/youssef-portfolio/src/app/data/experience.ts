import { Education, Quote, Role } from './models';

export const ROLES: readonly Role[] = [
  {
    title: 'UI/UX Designer',
    org: 'Monglish International Academy · Alexandria, Egypt',
    when: 'Sep 2026 – Present',
    year: '2026',
    kind: 'ux',
    kindLabel: 'UI/UX',
    pos: '22%',
    specLabel: 'Mostly design, with Next.js handoffs',
    points: [
      'Sole UI/UX designer for an online English academy and its sister brand Edulixa360, serving families across Egypt and the Gulf: research, concept, prototype, stakeholder reviews, developer handoff and QA on staging.',
      'Designed 15+ mobile-first, bilingual (Arabic RTL / English) pages for 2 brands in 2 months, as about 90% of visitors use phones. 3 are live on monglish.co.uk: Kids Courses, Adult Courses and IELTS Courses.',
      'Built two design systems, including a React component library with 100+ documented components, tokens, a responsive grid and motion rules, packaged as Claude Code skills so pages ship with fewer design bugs.',
      'Designed conversion flows: a package configurator with a live summary and price per hour, lead-generation landing pages, and parent-friendly forms with inline validation and duplicate-submit protection.',
      'WCAG 2.2 AA on every page (AAA where possible): the 3 live pages average 92 on Google Lighthouse accessibility (mobile). I build approved designs as Next.js / React pages with Claude Code and hand them off with detailed spec docs.',
    ],
  },
  {
    title: 'Software Engineer (Front-End, Angular)',
    org: 'GAMP · Poland (remote)',
    when: 'Sep 2023 – Aug 2026',
    year: '2023',
    kind: 'fe',
    kindLabel: 'Front-end',
    pos: '86%',
    specLabel: 'Mostly code',
    points: [
      'Built Angular features for 3 enterprise products (Safesys, Emitum, ControlER) with designers, QA and backend developers in Agile Scrum (GitLab merge requests, CI/CD, Jira).',
      'Cut the Safesys alert counts from about 9 seconds to about 1: the front end was counting alerts by filtering the paginated table, so I asked the backend team for a dedicated count endpoint.',
      'Built a recurring-report scheduler (daily to yearly) with Reactive Forms and Angular Signals, and a shared notification service that keeps unread badges in sync across pages.',
      'Co-built gampfrontend, a shared Angular library in an NX monorepo (with the Safesys app and Keycloak auth), styled with Tailwind CSS and BEM.',
      'Wrote Jest unit tests for components, stores and business logic, reaching over 80% coverage on several features.',
    ],
  },
  {
    title: 'UI/UX Designer (part-time)',
    org: 'GAMP · Poland (remote)',
    when: 'Jul 2022 – Aug 2023',
    year: '2022',
    kind: 'ux',
    kindLabel: 'UI/UX',
    pos: '10%',
    specLabel: 'Design only',
    points: [
      'Designed the UI/UX of GapMap, a management system for agricultural markets (stall, partition and parking management), later used by ZRRT to sell nearly 500 market stalls online.',
      'Created user flows, wireframes and high-fidelity Figma screens, and worked with the Angular team on handoff, which led to an internal move into front-end development.',
    ],
  },
];

export const EDUCATION: Education = {
  kindLabel: 'Education',
  title: 'Bachelor’s in Computer Engineering',
  when: '2017 – 2022',
  org: 'BHI · Alexandria, Egypt · Military service completed',
};

/** LinkedIn recommendations, Ahmed Zaki first. */
export const QUOTES: readonly Quote[] = [
  {
    text: '“I had the pleasure of working with him as a frontend developer. He is smart, hardworking, quick to find the right information, and communicates in excellent English.”',
    initials: 'AZ',
    name: 'Ahmed Zaki',
    title: 'Head of Software Engineering, GAMP',
  },
  {
    text: '“I worked with Youssef and observed his willingness to learn and improve his technical skills. As he continues to gain experience and develop his knowledge, I wish him every success in his career.”',
    initials: 'ME',
    name: 'Moustafa Ellithy',
    title: 'Senior Front-end Engineer, my manager at GAMP',
  },
];

export const QUOTE_SOURCE = 'LinkedIn recommendation · Aug 2026';
