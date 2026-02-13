# Portfolio

Портфолио на Next.js (App Router) и TypeScript.

## Что улучшено

- Страница разделена на независимые секции: `Hero`, `Skills`, `Projects`, `Contact`, `Footer`.
- Контент вынесен в типизированные данные: `src/data/profile.ts`, `src/data/skills.ts`, `src/data/projects.ts`.
- Убраны нерабочие Tailwind-классы, интерфейс переведен на чистый CSS в `src/app/globals.css`.
- Улучшена семантика и доступность: `section` + `id`, корректные ссылки, `aria-label`, `focus-visible`.
- Обновлены метаданные и язык документа (`ru`).

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
npm run build
```

Если `npm run build` падает с ошибкой версии Node, обновите Node.js до версии 20+.
