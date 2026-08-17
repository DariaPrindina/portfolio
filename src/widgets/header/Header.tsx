'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import VisualLanguageToggle from '@/shared/ui/toggles/VisualLanguageToggle';
import VisualThemeToggle from '@/shared/ui/toggles/VisualThemeToggle';
import { pickActiveSection, type SectionOffset } from '@/shared/lib/scrollSpy';
import { NAV_SECTIONS, sectionHref, type NavSection } from '@/shared/config/sections';

type NavItem = { href: string; label: string };

const LABELS: Record<'ru' | 'en', Record<NavSection, string>> = {
  ru: {
    about: 'Обо мне',
    skills: 'Навыки',
    experience: 'Опыт',
    projects: 'Проекты',
    resume: 'Резюме',
    contact: 'Контакты',
  },
  en: {
    about: 'About',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    resume: 'Resume',
    contact: 'Contact',
  },
};

// Ссылки строятся из общего списка секций, поэтому пункт меню не может
// указывать на якорь, которого нет на странице.
const RU_NAV: NavItem[] = NAV_SECTIONS.map((key) => ({
  href: sectionHref(key),
  label: LABELS.ru[key],
}));

const EN_NAV: NavItem[] = NAV_SECTIONS.map((key) => ({
  href: sectionHref(key),
  label: LABELS.en[key],
}));

export default function Header() {
  const pathname = usePathname();
  const isEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const isHome = pathname === '/' || pathname === '/en';

  const navItems = isEnglish ? EN_NAV : RU_NAV;
  const homeHref = isEnglish ? '/en' : '/';

  const [activeId, setActiveId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Высота шапки живёт в CSS-токене, чтобы значения не разъезжались.
    const headerHeight =
      Number.parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10,
      ) || 64;
    const headerOffset = headerHeight + 24;

    // Смещения секций меняются от ресайза и от лениво подгруженных картинок,
    // поэтому меряем их заново, а не один раз при монтировании.
    const measure = (): SectionOffset[] =>
      navItems
        .map((item) => {
          const node = document.querySelector<HTMLElement>(item.href);
          return node ? { id: item.href, top: node.offsetTop } : null;
        })
        .filter((section): section is SectionOffset => section !== null)
        .sort((a, b) => a.top - b.top);

    let sections = isHome ? measure() : [];

    const update = () => {
      setIsScrolled(window.scrollY > 24);

      if (!isHome) {
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      setActiveId(pickActiveSection(sections, window.scrollY, headerOffset, isAtBottom));
    };

    // Чтение scrollHeight вызывает принудительный пересчёт раскладки, поэтому
    // на каждом событии прокрутки его делать нельзя — только раз в кадр.
    let frame = 0;
    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    const remeasure = () => {
      sections = isHome ? measure() : [];
      update();
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', remeasure);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', remeasure);
    };
  }, [isHome, navItems]);

  return (
    <header className={`site-header ${isScrolled ? 'site-header--scrolled' : ''}`}>
      <div className="container site-header__inner">
        <Link href={homeHref} className="site-header__brand">
          DP
        </Link>

        {isHome ? (
          <nav
            className="site-header__nav"
            aria-label={isEnglish ? 'Section navigation' : 'Навигация по разделам'}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`site-header__link ${
                  activeId === item.href ? 'site-header__link--active' : ''
                }`}
                aria-current={activeId === item.href ? 'location' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <Link href={homeHref} className="site-header__link">
            {isEnglish ? 'Back to home' : 'На главную'}
          </Link>
        )}

        <div className="site-header__controls">
          <VisualLanguageToggle />
          <VisualThemeToggle />
        </div>
      </div>
    </header>
  );
}
