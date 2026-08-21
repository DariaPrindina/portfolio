import { about } from '@/entities/about/model/about';
import { NAV_SECTIONS, sectionHref } from '@/shared/config/sections';
import { certificates, education } from '@/entities/education/model/education';
import { experience } from '@/entities/experience/model/experience';
import { profile } from '@/entities/profile/model/profile';
import { projectCategoryLabels, projects } from '@/entities/project/model/projects';
import { skillGroups } from '@/entities/skill/model/skills';
import {
  enAbout,
  enAboutMigration,
  enCertificates,
  enEducation,
  enExperience,
  enProfile,
  enProjects,
  enSkillGroups,
} from '@/entities/locale/model/en';

export type Locale = 'ru' | 'en';

/**
 * Единственный источник контента для обеих версий сайта.
 * Раньше английская главная была отдельной копией разметки на 298 строк —
 * теперь обе страницы собирают одни и те же виджеты, отличается только словарь.
 */
export const content = {
  ru: {
    basePath: '',
    profile,
    hero: {
      facts: [
        { label: 'Опыт', value: '1 год 11 мес', note: 'коммерческой разработки' },
        { label: 'Сейчас', value: 'CRM', note: 'Arbat Beauty, с мая 2025' },
        { label: 'Основной стек', value: 'React / TS', note: 'Next.js, TanStack Query' },
      ],
      actions: { projects: 'Проекты', experience: 'Опыт', resume: 'Резюме', contact: 'Связаться' },
      socialAria: 'Социальные ссылки',
    },
    about: {
      label: 'обо мне',
      title: 'Чем я занимаюсь',
      migration: about.migration,
      points: about.points,
      before: 'Было: ',
      after: 'Стало: ',
    },
    skills: { label: 'навыки', title: 'Стек', groups: skillGroups },
    experience: {
      label: 'опыт',
      title: 'Где работала',
      items: experience,
      now: 'сейчас',
    },
    education: {
      label: 'образование',
      title: 'Учёба и документы',
      items: education,
      certificates,
      view: 'Смотреть',
    },
    projects: {
      label: 'проекты',
      title: 'Что я построила',
      items: projects,
      filterAll: 'Все',
      filterAria: 'Фильтр проектов',
      categories: projectCategoryLabels,
      grid: { currentProject: 'текущий', details: 'Подробнее', demo: 'Открыть сайт', code: 'Код' },
    },
    resume: {
      label: 'резюме',
      title: 'Документы',
      pdfTitle: 'Резюме — Дарья Приндина',
      docTitle: 'Резюме в формате Word',
      open: 'открыть',
      download: 'скачать',
      page: 'Смотреть на странице',
      pageHref: '/resume',
    },
    contact: {
      label: 'контакты',
      title: 'Открыта к предложениям',
      text: 'Быстрее всего отвечаю в Telegram и по почте.',
    },
    footer: {
      nav: NAV_SECTIONS.map((key) => ({
        href: sectionHref(key),
        label: { about: 'обо мне', skills: 'навыки', experience: 'опыт', projects: 'проекты', resume: 'резюме', contact: 'контакты' }[key],
      })),
      ariaLabel: 'Навигация по странице',
      otherLocale: { href: '/en', label: 'EN' },
    },
  },
  en: {
    basePath: '/en',
    profile: enProfile,
    hero: {
      facts: [
        { label: 'Experience', value: '1 yr 11 mo', note: 'of commercial development' },
        { label: 'Now', value: 'CRM', note: 'Arbat Beauty, since May 2025' },
        { label: 'Core stack', value: 'React / TS', note: 'Next.js, TanStack Query' },
      ],
      actions: { projects: 'Projects', experience: 'Experience', resume: 'Resume', contact: 'Contact' },
      socialAria: 'Social links',
    },
    about: {
      label: 'about',
      title: 'What I do',
      migration: enAboutMigration,
      points: enAbout.points,
      before: 'Before: ',
      after: 'Now: ',
    },
    skills: { label: 'skills', title: 'Stack', groups: enSkillGroups },
    experience: {
      label: 'experience',
      title: 'Where I worked',
      items: enExperience,
      now: 'now',
    },
    education: {
      label: 'education',
      title: 'Studies and documents',
      items: enEducation,
      certificates: enCertificates,
      view: 'Open',
    },
    projects: {
      label: 'projects',
      title: 'What I built',
      items: enProjects,
      filterAll: 'All',
      filterAria: 'Project filter',
      categories: { commercial: 'commercial', pet: 'side projects', team: 'team and study' },
      grid: { currentProject: 'current', details: 'Case study', demo: 'Open site', code: 'Code' },
    },
    resume: {
      label: 'resume',
      title: 'Documents',
      pdfTitle: 'CV — Daria Prindina',
      docTitle: 'CV in Word format',
      open: 'open',
      download: 'download',
      page: 'Open full page',
      pageHref: '/en/resume',
    },
    contact: {
      label: 'contact',
      title: 'Open to opportunities',
      text: 'The fastest way to reach me is Telegram or email.',
    },
    footer: {
      nav: NAV_SECTIONS.map((key) => ({
        href: sectionHref(key),
        label: { about: 'about', skills: 'skills', experience: 'experience', projects: 'projects', resume: 'resume', contact: 'contact' }[key],
      })),
      ariaLabel: 'Page navigation',
      otherLocale: { href: '/', label: 'RU' },
    },
  },
} as const;

export function getContent(locale: Locale) {
  return content[locale];
}
