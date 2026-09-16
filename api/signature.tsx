import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Shown one at a time, rotating automatically once an hour (server time).
// Edit this list any time — push to GitHub and Vercel redeploys automatically.
const STATUSES = [
  '"I never ignore coincidence. Unless I\'m busy, in which case I always ignore coincidence." — The Doctor',
  'Tuning FRC 4020 swerve code',
  'Streaming the next Tribe Bytes match',
  'Building the next CS lesson',
  'Reviewing student pull requests',
  'Prepping the robot for competition',
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
          background: '#ffffff',
          padding: '18px 22px 18px 18px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            borderLeft: '5px solid #7A1F2B',
            paddingLeft: '16px',
          }}
        >
          <div style={{ fontSize: '19px', fontWeight: 700, color: '#1a1a1a' }}>
            Reid Conner
          </div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#3a3a3a', marginTop: '2px' }}>
            CTE Information Technology
          </div>
          <div style={{ fontSize: '12.5px', color: '#6b6b6b', marginTop: '2px' }}>
            Dobyns-Bennett High School&nbsp;|&nbsp;Kingsport City Schools
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <div
              style={{
                display: 'flex',
                borderLeft: '4px solid #7A1F2B',
                background: '#F2E4E1',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#3a2020',
              }}
            >
              <span style={{ fontWeight: 700 }}>FRC Team 4020</span>
              <span>&nbsp;— Cyber Tribe</span>
            </div>
            <div
              style={{
                display: 'flex',
                borderLeft: '4px solid #262220',
                background: '#ECEAE8',
                padding: '6px 12px',
                fontSize: '12px',
                color: '#2a2a2a',
              }}
            >
              <span style={{ fontWeight: 700 }}>Tribe Bytes</span>
              <span>&nbsp;— Dobyns-Bennett Esports</span>
            </div>
          </div>

          <div style={{ fontSize: '12px', fontStyle: 'italic', color: '#7A1F2B', marginTop: '10px' }}>
            {status}
          </div>
        </div>
      </div>
    ),
    {
      width: 520,
      height: 172,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, must-revalidate',
      },
    }
  );
}
