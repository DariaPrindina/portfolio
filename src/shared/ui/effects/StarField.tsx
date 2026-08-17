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
  /** Настоящие звёзды не белые: холодные голубоватые, тёплые желтоватые. */
  color: string;
  /** Крупные светила получают гало — оно и создаёт ощущение глубины. */
  halo: boolean;
};

type Meteor = {
  x: number;
  y: number;
  length: number;
  angle: number;
  speed: number;
  life: number;
};

/** Три плана глубины: чем дальше, тем мельче звёзды и медленнее сдвиг. */
const LAYERS = [
  { density: 1 / 5200, maxRadius: 0.8, alpha: 0.5 },
  { density: 1 / 7000, maxRadius: 1.3, alpha: 0.7 },
  { density: 1 / 11000, maxRadius: 1.9, alpha: 0.95 },
];

const STAR_COLORS = [
  '#ffffff',
  '#ffffff',
  '#dbe7ff',
  '#c9dcff',
  '#ffeccc',
  '#ffd9b0',
];

/** Туманности берут те же акцентные тона, что и интерфейс. */
const NEBULAE = [
  { x: 0.18, y: 0.22, radius: 0.42, color: '126, 226, 192', alpha: 0.05 },
  { x: 0.82, y: 0.3, radius: 0.38, color: '201, 155, 255', alpha: 0.055 },
  { x: 0.62, y: 0.85, radius: 0.45, color: '110, 150, 255', alpha: 0.04 },
];

const MAX_PER_LAYER = 340;
const TWINKLE_FPS = 8;
const METEOR_MIN_GAP_MS = 4200;
const METEOR_CHANCE = 0.22;

/**
 * Звёздный фон.
 *
 * Слои двигаются с разной скоростью, поэтому при прокрутке появляется
 * ощущение глубины, а не сдвиг единой картинки. Сам параллакс делает CSS
 * через transform — он композитится на GPU, так что перерисовывать canvas
 * на каждый кадр прокрутки не нужно.
 *
 * Мерцание идёт по редкому таймеру, метеоры — только пока летят.
 * Всё поле видно лишь в тёмной теме, за это отвечает CSS.
 */
export default function StarField() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvases = Array.from(root.querySelectorAll<HTMLCanvasElement>('.starfield__layer'));
    const meteorCanvas = root.querySelector<HTMLCanvasElement>('.starfield__meteors');
    const nebulaCanvas = root.querySelector<HTMLCanvasElement>('.starfield__nebula');
    const meteorContext = meteorCanvas?.getContext('2d') ?? null;

    let layers: Star[][] = [];
    let meteors: Meteor[] = [];
    let twinkleFrame = 0;
    let meteorFrame = 0;
    let lastTwinkle = 0;
    let lastMeteorAt = 0;
    let scrollFrame = 0;

    const sizeCanvas = (canvas: HTMLCanvasElement) => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      const context = canvas.getContext('2d');
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);

      return { width, height, context };
    };

    const build = () => {
      layers = canvases.map((canvas, index) => {
        const { width, height } = sizeCanvas(canvas);
        const layer = LAYERS[index] ?? LAYERS[0]!;
        const count = Math.min(MAX_PER_LAYER, Math.round(width * height * layer.density));

        return Array.from({ length: count }, (_, star) => {
          const radius = 0.3 + Math.random() ** 3 * layer.maxRadius;

          return {
            x: Math.random() * width,
            y: Math.random() * height,
            // Мелкие преобладают: равномерный размер читается как шум.
            radius,
            alpha: layer.alpha * (0.4 + Math.random() * 0.6),
            phase: (star / Math.max(1, count)) * Math.PI * 2 + Math.random(),
            speed: 0.4 + Math.random() * 0.8,
            color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)] ?? '#ffffff',
            halo: radius > layer.maxRadius * 0.62,
          };
        });
      });

      if (meteorCanvas) {
        sizeCanvas(meteorCanvas);
      }

      drawNebula();
    };

    /** Туманность статична: её незачем перерисовывать каждый кадр. */
    const drawNebula = () => {
      const canvas = nebulaCanvas;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) {
        return;
      }

      const { width, height } = canvas.getBoundingClientRect();
      context.clearRect(0, 0, width, height);

      for (const cloud of NEBULAE) {
        const radius = Math.max(width, height) * cloud.radius;
        const gradient = context.createRadialGradient(
          width * cloud.x,
          height * cloud.y,
          0,
          width * cloud.x,
          height * cloud.y,
          radius,
        );
        gradient.addColorStop(0, `rgba(${cloud.color}, ${cloud.alpha})`);
        gradient.addColorStop(1, `rgba(${cloud.color}, 0)`);

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
      }
    };

    const drawStars = (time: number) => {
      canvases.forEach((canvas, index) => {
        const context = canvas.getContext('2d');
        const stars = layers[index];
        if (!context || !stars) {
          return;
        }

        const { width, height } = canvas.getBoundingClientRect();
        context.clearRect(0, 0, width, height);

        for (const star of stars) {
          const twinkle = prefersReduced
            ? 1
            : 0.6 + 0.4 * Math.sin((time / 1000) * star.speed + star.phase);

          // Гало у крупных звёзд: мягкий ореол вокруг ядра.
          if (star.halo) {
            const glow = context.createRadialGradient(
              star.x,
              star.y,
              0,
              star.x,
              star.y,
              star.radius * 5,
            );
            glow.addColorStop(0, star.color);
            glow.addColorStop(1, 'transparent');
            context.globalAlpha = star.alpha * twinkle * 0.28;
            context.fillStyle = glow;
            context.beginPath();
            context.arc(star.x, star.y, star.radius * 5, 0, Math.PI * 2);
            context.fill();
          }

          context.globalAlpha = star.alpha * twinkle;
          context.fillStyle = star.color;
          context.beginPath();
          context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          context.fill();
        }

        context.globalAlpha = 1;
      });
    };

    const twinkleTick = (time: number) => {
      // Мерцанию не нужны 60 кадров: редкий ритм дешевле и выглядит живее.
      if (time - lastTwinkle > 1000 / TWINKLE_FPS) {
        lastTwinkle = time;
        drawStars(time);
      }
      twinkleFrame = window.requestAnimationFrame(twinkleTick);
    };

    const drawMeteors = () => {
      if (!meteorCanvas || !meteorContext) {
        return;
      }

      const { width, height } = meteorCanvas.getBoundingClientRect();
      meteorContext.clearRect(0, 0, width, height);

      meteors = meteors.filter((meteor) => meteor.life > 0);

      for (const meteor of meteors) {
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;
        meteor.life -= 1;

        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;
        const gradient = meteorContext.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        meteorContext.strokeStyle = gradient;
        meteorContext.lineWidth = 1.6;
        meteorContext.lineCap = 'round';
        meteorContext.beginPath();
        meteorContext.moveTo(meteor.x, meteor.y);
        meteorContext.lineTo(tailX, tailY);
        meteorContext.stroke();
      }

      if (meteors.length > 0) {
        meteorFrame = window.requestAnimationFrame(drawMeteors);
      } else {
        meteorFrame = 0;
        meteorContext.clearRect(0, 0, width, height);
      }
    };

    const spawnMeteor = () => {
      if (!meteorCanvas) {
        return;
      }

      const { width, height } = meteorCanvas.getBoundingClientRect();
      meteors.push({
        x: width * (0.25 + Math.random() * 0.7),
        y: height * Math.random() * 0.45,
        length: 90 + Math.random() * 120,
        angle: Math.PI * (0.72 + Math.random() * 0.1),
        speed: 7 + Math.random() * 5,
        life: 70,
      });

      if (!meteorFrame) {
        meteorFrame = window.requestAnimationFrame(drawMeteors);
      }
    };

    const onScroll = () => {
      if (scrollFrame) {
        return;
      }

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;

        // Метеор изредка срываетcя во время прокрутки: событие, а не фон.
        const now = performance.now();
        if (now - lastMeteorAt > METEOR_MIN_GAP_MS && Math.random() < METEOR_CHANCE) {
          lastMeteorAt = now;
          spawnMeteor();
        }
      });
    };

    const start = () => {
      build();
      drawStars(0);

      if (!prefersReduced) {
        twinkleFrame = window.requestAnimationFrame(twinkleTick);
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    };

    const stop = () => {
      window.cancelAnimationFrame(twinkleFrame);
      window.cancelAnimationFrame(meteorFrame);
      window.cancelAnimationFrame(scrollFrame);
      twinkleFrame = 0;
      meteorFrame = 0;
      scrollFrame = 0;
      meteors = [];
      window.removeEventListener('scroll', onScroll);
    };

    const onResize = () => {
      stop();
      start();
    };

    start();
    window.addEventListener('resize', onResize);

    return () => {
      stop();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={rootRef} className="starfield" aria-hidden="true">
      <canvas className="starfield__nebula" />
      <canvas className="starfield__layer starfield__layer--far" />
      <canvas className="starfield__layer starfield__layer--mid" />
      <canvas className="starfield__layer starfield__layer--near" />
      <canvas className="starfield__meteors" />
    </div>
  );
}
