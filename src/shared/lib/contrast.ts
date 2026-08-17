export type Rgb = [number, number, number];

export function parseColor(value: string): Rgb {
  const trimmed = value.trim();

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    const full = hex.length === 3 ? [...hex].map((char) => char + char).join('') : hex;
    return [0, 2, 4].map((i) => Number.parseInt(full.slice(i, i + 2), 16)) as Rgb;
  }

  const parts = trimmed.match(/[\d.]+/g);
  if (!parts || parts.length < 3) {
    throw new Error(`Не удалось разобрать цвет: ${value}`);
  }

  return [Number(parts[0]), Number(parts[1]), Number(parts[2])];
}

export function relativeLuminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  }) as Rgb;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Коэффициент контраста по WCAG 2.1: от 1 (нет разницы) до 21 (чёрное на белом). */
export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(parseColor(foreground));
  const second = relativeLuminance(parseColor(background));
  const [lighter, darker] = first > second ? [first, second] : [second, first];

  return (lighter + 0.05) / (darker + 0.05);
}
