'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

/**
 * Какую иконку показать, решает CSS по классу темы на <html>.
 * Флаг «смонтировано» в состоянии не нужен: разметка одинакова на сервере
 * и на клиенте, поэтому гидратация не расходится.
 */
export default function VisualThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      className="visual-theme-toggle"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Переключить тему"
      title="Переключить тему"
    >
      <Moon size={15} aria-hidden="true" className="theme-icon theme-icon--light" />
      <Sun size={15} aria-hidden="true" className="theme-icon theme-icon--dark" />
      <span className="visual-theme-toggle__label" aria-hidden="true">
        <span className="theme-icon--light">dark</span>
        <span className="theme-icon--dark">light</span>
      </span>
    </button>
  );
}
