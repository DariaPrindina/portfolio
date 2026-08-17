import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NAV_SECTIONS, SECTION_IDS } from '@/shared/config/sections';

const pathname = vi.hoisted(() => ({ current: '/' }));

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'dark', setTheme: vi.fn() }),
}));

const { default: Header } = await import('./Header');

describe('Header', () => {
  beforeEach(() => {
    pathname.current = '/';
  });

  it('shows the russian section menu on the russian home page', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Проекты' })).toBeInTheDocument();
    expect(screen.getByLabelText('Навигация по разделам')).toBeInTheDocument();
  });

  it('shows the english menu on the english home page', () => {
    pathname.current = '/en';
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Projects' })).toBeInTheDocument();
    expect(screen.getByLabelText('Section navigation')).toBeInTheDocument();
  });

  /** Пункт меню не должен вести на якорь, которого нет на странице. */
  it('links only to declared section anchors', () => {
    render(<Header />);

    const anchors = Object.values(SECTION_IDS).map((id) => `#${id}`);
    const nav = screen.getByLabelText('Навигация по разделам');
    const links = Array.from(nav.querySelectorAll('a'));

    expect(links).toHaveLength(NAV_SECTIONS.length);
    for (const link of links) {
      expect(anchors).toContain(link.getAttribute('href'));
    }
  });

  it('replaces the section menu with a home link on inner pages', () => {
    pathname.current = '/projects/vibe-x';
    render(<Header />);

    expect(screen.queryByLabelText('Навигация по разделам')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'На главную' })).toHaveAttribute('href', '/');
  });

  it('points the language switch at the same project in the other language', () => {
    pathname.current = '/projects/vibe-x';
    render(<Header />);

    expect(screen.getByLabelText('Switch to English')).toHaveAttribute(
      'href',
      '/en/projects/vibe-x',
    );
  });
});
