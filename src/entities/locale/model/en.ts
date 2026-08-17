import type { CertificateItem, EducationItem } from '@/entities/education/model/education';
import type { ExperienceItem } from '@/entities/experience/model/experience';
import type { Project } from '@/entities/project/model/projects';
import type { SkillGroup } from '@/entities/skill/model/skills';
import type { MigrationRow } from '@/entities/about/model/about';

export const enProfile = {
  name: 'Daria Prindina',
  role: 'Frontend Developer',
  tagline:
    'I modernize and scale frontend products: from legacy JavaScript to maintainable React architecture.',
  location: 'Saint Petersburg, Russia',
  email: '00dariaprindina00@gmail.com',
  telegram: 'https://t.me/darht_vadr',
  github: 'https://github.com/DariaPrindina',
  avatar: '/images/avatar.jpg',
} as const;

export const enAbout = {
  points: [
    'Designing maintainable component architecture and predictable data flows.',
    'Building complex UI: schedules, visit cards, forms, statuses, and filtering.',
    'Fixing production edge-cases in synchronization, dates/time logic, and responsive behavior.',
    'Working closely with backend engineers and shipping features end-to-end.',
  ],
} as const;

export const enExperience: ExperienceItem[] = [
  {
    company: 'Arbat Beauty',
    period: 'May 2025 — Present',
    start: '2025-05',
    end: null,
    kind: 'current',
    role: 'Frontend Developer',
    summary: 'Development of a CRM system for a beauty salon chain.',
    bullets: [
      'Migrated the legacy frontend to React 19 and TypeScript, cutting UI bugs and simplifying maintenance.',
      'Reduced the number of network requests by 3.3x.',
      'Made the schedule re-render about 8.7x faster on a day change, and visit cards open 3.5x faster.',
      'Added date-range prefetching for smoother navigation across the schedule.',
      'Set up server state with React Query: query keys, prefetch, retry, devtools.',
      'Replaced a third-party drag-and-drop library with a custom mouse-event implementation extracted into a reusable hook.',
      'Owned core CRM modules: scheduling, visit cards, inventory and tech maps, payroll.',
      'Hardened the UI: ErrorBoundary, date/time error handling, conflicting states and sync issues.',
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'React Router',
      'Axios',
      'Sass',
      'Storybook',
      'Vitest',
      'Playwright',
    ],
  },
  {
    company: 'TOVECO LLC',
    period: 'Dec 2024 — May 2025',
    start: '2024-12',
    end: '2025-05',
    kind: 'past',
    role: 'Frontend Developer',
    summary: 'Admin panel and UI component development.',
    bullets: [
      'Built UI Kit components: forms, tables, buttons, modals.',
      'Implemented new pages and data filtering.',
      'Integrated the frontend with the API via Axios, including error handling.',
      'Contributed to legacy refactoring and routing improvements.',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'Axios', 'Sass', 'Webpack'],
  },
  {
    company: 'Pertsovsky R. E. (sole proprietor)',
    period: 'Nov 2024 — Dec 2024',
    start: '2024-11',
    end: '2024-12',
    kind: 'past',
    role: 'Frontend Developer (contract)',
    summary: 'Communication hub for a marketing agency.',
    bullets: [
      'Built new pages and components for the communication hub.',
      'Worked with legacy JavaScript and ported functionality to React.',
    ],
    stack: ['React', 'JavaScript', 'SCSS'],
  },
  {
    company: 'Project internships',
    period: 'Oct 2024 — Dec 2024',
    start: '2024-10',
    end: '2024-12',
    kind: 'internship',
    role: 'Frontend Developer Intern (React / Vue / React Native)',
    summary: 'Building interfaces in teams of 3–6 people on an Agile process.',
    bullets: [
      'Built UI components and pages in React, Vue 3 and React Native.',
      'Worked with forms, tables and modal dialogs.',
      'Integrated REST APIs via Axios, set up routing and state management.',
      'Implemented loading and error states, fixed UI bugs.',
    ],
    stack: ['React', 'TypeScript', 'Vue 3', 'React Native', 'Redux Toolkit', 'Pinia', 'Axios', 'SCSS'],
  },
];

export const enProjects: Project[] = [
  {
    slug: 'arbat-beauty-crm',
    category: 'commercial',
    title: 'Arbat Beauty CRM',
    description:
      'Commercial CRM for a beauty salon chain: migrating the product from legacy JavaScript to React/TypeScript and owning the scheduling, inventory and payroll modules.',
    longDescription:
      'My main commercial project since May 2025. An internal CRM used daily by salon administrators for bookings, staff scheduling, inventory and payroll. I am the top contributor — I lead the migration of the legacy frontend to React 19 and TypeScript, design the architecture along Feature-Sliced Design, and own modules end to end.',
    isCurrent: true,
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'React Hook Form',
      'React Router',
      'Sass',
      'Storybook',
      'Vitest',
      'Playwright',
    ],
    highlights: [
      'Top contributor: 1486 commits over 15 months.',
      'Custom drag-and-drop built on mouse events instead of a ready-made library — extracted into a shared hook and reused by the schedule grid and the shared data table.',
      'Own entire modules: staff scheduling, visits and clients, inventory and tech maps, payroll and payouts.',
      'Feature-Sliced Design architecture across 10 domain entities.',
      'Testing pyramid: Vitest for unit and component tests, Playwright for e2e, 34 Storybook stories.',
    ],
    caseStudy: {
      context:
        'An internal product for the daily work of salon administrators: client bookings, staff schedules, consumable inventory and employee payroll.',
      challenge: [
        'Legacy JavaScript frontend with duplicated business logic: a single change had to be made in several places.',
        'The schedule is the heaviest screen in the product: dozens of employees, a monthly grid, reordering rows and shifts without a reload.',
        'Off-the-shelf drag-and-drop libraries did not fit: the native HTML5 drag decides whether a drag starts before React can mark the row, and it drags an unstylable ghost with a "copy" badge.',
        'Modules had to be rewritten without pausing feature delivery for the business.',
      ],
      solution: [
        'Moved to React 19 + TypeScript and decomposed the code along Feature-Sliced Design: 10 domain entities instead of one shared pile of components.',
        'Split server state from client state: TanStack Query for server data, Zustand for UI state.',
        'Built a custom row-reordering hook on mouse events: a copy of the row follows the cursor while neighbours slide apart via CSS transforms written straight to the DOM, bypassing React re-renders.',
        'Replaced copy-paste with shared components: a data table, React Hook Form based forms and one set of controls used across every module.',
        'Test coverage on three levels so the migration would not break already working screens.',
      ],
      impact: [
        { label: 'Contribution', value: '1486 commits, top contributor' },
        { label: 'Duration', value: '15 months of continuous work' },
        { label: 'Architecture', value: '10 domain entities, Feature-Sliced Design' },
        { label: 'Reuse', value: 'One drag-and-drop hook powers 2 modules' },
      ],
    },
    codeTitle: 'Reordering schedule rows: neighbours slide apart via transform',
    codeExample: `// Transforms are written straight to the DOM: going through React would
// re-render every row on every crossed row, and a schedule row is an
// employee cell plus one cell per day of the month.
const applyShifts = (target: number) => {
  const pitch = pitchRef.current;
  const from = draggedRef.current;
  if (from === null || !pitch) return;

  rowElementsRef.current.forEach((elements, rowIndex) => {
    let shift = 0;
    if (rowIndex === from) shift = (target - from) * pitch;
    else if (rowIndex > from && rowIndex <= target) shift = -pitch;
    else if (rowIndex < from && rowIndex >= target) shift = pitch;

    elements.forEach((element) => {
      element.style.transform = shift ? \`translateY(\${shift}px)\` : '';
    });
  });
};`,
  },
  {
    slug: 'vibe-x',
    category: 'pet',
    title: 'Vibe-X',
    description:
      'Side project: a real-time messenger with chats, voice and video calls. Java backend, React frontend, my own server and deployment.',
    longDescription:
      'A messenger I build and run in production on my own — from the database schema to nginx on a VDS. Chats with WebSocket updates, attachments, reactions, read and presence states, a Call Hub mode with voice and video calls over WebRTC, and opt-in end-to-end encrypted secret chats behind a feature flag. Beyond the web there is a Tauri desktop shell and a React Native mobile client.',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'WebSocket',
      'WebRTC',
      'Java 21',
      'Spring Boot 3',
      'PostgreSQL',
      'Redis',
      'Docker',
    ],
    highlights: [
      'Full stack solo: Java 21 and Spring Boot 3 on the backend, React 18 on the frontend, deployed to my own VDS.',
      'Real-time layer over WebSocket: message delivery, typing indicators, presence and unread counters.',
      'Voice and video calls over WebRTC with signalling on top of WebSocket and a self-hosted TURN server.',
      'Opt-in end-to-end encrypted secret chats behind a feature flag.',
      'Three clients on one API: web, desktop (Tauri) and mobile (React Native).',
    ],
    caseStudy: {
      context:
        'A side project with no team and no client: a messenger where I work through what product CRM development does not cover — real-time, WebRTC and my own infrastructure.',
      challenge: [
        'A WebSocket connection drops constantly: a sleeping laptop, the metro, switching from Wi-Fi to mobile data.',
        'The access token cannot go into the socket URL — it would end up in nginx access logs.',
        'Calls need signalling: the offer/answer and ICE candidate exchange has to survive the same drops.',
        'One API serves three different clients.',
      ],
      solution: [
        'Reconnect with exponential backoff: 1.5 seconds, each next attempt 1.6x longer, capped at 10 seconds.',
        'Instant reconnect on the online event instead of waiting for the timer — a restored connection does not make you wait.',
        'Authentication via Sec-WebSocket-Protocol: the token travels in the handshake header rather than the query string, and the server derives identity from the token.',
        'Connection status lifted into application state so the UI honestly shows reconnecting instead of silence.',
      ],
      impact: [
        { label: 'Role', value: 'Sole developer' },
        { label: 'Stack', value: 'Full-stack: Java 21 + React 18' },
        { label: 'Clients', value: 'Web, desktop (Tauri), mobile (React Native)' },
        { label: 'Infrastructure', value: 'Own VDS, Docker, nginx, TURN server' },
      ],
    },
    codeTitle: 'WebSocket reconnect with exponential backoff',
    codeExample: `// Auth via Sec-WebSocket-Protocol: ['vibex.auth', token] keeps the token
// out of the URL and out of access logs. The server validates it and
// derives the identity from the token.
const socket = new WebSocket(\`\${wsBaseUrl}/ws/chats/\${activeChatId}\`, [
  'vibex.auth',
  token,
]);

socket.onclose = (event) => {
  emitStatus('closed', { closeCode: event.code });
  if (!shouldReconnectRef.current) return;

  const delay = reconnectDelayMsRef.current;
  reconnectDelayMsRef.current = Math.min(
    Math.round(reconnectDelayMsRef.current * 1.6),
    10_000,
  );
  reconnectTimeoutRef.current = window.setTimeout(() => connect(true), delay);
};

// The connection is back — reconnect now, do not wait for the next tick.
const handleOnline = () => {
  if (!shouldReconnectRef.current) return;
  reconnectDelayMsRef.current = 1500;
  connect(true);
};`,
    liveUrl: 'https://vibe-x.ru',
  },
  {
    slug: 'procharity-platform',
    category: 'team',
    title: 'ProCharity Platform',
    description:
      'Team work on a platform for volunteers and NGOs in a private repository: bug fixes, tests and architecture improvements.',
    longDescription:
      'I worked with a modular frontend architecture in a team: fixing UI bugs, maintaining tests and taking part in refactoring so the platform stayed stable as features grew.',
    codeTitle: 'UI component test example',
    codeExample: `import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders name and role', () => {
    render(<UserCard name="Alex" role="Volunteer" />);

    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Volunteer')).toBeInTheDocument();
  });
});`,
    stack: ['React', 'TypeScript', 'SCSS', 'Storybook', 'Jest'],
    highlights: [
      'Fixed layout and automated test failures.',
      'Took part in restructuring and refactoring the codebase.',
    ],
  },
  {
    slug: 'currency-converter',
    category: 'team',
    title: 'Currency Converter',
    description: 'A currency conversion app with validation, API integration, and real-time recalculation.',
    longDescription:
      'Small but production-like app with form validation, conversion logic and API integration for real rates.',
    codeTitle: 'Conversion utility example',
    codeExample: `export function convertCurrency(amount, rate, precision = 2) {
  if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
    return '0.00';
  }

  return (amount * rate).toFixed(precision);
}`,
    stack: ['JavaScript', 'HTML5', 'SCSS', 'REST API'],
    highlights: [
      'Implemented two-way conversion and the calculation logic.',
      'Added input validation and formatting.',
      'Integrated the frontend with the backend API.',
    ],
    repoUrl: 'https://github.com/hackathon-team-2/currency-converter-frontend',
    liveUrl: 'https://currency-converter-team2.vercel.app/',
  },
  {
    slug: 'izumrudny-gorod-site',
    category: 'team',
    title: 'Izumrudny Gorod Website',
    description: 'Frontend for a social center website using Next.js App Router.',
    longDescription: 'Website implementation with reusable UI sections and responsive layout.',
    codeTitle: 'Section component example',
    codeExample: `type SectionProps = {
  title: string;
  text: string;
};

export function InfoSection({ title, text }: SectionProps) {
  return (
    <section className="info-section">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  );
}`,
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    highlights: ['Built 3 UI components.', 'Implemented 3 full pages.'],
  },
];

export const enEducation: EducationItem[] = [
  {
    degree: 'MSc, Applied Informatics',
    institution: 'ITMO University, Saint Petersburg',
    details: 'Institute of Applied Computer Science',
    year: '2027 (in progress)',
  },
  {
    degree: 'BA, Advertising and PR',
    institution: 'Saint Petersburg State University of Economics',
    details: 'Faculty of Humanities',
    year: '2022',
  },
];

export const enCertificates: CertificateItem[] = [
  {
    title: 'Fullstack Developer Program',
    issuer: 'Yandex Practicum',
    year: '2024',
  },
  {
    title: 'Professional Retraining Diploma: Web Developer Plus',
    issuer: 'Professional Program',
    year: '2024',
  },
  {
    title: 'Recommendation Letter after MIRR.ART internship',
    issuer: 'INDLAB',
    year: '2025',
  },
];

export const enSkillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Core',
    items: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'React Router', 'JavaScript'],
  },
  {
    id: 'data',
    title: 'Data and state',
    items: ['TanStack Query', 'Zustand', 'Redux', 'React Hook Form', 'Axios', 'REST API'],
  },
  {
    id: 'quality',
    title: 'Quality and process',
    items: ['Vitest', 'Playwright', 'Storybook', 'ESLint', 'Git', 'Figma', 'Jira'],
  },
];

export const enAboutMigration: MigrationRow[] = [
  { kind: 'del', text: 'legacy JavaScript, duplicated business logic' },
  { kind: 'add', text: 'React 19 + TypeScript, Feature-Sliced Design architecture' },
  { kind: 'add', text: 'Vitest, Playwright, Storybook — migration without regressions' },
];

export function getEnProjectBySlug(slug: string) {
  return enProjects.find((project) => project.slug === slug);
}
