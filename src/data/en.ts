import type { CertificateItem, EducationItem } from '@/data/education';
import type { ExperienceItem } from '@/data/experience';
import type { Project } from '@/data/projects';
import type { Skill } from '@/data/skills';

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
  intro:
    'Frontend developer with commercial experience in CRM and internal product development. I focus on migration of legacy JavaScript codebases to React/TypeScript with minimal delivery risk.',
  points: [
    'Designing maintainable component architecture and predictable data flows.',
    'Building complex UI: schedules, visit cards, forms, statuses, and filtering.',
    'Fixing production edge-cases in synchronization, dates/time logic, and responsive behavior.',
    'Working closely with backend engineers and shipping features end-to-end.',
  ],
} as const;

export const enSkills: Skill[] = [
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/8FA8FF' },
  { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux/764ABC' },
  { name: 'Axios', logo: 'https://cdn.simpleicons.org/axios/5A29E4' },
  { name: 'REST API', logo: '/images/skills/rest-api.svg' },
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', logo: 'https://cdn.simpleicons.org/css/1572B6' },
  { name: 'Sass', logo: 'https://cdn.simpleicons.org/sass/CC6699' },
  { name: 'BEM', logo: '/images/skills/bem.svg' },
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Jira', logo: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
];

export const enExperience: ExperienceItem[] = [
  {
    company: 'Arbat Beauty',
    period: 'Feb 2025 - Present',
    role: 'Frontend Developer',
    summary: 'CRM product development and migration from legacy frontend to React.',
    bullets: [
      'Migrated key modules from vanilla JavaScript to React/TypeScript.',
      'Built drag-and-drop workflows for schedule and visit cards with server sync.',
      'Introduced predictable client/server state patterns (React Query, Zustand).',
      'Improved stability across date/time logic, responsive layout, and data synchronization.',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'React DnD', 'Axios', 'Sass'],
  },
  {
    company: 'TOVECO LLC',
    period: 'Nov 2024 - May 2025',
    role: 'Frontend Developer',
    summary: 'Admin panel and UI Kit development.',
    bullets: [
      'Built UI components and new pages for internal admin tools.',
      'Implemented filtering features and API integration via Axios.',
      'Contributed to legacy refactoring and routing improvements.',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'Axios', 'Sass', 'Webpack'],
  },
];

export const enProjects: Project[] = [
  {
    slug: 'arbat-beauty-crm',
    title: 'Arbat Beauty CRM',
    description:
      'Current internal product: migrating CRM from JavaScript to React/TypeScript and evolving scheduling modules.',
    longDescription:
      'I maintain and evolve a real internal CRM product, migrating legacy JS flows to React while shipping new scheduling features.',
    codeTitle: 'Visit card component example',
    codeExample: `export function VisitCard({ client, time, status }) {
  return (
    <button className={\`visit-card visit-card--\${status}\`}>
      <strong>{client}</strong>
      <span>{time}</span>
    </button>
  );
}`,
    isCurrent: true,
    stack: ['React 19', 'TypeScript', 'Vite', 'React Query', 'Zustand', 'React DnD', 'React Hook Form', 'Axios', 'Sass'],
    highlights: [
      'Rebuilt schedule and visit modules as reusable React components.',
      'Implemented drag-and-drop flows with server synchronization.',
      'Reduced duplicated business logic and improved maintainability.',
    ],
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    description: 'A currency conversion app with validation, API integration, and real-time recalculation.',
    longDescription:
      'Small but production-like app with form validation, conversion logic and API integration for real rates.',
    codeTitle: 'Conversion utility example',
    codeExample: `export const convert = (amount, rate) => (amount * rate).toFixed(2);`,
    stack: ['JavaScript', 'HTML5', 'SCSS', 'REST API'],
    repoUrl: 'https://github.com/hackathon-team-2/currency-converter-frontend',
    liveUrl: 'https://currency-converter-team2.vercel.app/',
  },
  {
    slug: 'izumrudny-gorod-site',
    title: 'Izumrudny Gorod Website',
    description: 'Frontend for a social center website using Next.js App Router.',
    longDescription: 'Website implementation with reusable UI sections and responsive layout.',
    codeTitle: 'Section component example',
    codeExample: `export const Section = ({ title, text }) => (
  <section>
    <h2>{title}</h2>
    <p>{text}</p>
  </section>
);`,
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    repoUrl: 'https://github.com/izumrudnyygorod/frontend/tree/main',
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
