import { Education, Quote, Role } from './models';

export const ROLES: readonly Role[] = [
  {
    title: $localize`:@@role.monglish.title:UI/UX Designer`,
    org: $localize`:@@role.monglish.org:Monglish International Academy · Alexandria, Egypt`,
    when: $localize`:@@role.monglish.when:Sep 2026 – Present`,
    year: '2026',
    kind: 'ux',
    kindLabel: 'UI/UX',
    pos: '22%',
    specLabel: $localize`:@@role.monglish.spec:Mostly design, with Next.js handoffs`,
    points: [
      $localize`:@@role.monglish.p1:Sole UI/UX designer for an online English academy and its sister brand Edulixa360, serving families across Egypt and the Gulf: research, concept, prototype, stakeholder reviews, developer handoff and QA on staging.`,
      $localize`:@@role.monglish.p2:Designed 15+ mobile-first, bilingual (Arabic RTL / English) pages for 2 brands in 2 months, as about 90% of visitors use phones. 3 are live on monglish.co.uk: Kids Courses, Adult Courses and IELTS Courses.`,
      $localize`:@@role.monglish.p3:Built two design systems, including a React component library with 100+ documented components, tokens, a responsive grid and motion rules, packaged as Claude Code skills so pages ship with fewer design bugs.`,
      $localize`:@@role.monglish.p4:Designed conversion flows: a package configurator with a live summary and price per hour, lead-generation landing pages, and parent-friendly forms with inline validation and duplicate-submit protection.`,
      $localize`:@@role.monglish.p5:WCAG 2.2 AA on every page (AAA where possible): the 3 live pages average 92 on Google Lighthouse accessibility (mobile). I build approved designs as Next.js / React pages with Claude Code and hand them off with detailed spec docs.`,
    ],
  },
  {
    title: $localize`:@@role.gamp-fe.title:Software Engineer (Front-End, Angular)`,
    org: $localize`:@@role.gamp.org:GAMP · Poland (remote)`,
    when: $localize`:@@role.gamp-fe.when:Sep 2023 – Aug 2026`,
    year: '2023',
    kind: 'fe',
    kindLabel: $localize`:@@kind.fe:Front-end`,
    pos: '86%',
    specLabel: $localize`:@@role.gamp-fe.spec:Mostly code`,
    points: [
      $localize`:@@role.gamp-fe.p1:Built Angular features for 3 enterprise products (Safesys, Emitum, ControlER) with designers, QA and backend developers in Agile Scrum (GitLab merge requests, CI/CD, Jira).`,
      $localize`:@@role.gamp-fe.p2:Cut the Safesys alert counts from about 9 seconds to about 1: the front end was counting alerts by filtering the paginated table, so I asked the backend team for a dedicated count endpoint.`,
      $localize`:@@role.gamp-fe.p3:Built a recurring-report scheduler (daily to yearly) with Reactive Forms and Angular Signals, and a shared notification service that keeps unread badges in sync across pages.`,
      $localize`:@@role.gamp-fe.p4:Co-built gampfrontend, a shared Angular library in an NX monorepo (with the Safesys app and Keycloak auth), styled with Tailwind CSS and BEM.`,
      $localize`:@@role.gamp-fe.p5:Wrote Jest unit tests for components, stores and business logic, reaching over 80% coverage on several features.`,
    ],
  },
  {
    title: $localize`:@@role.gamp-ux.title:UI/UX Designer (part-time)`,
    org: $localize`:@@role.gamp.org:GAMP · Poland (remote)`,
    when: $localize`:@@role.gamp-ux.when:Jul 2022 – Aug 2023`,
    year: '2022',
    kind: 'ux',
    kindLabel: 'UI/UX',
    pos: '10%',
    specLabel: $localize`:@@role.gamp-ux.spec:Design only`,
    points: [
      $localize`:@@role.gamp-ux.p1:Designed the UI/UX of GapMap, a management system for agricultural markets (stall, partition and parking management), later used by ZRRT to sell nearly 500 market stalls online.`,
      $localize`:@@role.gamp-ux.p2:Created user flows, wireframes and high-fidelity Figma screens, and worked with the Angular team on handoff, which led to an internal move into front-end development.`,
    ],
  },
];

export const EDUCATION: Education = {
  kindLabel: $localize`:@@edu.kind:Education`,
  title: $localize`:@@edu.title:Bachelor’s in Computer Engineering`,
  when: '2017 – 2022',
  org: $localize`:@@edu.org:BHI · Alexandria, Egypt · Military service completed`,
};

const FROM_AUG_2026 = $localize`:@@quote.source:LinkedIn recommendation · Aug 2026`;

/** LinkedIn recommendations, newest first. */
export const QUOTES: readonly Quote[] = [
  {
    text: [
      '“I’ve had the pleasure of working closely with Youssef at Monglish, where we’re part of the same Interfaces & Development team. Youssef turns ideas and page structures into clean, well-crafted designs. He has delivered landing pages and web designs across our brands, and he works confidently within our shared design system.',
      'What stands out most is his professionalism. He takes ownership of his work and meets deadlines. He’s open to feedback and turns it into better results quickly, without ego. He’s also a reliable teammate who makes collaboration easy, even on busy weeks with tight timelines.',
      'Any team would be lucky to have Youssef, and I recommend him without hesitation.”',
    ],
    source: $localize`:@@quote.amr.source:LinkedIn recommendation · Nov 2026`,
    initials: 'AM',
    name: $localize`:@@quote.amr.name:Amr Mahomud`,
    title: $localize`:@@quote.amr.title:UI/UX Team Leader, my manager at Monglish`,
  },
  {
    text: [
      '“I had the pleasure of working with him as a frontend developer. He is smart, hardworking, quick to find the right information, and communicates in excellent English.”',
    ],
    source: FROM_AUG_2026,
    initials: 'AZ',
    name: $localize`:@@quote.zaki.name:Ahmed Zaki`,
    title: $localize`:@@quote.zaki.title:Head of Software Engineering, GAMP`,
  },
  {
    text: [
      '“I worked with Youssef and observed his willingness to learn and improve his technical skills. As he continues to gain experience and develop his knowledge, I wish him every success in his career.”',
    ],
    source: FROM_AUG_2026,
    initials: 'ME',
    name: $localize`:@@quote.ellithy.name:Moustafa Ellithy`,
    title: $localize`:@@quote.ellithy.title:Senior Front-end Engineer, my manager at GAMP`,
  },
];

