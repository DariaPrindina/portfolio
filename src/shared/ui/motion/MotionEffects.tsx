'use client';

import { useEffect } from 'react';

/**
 * Прогресс прокрутки в CSS-переменной: его читают слои звёзд для параллакса
 * и полоса прогресса чтения.
 *
 * Появление блоков по мере прокрутки убрано намеренно. Одноразовый fade-up
 * стал визуальным штампом, а главное — держал весь контент в opacity 0 до
 * срабатывания JS, из-за чего страница без скриптов оказывалась пустой.
 */
export default function MotionEffects() {
  useEffect(() => {
    const updateScrollProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    // Чтение scrollHeight вызывает принудительный пересчёт раскладки,
    // поэтому не чаще раза в кадр.
    let frame = 0;
    const onScroll = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateScrollProgress();
      });
    };

    updateScrollProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
