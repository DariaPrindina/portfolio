'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  /** Своя фаза мерцания, иначе всё поле пульсирует в такт. */
  phase: number;
  speed: number;
};

const DENSITY = 1 / 5200;
const MAX_STARS = 420;
const TWINKLE_FPS = 8;

/**
 * Звёздное поле на canvas.
 *
 * Именно canvas, а не градиенты: в прежней теме «звёзд» было три штуки на
 * radial-gradient, а глубину давали большие размытые пятна — они же съедали
 * контраст текста. Здесь наоборот: много мелких точек и никакой засветки.
 *
 * Поле видно только в тёмной теме — за это отвечает CSS, чтобы не зависеть
 * от готовности темы на клиенте.
 */
export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let stars: Star[] = [];
    let frame = 0;
    let lastDraw = 0;

    const build = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.min(MAX_STARS, Math.round(width * height * DENSITY));
      stars = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        // Мелкие звёзды преобладают: равномерный размер читается как шум.
        radius: 0.35 + Math.random() ** 3 * 1.15,
        alpha: 0.25 + Math.random() * 0.5,
        phase: (index / count) * Math.PI * 2 + Math.random(),
        speed: 0.4 + Math.random() * 0.8,
      }));
    };

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      for (const star of stars) {
        const twinkle = prefersReduced
          ? 1
          : 0.65 + 0.35 * Math.sin(time / 1000 * star.speed + star.phase);

        context.globalAlpha = star.alpha * twinkle;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;
    };

    const tick = (time: number) => {
      // Мерцание не нуждается в 60 кадрах: медленный ритм и дешевле, и живее.
      if (time - lastDraw > 1000 / TWINKLE_FPS) {
        lastDraw = time;
        draw(time);
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      build();
      context.fillStyle = '#ffffff';
      draw(0);

      if (!prefersReduced) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    start();

    const onResize = () => {
      window.cancelAnimationFrame(frame);
      start();
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
