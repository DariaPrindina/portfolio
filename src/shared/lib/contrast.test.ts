import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';

const css = readFileSync('src/app/styles/tokens.css', 'utf8');

function readTokens(selector: string): Record<string, string> {
  const body = new RegExp(`${selector}\\s*\\{([^}]*)\\}`, 's').exec(css)?.[1] ?? '';
  const tokens: Record<string, string> = {};

  for (const match of body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/g)) {
    tokens[match[1]!] = match[2]!;
  }

  return tokens;
}

const light = readTokens(':root');
const dark = { ...light, ...readTokens('html\\.dark') };

/**
 * Пары «текст на фоне», которые действительно встречаются в вёрстке.
 * Мелкий текст обязан набирать 4.5:1 по WCAG AA; полосам на шкале
 * достаточно 3:1, потому что смысл там несёт не только цвет.
 */
const pairs: Array<[fg: string, bg: string, min: number, label: string]> = [
  ['text', 'bg', 4.5, 'основной текст'],
  ['head', 'bg', 4.5, 'заголовки'],
  ['muted', 'bg', 4.5, 'приглушённый текст'],
  ['dim', 'bg', 4.5, 'мелкие подписи'],
  ['text', 'panel', 4.5, 'текст на панели'],
  ['head', 'panel', 4.5, 'заголовок на панели'],
  ['muted', 'panel', 4.5, 'приглушённый на панели'],
  ['dim', 'panel', 4.5, 'подписи на панели'],
  ['dim', 'panel-2', 4.5, 'подписи в шапке'],
  ['teal', 'bg', 4.5, 'акцент на фоне'],
  ['teal', 'panel', 4.5, 'акцент на панели'],
  ['violet', 'panel', 3, 'фиолетовая полоса'],
  ['amber', 'panel', 4.5, 'тип документа'],
  ['add', 'panel', 4.5, 'знак «плюс»'],
  ['del', 'panel', 4.5, 'знак «минус»'],
];

describe('contrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('returns 1 for identical colors', () => {
    expect(contrastRatio('#7ee2c0', '#7ee2c0')).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio('#0f1117', '#f6f8fb')).toBeCloseTo(
      contrastRatio('#f6f8fb', '#0f1117'),
      5,
    );
  });

  it('expands shorthand hex', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 1);
  });
});

describe.each([
  ['светлая тема', light],
  ['тёмная тема', dark],
])('%s соответствует WCAG AA', (_name, tokens) => {
  it.each(pairs)('%s на %s (минимум %d) — %s', (fg, bg, min) => {
    const foreground = tokens[fg];
    const background = tokens[bg];

    expect(foreground, `токен --${fg} не найден`).toBeDefined();
    expect(background, `токен --${bg} не найден`).toBeDefined();
    expect(contrastRatio(foreground!, background!)).toBeGreaterThanOrEqual(min);
  });
});
