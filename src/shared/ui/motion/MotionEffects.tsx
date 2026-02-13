'use client';

import { useEffect } from 'react';


export default function MotionEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const avatarNode = document.querySelector<HTMLElement>('.hero__avatar-wrap');
    const cleanupFns: Array<() => void> = [];

    if (!prefersReduced) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
      );

      revealNodes.forEach((node) => observer.observe(node));
      cleanupFns.push(() => observer.disconnect());
    } else {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
    }


    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollTop / maxScroll));
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));

      if (!prefersReduced && avatarNode) {
        const offset = Math.min(24, scrollTop * 0.045);
        avatarNode.style.setProperty('--avatar-offset', `${offset.toFixed(2)}px`);
      }
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    cleanupFns.push(() => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    });


    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
