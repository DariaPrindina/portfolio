import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Daria Prindina — Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Источник превью для соцсетей.
 *
 * В метаданных указан статический файл `/images/og-preview-static.png` —
 * так превью не зависит от доступности рендера в момент, когда его
 * запрашивает краулер. Этот маршрут остаётся генератором: после правки
 * дизайна забери из него картинку и положи поверх статического файла
 * (команда — в README).
 *
 * Текст только латиницей: satori рисует кириллицу лишь со встроенным
 * шрифтом, а `next/font` отдаёт woff2, который satori не поддерживает.
 */

const TOKENS = {
  bg: '#0f1117',
  panel: '#161a23',
  line: '#262d3b',
  head: '#f2f5fa',
  muted: '#97a2b3',
  dim: '#6e7a8c',
  teal: '#7ee2c0',
  violet: '#c99bff',
};

const facts = [
  { label: 'EXPERIENCE', value: '1 yr 11 mo' },
  { label: 'NOW', value: 'Beauty CRM' },
  { label: 'CORE STACK', value: 'React / TS' },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: TOKENS.bg,
          color: TOKENS.head,
          padding: '56px 64px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              color: TOKENS.teal,
              fontFamily: 'Menlo, monospace',
              marginBottom: 18,
            }}
          >
            const role = &apos;Frontend Developer&apos;
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Daria Prindina
          </div>

          <div style={{ display: 'flex', fontSize: 30, color: TOKENS.muted, maxWidth: 780 }}>
            Migrating legacy interfaces to modern React and shipping modules end to end.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {facts.map((fact) => (
            <div
              key={fact.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: TOKENS.panel,
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 10,
                padding: '20px 24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 18,
                  letterSpacing: '0.09em',
                  color: TOKENS.dim,
                  fontFamily: 'Menlo, monospace',
                  marginBottom: 8,
                }}
              >
                {fact.label}
              </div>
              <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>{fact.value}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            fontFamily: 'Menlo, monospace',
            color: TOKENS.dim,
            borderTop: `1px solid ${TOKENS.line}`,
            paddingTop: 22,
          }}
        >
          <div style={{ display: 'flex' }}>dariaprindina.ru</div>
          <div style={{ display: 'flex', color: TOKENS.violet }}>React 19 · TypeScript · Next.js</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
