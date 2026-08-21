import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { NAV_SECTIONS, SECTION_IDS, sectionHref, type SectionKey } from './sections';

const WIDGET_FILES: Record<SectionKey, string> = {
  hero: 'src/widgets/hero/Hero.tsx',
  about: 'src/widgets/about/About.tsx',
  skills: 'src/widgets/skills/Skills.tsx',
  experience: 'src/widgets/experience/Experience.tsx',
  education: 'src/widgets/education/Education.tsx',
  projects: 'src/widgets/projects/Projects.tsx',
  resume: 'src/widgets/resume-section/ResumeSection.tsx',
  contact: 'src/widgets/contact/Contact.tsx',
};

describe('идентификаторы секций', () => {
  it('уникальны', () => {
    const ids = Object.values(SECTION_IDS);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('годятся для якоря в URL', () => {
    for (const id of Object.values(SECTION_IDS)) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });
});

describe('навигация', () => {
  it('ведёт только на существующие секции', () => {
    for (const key of NAV_SECTIONS) {
      expect(Object.keys(SECTION_IDS)).toContain(key);
      expect(sectionHref(key)).toBe(`#${SECTION_IDS[key]}`);
    }
  });

  it('не содержит повторов', () => {
    expect(new Set(NAV_SECTIONS).size).toBe(NAV_SECTIONS.length);
  });
});

/**
 * Раньше id жили строками в вёрстке: переименование секции молча ломало
 * пункт меню. Тест читает исходники виджетов и требует, чтобы каждый
 * действительно брал свой id из общего источника.
 */
describe('виджеты берут id из общего источника', () => {
  it.each(Object.entries(WIDGET_FILES))('%s', (key, file) => {
    const source = readFileSync(file, 'utf8');

    expect(source).toContain(`id={SECTION_IDS.${key}}`);
    expect(source, `в ${file} остался жёстко записанный id`).not.toMatch(
      /<section\s+id="[a-z-]+"/,
    );
  });
});
