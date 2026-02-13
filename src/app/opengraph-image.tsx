import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Daria Prindina — Frontend Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

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
          background:
            'radial-gradient(circle at 80% 10%, rgba(104,183,255,0.35), transparent 40%), linear-gradient(135deg, #0b1328 0%, #152a52 55%, #1b3e73 100%)',
          color: '#d9e9ff',
          padding: 56,
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, opacity: 0.8 }}>Frontend Portfolio</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            Daria Prindina
          </div>
          <div style={{ display: 'flex', fontSize: 36, opacity: 0.95 }}>
            React • TypeScript • Next.js
          </div>
          <div style={{ display: 'flex', fontSize: 30, opacity: 0.8 }}>
            CRM migration from JavaScript to React
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 24, opacity: 0.7 }}>dariaprindina.ru</div>
      </div>
    ),
    {
      ...size,
    },
  );
}
