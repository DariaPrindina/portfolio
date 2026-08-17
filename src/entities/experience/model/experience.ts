export type ExperienceItem = {
  company: string;
  period: string;
  /** Начало в формате YYYY-MM — для временной шкалы. */
  start: string;
  /** Окончание в формате YYYY-MM; null — работаю сейчас. */
  end: string | null;
  /** Тип занятости: определяет цвет полосы на шкале. */
  kind: 'current' | 'past' | 'internship';
  role: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Arbat Beauty (ИП Алексейчук А.И.)',
    period: 'Май 2025 — настоящее время',
    start: '2025-05',
    end: null,
    kind: 'current',
    role: 'Frontend-разработчик',
    summary: 'Разработка и развитие CRM-системы для сети салонов красоты.',
    bullets: [
      'Мигрировала легаси-фронтенд на React 19 и TypeScript, сократив количество UI-багов и упростив поддержку.',
      'Сократила количество сетевых запросов в 3.3 раза.',
      'Ускорила рендер расписания после смены дня примерно в 8.7 раза, открытие карточки визита — в 3.5 раза.',
      'Внедрила prefetch диапазона дат для плавной навигации по расписанию.',
      'Настроила управление серверным состоянием через React Query: query keys, prefetch, retry, devtools.',
      'Заменила стороннюю библиотеку drag-and-drop собственной реализацией на mouse-событиях и вынесла её в переиспользуемый хук.',
      'Развивала ключевые модули CRM: расписание, карточки визитов, склад и технологические карты, расчёт зарплат.',
      'Повысила надёжность интерфейса: ErrorBoundary, обработка ошибок дат и времени, конфликтных состояний и проблем синхронизации.',
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
    company: 'ООО «ТОВЕКО»',
    period: 'Декабрь 2024 — Май 2025',
    start: '2024-12',
    end: '2025-05',
    kind: 'past',
    role: 'Frontend-разработчик',
    summary: 'Разработка административной панели и UI-компонентов.',
    bullets: [
      'Создавала компоненты UI Kit: формы, таблицы, кнопки, модальные окна.',
      'Реализовывала новые страницы и фильтрацию данных.',
      'Интегрировала фронтенд с API через Axios, включая обработку ошибок.',
      'Участвовала в рефакторинге легаси-кода и улучшении маршрутизации.',
    ],
    stack: ['React', 'TypeScript', 'Redux Toolkit', 'Axios', 'Sass', 'Webpack'],
  },
  {
    company: 'ИП Перцовский Р. Е.',
    period: 'Ноябрь 2024 — Декабрь 2024',
    start: '2024-11',
    end: '2024-12',
    kind: 'past',
    role: 'Frontend-разработчик (проект)',
    summary: 'Коммуникационный хаб для маркетингового агентства.',
    bullets: [
      'Разрабатывала новые страницы и компоненты коммуникационного хаба.',
      'Работала с легаси-кодом на JavaScript и переносила функциональность на React.',
    ],
    stack: ['React', 'JavaScript', 'SCSS'],
  },
  {
    company: 'Проектные стажировки',
    period: 'Октябрь 2024 — Декабрь 2024',
    start: '2024-10',
    end: '2024-12',
    kind: 'internship',
    role: 'Frontend Developer Intern (React / Vue / React Native)',
    summary: 'Разработка интерфейсов в командах 3–6 человек по Agile-процессу.',
    bullets: [
      'Разрабатывала UI-компоненты и страницы на React, Vue 3 и React Native.',
      'Работала с формами, таблицами и модальными окнами.',
      'Интегрировала REST API через Axios, настраивала маршрутизацию и состояние.',
      'Реализовывала состояния загрузки и обработку ошибок, исправляла UI-баги.',
    ],
    stack: ['React', 'TypeScript', 'Vue 3', 'React Native', 'Redux Toolkit', 'Pinia', 'Axios', 'SCSS'],
  },
];
