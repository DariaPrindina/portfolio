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
          justifyContent: 'space-between',
          alignItems: 'stretch',
          background:
            'radial-gradient(circle at 82% 12%, rgba(154,190,255,0.34), transparent 37%), radial-gradient(circle at 15% 86%, rgba(55,224,255,0.2), transparent 46%), linear-gradient(138deg, #050811 0%, #0c1430 45%, #111f4b 100%)',
          color: '#ebf3ff',
          padding: '44px 48px',
          fontFamily: 'Inter, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 52,
            left: 536,
            width: 270,
            height: 270,
            borderRadius: '50%',
            border: '1px solid rgba(165,196,255,0.2)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 36,
            left: 522,
            width: 298,
            height: 298,
            borderRadius: '50%',
            border: '1px dashed rgba(125,169,255,0.22)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 165,
            left: 735,
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: '#8be2ff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 82,
            left: 624,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#ffc48b',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 248,
            left: 578,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#b49dff',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 72,
            left: 1010,
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: '#d8e6ff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 112,
            left: 1082,
            width: 2,
            height: 2,
            borderRadius: '50%',
            background: '#c7ddff',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 188,
            left: 1048,
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: '#e8f3ff',
          }}
        />

        <div
          style={{
            width: 500,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 0.98,
              letterSpacing: '-1.2px',
            }}
          >
            Daria Prindina
          </div>
          <div style={{ display: 'flex', fontSize: 33, color: '#d1e2ff' }}>React • TypeScript • Next.js</div>
          <div style={{ display: 'flex', fontSize: 26, color: '#9eb9e5' }}>Product-grade UI engineering</div>
        </div>

        <div
          style={{
            width: 595,
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            borderRadius: 24,
            border: '1px solid rgba(170, 199, 255, 0.35)',
            background:
              'linear-gradient(165deg, rgba(14, 30, 68, 0.82) 0%, rgba(10, 22, 52, 0.82) 100%)',
            boxShadow:
              '0 26px 56px rgba(4, 8, 24, 0.62), inset 0 1px 0 rgba(198, 218, 255, 0.18), inset 0 0 56px rgba(95, 170, 255, 0.12)',
            overflow: 'hidden',
            marginRight: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              height: 48,
              display: 'flex',
              alignItems: 'center',
              padding: '0 18px',
              background: 'rgba(19, 39, 83, 0.92)',
              borderBottom: '1px solid rgba(172, 199, 255, 0.22)',
            }}
          >
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff7a7a' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffd07d' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#77e6a6' }} />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '20px 20px 22px',
              color: '#c8e8ff',
              fontSize: 22,
              whiteSpace: 'pre',
              fontFamily: 'JetBrains Mono, Menlo, monospace',
            }}
          >
            <div>{"const stack = ['React', 'TypeScript'];"}</div>
            <div>{"const framework = 'Next.js';"}</div>
            <div>{"const state = 'Zustand + React Query';"}</div>
            <div>{"const ui = 'Framer Motion + CSS';"}</div>
            <div>{"const quality = 'Strict checks';"}</div>
            <div>{"const result = 'Production-ready';"}</div>
            <div style={{ color: '#7ee8ff' }}>{'export default Portfolio;'}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
