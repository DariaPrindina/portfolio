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
  const [theme, setTheme] = useState<VisualTheme>(() => {
    if (typeof window === 'undefined') {
      return 'classic';
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'cosmic' || stored === 'classic') {
      return stored;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'cosmic' : 'classic';
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

  return (
    <button
      type="button"
      className="visual-theme-toggle"
      onClick={handleToggle}
      aria-label="Переключить визуальный стиль"
      title="Переключить визуальный стиль"
    >
      <Stars size={17} aria-hidden="true" />
      <span className="visual-theme-toggle__label">Theme</span>
    </button>
  );
}
