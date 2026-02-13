export type ExperienceItem = {
  company: string;
  period: string;
  role: string;
  summary: string;
  bullets: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Arbat Beauty (ИП Алексейчук А.И.)',
    period: 'Февраль 2025 — настоящее время',
    role: 'Frontend-разработчик',
    summary: 'Разработка и развитие CRM-системы для салона красоты.',
    bullets: [
      'Полностью переписала значимую часть проекта с ванильного JavaScript на React.',
      'Перевела легаси-экраны на компонентную структуру и упростила поддержку кода.',
      'Реализовала drag-and-drop в расписании и карточках визитов с обновлением на сервере.',
      'Внедрила клиентскую архитектуру со state-менеджментом, формами и кешированием запросов.',
      'Исправила ошибки синхронизации, мобильной верстки и отображения данных в календаре.',
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Vite',
      'React Query',
      'Zustand',
      'React DnD',
      'React Hook Form',
      'React Router',
      'Axios',
      'Sass',
      'React Toastify',
    ],
  },
  {
    company: 'ООО "ТОВЕКО"',
    period: 'Ноябрь 2024 — Май 2025',
    role: 'Frontend-разработчик',
    summary: 'Разработка административной панели и UI Kit.',
    bullets: [
      'Создавала компоненты UI Kit: формы, таблицы, кнопки, модальные окна.',
      'Реализовывала новые страницы и фильтрацию данных.',
      'Подключала backend-интеграцию и обработку ошибок через Axios.',
      'Проводила рефакторинг легаси-кода и маршрутизации.',
    ],
    stack: ['React', 'Redux Toolkit', 'TypeScript', 'Axios', 'Sass', 'Webpack'],
  },
  {
    company: 'ООО "ИНДЛАБ"',
    period: 'Июль 2024 — Октябрь 2024',
    role: 'Frontend-разработчик (стажер, Vue)',
    summary: 'Разработка интерфейсов и форм с локализацией.',
    bullets: [
      'Разрабатывала адаптивные интерфейсы на Vue 3 + Vuetify.',
      'Интегрировала API-запросы через Axios и маршрутизацию через Vue Router.',
      'Работала с состоянием через Pinia и поддержкой нескольких языков через i18n.',
    ],
    stack: ['Vue 3', 'Vuetify', 'Pinia', 'Axios', 'Vue Router', 'SCSS'],
  },
];
