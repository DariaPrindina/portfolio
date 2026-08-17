export type Skill = {
  name: string;
  logo: string;
};

export const skills: Skill[] = [
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'React', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Vite', logo: 'https://cdn.simpleicons.org/vite/646CFF' },
  { name: 'React Query', logo: 'https://cdn.simpleicons.org/reactquery/FF4154' },
  { name: 'Zustand', logo: '/images/skills/zustand.svg' },
  { name: 'React Hook Form', logo: 'https://cdn.simpleicons.org/reacthookform/EC5990' },
  { name: 'React Router', logo: 'https://cdn.simpleicons.org/reactrouter/CA4245' },
  { name: 'Vitest', logo: 'https://cdn.simpleicons.org/vitest/6E9F18' },
  { name: 'Playwright', logo: 'https://cdn.simpleicons.org/playwright/2EAD33' },
  { name: 'Storybook', logo: 'https://cdn.simpleicons.org/storybook/FF4785' },
  { name: 'Lodash', logo: 'https://cdn.simpleicons.org/lodash/3492FF' },
  { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs/8FA8FF' },
  { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux/764ABC' },
  { name: 'Axios', logo: 'https://cdn.simpleicons.org/axios/5A29E4' },
  { name: 'ESLint', logo: 'https://cdn.simpleicons.org/eslint/4B32C3' },
  { name: 'REST API', logo: '/images/skills/rest-api.svg' },
  { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS3', logo: 'https://cdn.simpleicons.org/css/1572B6' },
  { name: 'Sass', logo: 'https://cdn.simpleicons.org/sass/CC6699' },
  { name: 'BEM', logo: '/images/skills/bem.svg' },
  { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma/F24E1E' },
  { name: 'Jira', logo: 'https://cdn.simpleicons.org/jira/0052CC' },
  { name: 'Git', logo: 'https://cdn.simpleicons.org/git/F05032' },
];

export type SkillGroup = {
  id: 'core' | 'data' | 'quality';
  title: string;
  items: string[];
};

/**
 * Навыки сгруппированы по роли в стеке: одна куча из 24 иконок
 * ничего не сообщала о том, как человек думает о технологиях.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: 'core',
    title: 'Каркас',
    items: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'React Router', 'JavaScript'],
  },
  {
    id: 'data',
    title: 'Данные и состояние',
    items: ['TanStack Query', 'Zustand', 'Redux', 'React Hook Form', 'Axios', 'REST API'],
  },
  {
    id: 'quality',
    title: 'Качество и процесс',
    items: ['Vitest', 'Playwright', 'Storybook', 'ESLint', 'Git', 'Figma', 'Jira'],
  },
];

export function findSkillLogo(name: string) {
  return skills.find((skill) => skill.name === name)?.logo;
}
