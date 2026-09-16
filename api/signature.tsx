import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Shown one at a time, rotating automatically once an hour (server time).
// Edit this list any time — push to GitHub and Vercel redeploys automatically.
const STATUSES = [
  'Tuning FRC 4020 swerve code',
  'Streaming the next Tribe Bytes match',
  'Building the next CS lesson',
  'Reviewing student pull requests',
  'Prepping the robot for competition',
  'Watching Tribe Bytes climb the TAEL standings',
];

function pickHourly(arr: string[]) {
  const idx = Math.floor(Date.now() / (1000 * 60 * 60)) % arr.length;
  return arr[idx];
}

export default async function handler() {
  const status = pickHourly(STATUSES);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          width: '440px',
          padding: '20px 24px',
          background: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            flexShrink: 0,
            background: '#7A1F2B',
            borderRadius: '999px',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700,
          }}
        >
          R
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
            Reid Conner
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280' }}>
            CTE Computer Science
          </div>
          <div style={{ fontSize: '12px', color: '#7A1F2B', marginTop: '4px' }}>
            {status}
          </div>
        </div>
      </div>
    ),
    {
      width: 440,
      height: 110,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
      },
    }
  );
}
