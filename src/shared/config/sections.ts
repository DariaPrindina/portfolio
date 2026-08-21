/**
 * Единственный источник идентификаторов секций.
 *
 * Раньше id жили в вёрстке виджетов, а навигация ссылалась на них строками:
 * переименование секции молча ломало пункт меню, и заметить это можно было
 * только кликом. Теперь несоответствие ловит тест.
 */
export const SECTION_IDS = {
  hero: 'about',
  about: 'about-me',
  skills: 'skills',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  resume: 'resume',
  contact: 'contact',
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

/**
 * Разделы в порядке появления в меню — общий для шапки и подвала.
 * `as const satisfies` даёт точный union вместо широкого SectionKey[],
 * поэтому словарь подписей не может разойтись с этим списком.
 */
export const NAV_SECTIONS = [
  'about',
  'skills',
  'experience',
  'projects',
  'resume',
  'contact',
] as const satisfies readonly SectionKey[];

export type NavSection = (typeof NAV_SECTIONS)[number];

export function sectionHref(key: SectionKey): string {
  return `#${SECTION_IDS[key]}`;
}
