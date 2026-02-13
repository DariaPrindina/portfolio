# Portfolio

Портфолио на Next.js (App Router) и TypeScript.

## Архитектура

- `src/app` - роуты и layout (Next.js App Router).
- `src/widgets` - секции страниц (Hero, Projects, Experience и т.д.).
- `src/entities` - предметные модели и типизированные данные (skills, projects, profile, education).
- `src/shared` - общий слой: `ui`, `lib`, `config`.
  - `src/shared/ui/lists` - общие list-компоненты RU/EN.
  - `src/shared/lib` - SEO и GitHub API-утилиты.
  - `src/shared/config` - домен и OG-конфиг.

## Что улучшено

- Снижен дублирующийся JSX между RU и EN версиями через shared-компоненты.
- Централизована генерация `Metadata` (OpenGraph/Twitter) через `buildPageMetadata`.
- Добавлены инженерные quality-скрипты: `check`, `typecheck`, `lint:fix`.
- Добавлена тестовая база на `Vitest` + `jsdom`.
- Настроены pre-commit хуки: `husky` + `lint-staged`.
- Усилен TypeScript-конфиг (`noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noFallthroughCasesInSwitch`).
- Добавлен CI workflow `.github/workflows/quality.yml` для автоматической проверки lint/typecheck/test/build.
- Добавлен `.editorconfig` для единообразного форматирования.
- Добавлен динамический social preview (`/opengraph-image`) для стабильного предпросмотра в мессенджерах.
- Удалены лишние dev-зависимости, которые не использовались в проекте.

## Требования

- Node.js `>=20.9.0`
- npm `>=10`

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run lint
npm run typecheck
npm run check
npm run test
npm run build
```

Если `npm run build` падает с ошибкой версии Node, обновите Node.js до версии 20+.
