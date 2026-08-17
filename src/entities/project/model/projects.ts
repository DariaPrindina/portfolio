export type ProjectCategory = 'commercial' | 'pet' | 'team';

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  commercial: 'Коммерческие',
  pet: 'Пет-проекты',
  team: 'Командные и учебные',
};

/** Порядок дорожек: от коммерческого опыта к учебному. */
export const projectCategoryOrder: ProjectCategory[] = ['commercial', 'pet', 'team'];

export type Project = {
  caseStudy?: {
    context: string;
    challenge: string[];
    solution: string[];
    impact: Array<{ label: string; value: string }>;
  };
  slug: string;
  category: ProjectCategory;
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
    category: 'commercial',
    title: 'Arbat Beauty CRM',
    description:
      'Коммерческая CRM для сети салонов красоты: перевожу продукт с легаси-JavaScript на React/TypeScript и веду ключевые модули — расписание, склад, зарплаты.',
    longDescription:
      'Основной рабочий проект с мая 2025 года. Внутренняя CRM, в которой ежедневно работают администраторы салонов: запись клиентов, расписание мастеров, складской учёт, расчёт зарплат. Я первый контрибьютор проекта — веду миграцию легаси-фронтенда на React 19 и TypeScript, проектирую архитектуру по FSD и закрываю модули целиком, от макета до релиза.',
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
      'Первый контрибьютор проекта: 1486 коммитов за 15 месяцев работы.',
      'Своя реализация drag-and-drop на mouse-событиях вместо готовой библиотеки — вынесена в shared-хук и переиспользуется в сетке расписания и в общей таблице данных.',
      'Веду модули целиком: расписание мастеров, визиты и клиенты, склад и технологические карты, зарплаты и выплаты.',
      'Архитектура Feature-Sliced Design: 10 доменных сущностей с изолированными слоями.',
      'Тестовая пирамида: Vitest на unit и компоненты, Playwright на e2e, 34 Storybook-стори.',
    ],
    caseStudy: {
      context:
        'Внутренний продукт для ежедневной работы администраторов сети салонов: запись клиентов, расписание мастеров, складской учёт расходников, расчёт зарплат сотрудников.',
      challenge: [
        'Легаси-фронтенд на JavaScript с дублированием бизнес-логики: одно изменение приходилось вносить в нескольких местах.',
        'Расписание — самый нагруженный экран продукта: десятки сотрудников, месячная сетка, перестановка строк и смен без перезагрузки.',
        'Готовые библиотеки drag-and-drop не подошли: нативный HTML5-драг решает о старте перетаскивания раньше, чем React успевает пометить строку, и тащит неуправляемый ghost с иконкой «копировать».',
        'Переписывать модули нужно было без остановки поставки фич для бизнеса.',
      ],
      solution: [
        'Переход на React 19 + TypeScript и декомпозиция по Feature-Sliced Design: 10 доменных сущностей вместо общей свалки компонентов.',
        'Разделение server-state и client-state: TanStack Query для данных с сервера, Zustand для состояния интерфейса.',
        'Собственный хук перестановки строк на mouse-событиях: копия строки летит за курсором, соседи разъезжаются через CSS-transform напрямую в DOM, минуя ререндер React.',
        'Общие компоненты вместо копипасты: таблица данных, формы на React Hook Form и единый набор контролов подключены во всех модулях.',
        'Тестовое покрытие на трёх уровнях, чтобы миграция не ломала уже работающие экраны.',
      ],
      impact: [
        { label: 'Вклад в проект', value: '1486 коммитов, первый контрибьютор' },
        { label: 'Срок', value: '15 месяцев непрерывной работы' },
        { label: 'Архитектура', value: '10 доменных сущностей по FSD' },
        { label: 'Переиспользование', value: 'Drag-and-drop работает в 2 модулях из одного хука' },
      ],
    },
    codeTitle: 'Перестановка строк расписания: соседи разъезжаются через transform',
    codeExample: `// Трансформации пишутся напрямую в DOM: проход через React означал бы
// ререндер всех строк на каждую пересечённую, а строка расписания — это
// ячейка сотрудника плюс по ячейке на каждый день месяца.
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
};

const settle = () => {
  // Новый порядок и снятые трансформации должны попасть на экран в одном
  // кадре: применённые друг за другом, они дают моргание старым порядком.
  flushSync(() => {
    setDraggedIndex(null);
    if (from !== null && to !== null && from !== to) onReorder(from, to);
  });
};`,
  },
  {
    slug: 'vibe-x',
    category: 'pet',
    title: 'Vibe-X',
    description:
      'Пет-проект: real-time мессенджер с чатами, голосовыми и видеозвонками. Java-бэкенд, React-фронтенд, собственный сервер и деплой.',
    longDescription:
      'Мессенджер, который я делаю и держу в проде самостоятельно — от схемы базы до nginx на VDS. Чаты с WebSocket-обновлениями, вложения, реакции, статусы прочтения и присутствия, режим Call Hub с голосовыми и видеозвонками на WebRTC, секретные чаты со сквозным шифрованием за фиче-флагом. Кроме веба есть desktop-оболочка на Tauri и мобильный клиент на React Native.',
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
      'Полный цикл в одиночку: бэкенд на Java 21 и Spring Boot 3, фронтенд на React 18, деплой на собственный VDS.',
      'Real-time слой на WebSocket: доставка сообщений, индикатор набора текста, присутствие и счётчики непрочитанного.',
      'Голосовые и видеозвонки на WebRTC с сигналингом поверх WebSocket и своим TURN-сервером.',
      'Секретные чаты со сквозным шифрованием за фиче-флагом.',
      'Три клиента на одном API: web, desktop на Tauri и mobile на React Native.',
    ],
    caseStudy: {
      context:
        'Пет-проект без команды и без заказчика: мессенджер, на котором я разбираю то, что не встречается в продуктовой разработке CRM — real-time, WebRTC, собственная инфраструктура.',
      challenge: [
        'WebSocket-соединение рвётся постоянно: спящий ноутбук, метро, переключение Wi-Fi на мобильную сеть.',
        'Токен доступа нельзя класть в URL сокета — он осядет в логах доступа nginx.',
        'Звонки требуют сигналинга: обмен offer/answer и ICE-кандидатами должен пережить те же обрывы связи.',
        'Один и тот же API обслуживает три разных клиента.',
      ],
      solution: [
        'Переподключение с экспоненциальной задержкой: 1.5 секунды, каждая следующая попытка в 1.6 раза дольше, потолок 10 секунд.',
        'Мгновенное переподключение по событию online вместо ожидания таймера — возврат связи не заставляет ждать.',
        'Авторизация через Sec-WebSocket-Protocol: токен уходит в заголовке рукопожатия, а не в строке запроса, сервер выводит личность из токена.',
        'Статус соединения поднят в состояние приложения, интерфейс честно показывает переподключение вместо тишины.',
      ],
      impact: [
        { label: 'Роль', value: 'Единственный разработчик' },
        { label: 'Стек', value: 'Full-stack: Java 21 + React 18' },
        { label: 'Клиенты', value: 'Web, desktop (Tauri), mobile (React Native)' },
        { label: 'Инфраструктура', value: 'Свой VDS, Docker, nginx, TURN-сервер' },
      ],
    },
    codeTitle: 'Переподключение WebSocket с экспоненциальной задержкой',
    codeExample: `// Авторизация через Sec-WebSocket-Protocol: ['vibex.auth', token] —
// токен не попадает в URL и в логи доступа. Сервер валидирует его
// и выводит личность из токена.
const socket = new WebSocket(\`\${wsBaseUrl}/ws/chats/\${activeChatId}\`, [
  'vibex.auth',
  token,
]);

socket.onopen = () => {
  reconnectAttemptsRef.current = 0;
  reconnectDelayMsRef.current = 1500;
  emitStatus('open');
};

socket.onclose = (event) => {
  emitStatus('closed', { closeCode: event.code });
  if (!shouldReconnectRef.current) return;

  reconnectAttemptsRef.current += 1;
  const delay = reconnectDelayMsRef.current;
  reconnectDelayMsRef.current = Math.min(
    Math.round(reconnectDelayMsRef.current * 1.6),
    10_000,
  );
  reconnectTimeoutRef.current = window.setTimeout(() => connect(true), delay);
};

// Связь вернулась — подключаемся сразу, не дожидаясь следующего тика таймера.
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
      'Командная разработка платформы для волонтёров и НКО в приватном репозитории: фиксы, тесты и улучшение архитектуры.',
    longDescription:
      'В команде я работала с модульной frontend-архитектурой: исправляла UI-баги, поддерживала тесты и участвовала в рефакторинге, чтобы платформа оставалась стабильной при развитии функционала.',
    stack: ['React', 'TypeScript', 'SCSS', 'Storybook', 'Jest'],
    highlights: [
      'Чинила баги вёрстки и автотестов.',
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
  {
    slug: 'currency-converter',
    category: 'team',
    title: 'Currency Converter',
    description:
      'Сервис конвертации валют с валидацией формы, динамическими курсами и обновлением результата в реальном времени.',
    longDescription:
      'Веб-приложение для конвертации валют, где я реализовала пользовательский поток от ввода данных до моментального пересчёта результата на основе серверных курсов, включая валидацию и защиту от ошибок ввода.',
    stack: ['JavaScript', 'HTML5', 'SCSS', 'REST API'],
    highlights: [
      'Реализовала расчёты и двустороннюю конвертацию валют.',
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
    slug: 'izumrudny-gorod-site',
    category: 'team',
    title: 'Центр адаптации «Изумрудный город»',
    description:
      'Frontend сайта на Next.js App Router: вёрстка страниц и разработка базовых UI-компонентов.',
    longDescription:
      'В рамках проектной работы я собрала публичный сайт организации: реализовала базовую архитектуру страниц, адаптивную вёрстку и переиспользуемые UI-элементы, чтобы упростить дальнейшее развитие контента.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
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
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
