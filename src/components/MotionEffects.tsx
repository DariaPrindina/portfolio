'use client';

import { useEffect } from 'react';

const TILT_MAX_DEG = 5;

export default function MotionEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const tiltNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
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

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--mx', `${event.clientX}px`);
      document.documentElement.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    cleanupFns.push(() => window.removeEventListener('pointermove', onPointerMove));

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

    if (!prefersReduced) {
      tiltNodes.forEach((node) => {
        const onMove = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          const rx = (0.5 - py) * TILT_MAX_DEG;
          const ry = (px - 0.5) * TILT_MAX_DEG;
          node.style.setProperty('--tilt-rx', `${rx.toFixed(2)}deg`);
          node.style.setProperty('--tilt-ry', `${ry.toFixed(2)}deg`);
        };

        const onLeave = () => {
          node.style.setProperty('--tilt-rx', '0deg');
          node.style.setProperty('--tilt-ry', '0deg');
        };

        node.addEventListener('pointermove', onMove);
        node.addEventListener('pointerleave', onLeave);
        cleanupFns.push(() => {
          node.removeEventListener('pointermove', onMove);
          node.removeEventListener('pointerleave', onLeave);
        });
      });
    }

    return () => {
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
