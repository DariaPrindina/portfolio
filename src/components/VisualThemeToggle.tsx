'use client';

import { Stars } from 'lucide-react';
import { useEffect, useState } from 'react';

type VisualTheme = 'cosmic' | 'classic';

const STORAGE_KEY = 'portfolio-visual-theme';

function applyVisualTheme(theme: VisualTheme) {
  const body = document.body;
  body.classList.toggle('theme-cosmic', theme === 'cosmic');
  body.classList.toggle('theme-classic', theme === 'classic');
}

function runThemeSwitchAnimation() {
  const root = document.documentElement;
  root.classList.add('theme-switching');
  window.setTimeout(() => {
    root.classList.remove('theme-switching');
  }, 420);
}

export default function VisualThemeToggle() {
  const isClient = typeof window !== 'undefined';
  const [theme, setTheme] = useState<VisualTheme>(() => {
    if (!isClient) {
      return 'classic';
    }
    return localStorage.getItem(STORAGE_KEY) === 'cosmic' ? 'cosmic' : 'classic';
  });

  useEffect(() => {
    applyVisualTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const handleToggle = () => {
    runThemeSwitchAnimation();
    const nextTheme: VisualTheme = theme === 'cosmic' ? 'classic' : 'cosmic';
    setTheme(nextTheme);
  };

  if (!isClient) {
    return null;
  }

  return (
    <button
      type="button"
      className="visual-theme-toggle"
      onClick={handleToggle}
      aria-label={theme === 'cosmic' ? 'Переключить на классический стиль' : 'Переключить на космический стиль'}
      title={theme === 'cosmic' ? 'Классический стиль' : 'Космический стиль'}
    >
      <Stars size={17} aria-hidden="true" />
      <span className="visual-theme-toggle__label">{theme === 'cosmic' ? 'Cosmic' : 'Classic'}</span>
    </button>
  );
}
