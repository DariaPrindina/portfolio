export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  highlights?: string[];
  codeTitle: string;
  codeExample: string;
  isCurrent?: boolean;
  repoUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: 'arbat-beauty-crm',
    title: 'Arbat Beauty CRM',
    description:
      'Текущий внутренний продукт: миграция CRM с JavaScript на React/TypeScript и развитие ключевых модулей расписания.',
    longDescription:
      'Я развиваю внутреннюю CRM для салона красоты: перевожу легаси-части на компонентную React-архитектуру, стабилизирую сложные сценарии расписания и улучшаю UX рабочих экранов для администраторов.',
    isCurrent: true,
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Query',
      'Zustand',
      'React DnD',
      'React Hook Form',
      'Axios',
      'Sass',
    ],
    highlights: [
      'Переписала ключевые модули CRM: календарь, карточки визитов и управление статусами.',
      'Реализовала drag-and-drop визитов между слотами и сотрудниками с синхронизацией на сервер.',
      'Снизила объем дублирующейся логики за счет переиспользуемых React-компонентов и общей модели состояния.',
      'Исправила мобильные и кросс-браузерные проблемы в расписании.',
    ],
    codeTitle: 'Пример компонента карточки визита',
    codeExample: `type VisitCardProps = {
  id: string;
  clientName: string;
  time: string;
  status: 'new' | 'confirmed' | 'done';
  onOpen: (id: string) => void;
};

export function VisitCard({ id, clientName, time, status, onOpen }: VisitCardProps) {
  return (
    <button className={\`visit-card visit-card--\${status}\`} onClick={() => onOpen(id)}>
      <span className="visit-card__time">{time}</span>
      <span className="visit-card__client">{clientName}</span>
      <span className="visit-card__status">{status}</span>
    </button>
  );
}`,
  },
  {
    slug: 'izumrudny-gorod-site',
    title: 'Центр адаптации "Изумрудный город"',
    description:
      'Frontend сайта на Next.js App Router: верстка страниц и разработка базовых UI-компонентов.',
    longDescription:
      'В рамках проектной работы я собрала публичный сайт организации: реализовала базовую архитектуру страниц, адаптивную верстку и переиспользуемые UI-элементы, чтобы упростить дальнейшее развитие контента.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'ESLint'],
    highlights: ['Собрала 3 UI-компонента.', 'Сверстала 3 полноценные страницы.'],
    codeTitle: 'Пример секционного компонента страницы',
    codeExample: `type SectionProps = {
  title: string;
  text: string;
};

export function InfoSection({ title, text }: SectionProps) {
  return (
    <section className="info-section">
      <h2>{title}</h2>
      <p>{text}</p>
      <a href="#contact">Связаться</a>
    </section>
  );
}`,
    repoUrl: 'https://github.com/izumrudnyygorod/frontend/tree/main',
  },
  {
    slug: 'currency-converter',
    title: 'Currency Converter',
    description:
      'Сервис конвертации валют с валидацией формы, динамическими курсами и обновлением результата в реальном времени.',
    longDescription:
      'Это веб-приложение для конвертации валют, где я реализовала пользовательский поток от ввода данных до моментального пересчета результата на основе серверных курсов, включая валидацию и защиту от ошибок ввода.',
    stack: ['JavaScript', 'HTML5', 'SCSS', 'REST API'],
    highlights: [
      'Реализовала расчеты и двустороннюю конвертацию валют.',
      'Сделала валидацию и форматирование ввода.',
      'Интегрировала фронтенд с backend API.',
    ],
    codeTitle: 'Пример функции конвертации',
    codeExample: `export function convertCurrency(amount, rate, precision = 2) {
  if (!Number.isFinite(amount) || !Number.isFinite(rate)) {
    return '0.00';
  }

  const result = amount * rate;
  return result.toFixed(precision);
}`,
    repoUrl: 'https://github.com/hackathon-team-2/currency-converter-frontend',
    liveUrl: 'https://currency-converter-team2.vercel.app/',
  },
  {
    slug: 'procharity-platform',
    title: 'ProCharity Platform',
    description:
      'Командная разработка платформы для волонтеров и НКО в приватном репозитории: фиксы, тесты и улучшение архитектуры.',
    longDescription:
      'В команде я работала с модульной frontend-архитектурой: исправляла UI-баги, поддерживала тесты и участвовала в рефакторинге, чтобы платформа оставалась стабильной при развитии функционала.',
    stack: [
      'React',
      'TypeScript',
      'SCSS',
      'Storybook',
      'Jest',
      'MongoDB',
      'Redis',
    ],
    highlights: [
      'Чинила баги верстки и автотестов.',
      'Участвовала в структуризации и рефакторинге кодовой базы.',
    ],
    codeTitle: 'Пример теста UI-компонента',
    codeExample: `import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

describe('UserCard', () => {
  it('renders name and role', () => {
    render(<UserCard name="Alex" role="Volunteer" />);

    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Volunteer')).toBeInTheDocument();
  });
});`,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
