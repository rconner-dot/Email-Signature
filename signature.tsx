import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Rotating status lines — mix of tech, robotics, esports, and teaching.
// These rotate roughly every 6 hours based on server time.
const STATUSES = [
  '$ echo Running FRC 4020 swerve tuning',
  '$ ffmpeg: streaming Tribe Bytes match…',
  '$ python lesson_plan.py --compile',
  '$ ldap: shadow groups syncing…',
  '$ ./robot_code --deploy-ready',
  '$ curl api.fenworks.com/teams/tribe-bytes',
];

// If you want live FenWorks data (Tribe Bytes standing/rank from app.fenworks.com),
// uncomment this and fill in your team endpoint. For now, it falls back to STATUSES.
// 
// async function fetchFenWorksStatus() {
//   try {
//     const res = await fetch('https://app.fenworks.com/api/teams/TEAM_ID_HERE', {
//       headers: { 'Authorization': `Bearer ${process.env.FENWORKS_API_KEY}` }
//     });
//     if (!res.ok) return null;
//     const data = await res.json();
//     // Return something like: `$ Tribe Bytes: 7-2 (1st place)`
//     return data?.standing || null;
//   } catch (e) {
//     return null;
//   }
// }

function pickHourly(arr: string[]) {
  const idx = Math.floor(Date.now() / (1000 * 60 * 60)) % arr.length;
  return arr[idx];
}

export default async function handler() {
  // Uncomment once FenWorks is wired in:
  // const liveStatus = await fetchFenWorksStatus();
  // const status = liveStatus || pickHourly(STATUSES);
  
  const status = pickHourly(STATUSES);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '660px',
          padding: '20px 24px',
          background: '#0d1117',
          fontFamily: 'monospace',
          borderRadius: '10px',
          gap: '14px',
        }}
      >
        {/* Header: R badge + name + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              background: '#7A1F2B',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '20px',
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
              Reid Conner
            </div>
            <div style={{ fontSize: '13px', color: '#79c0ff' }}>
              CTE Computer Science
            </div>
            <div style={{ fontSize: '12px', color: '#7ee787', fontFamily: 'monospace' }}>
              {status}
            </div>
          </div>
        </div>

        {/* Team badges: Robotics + Esports */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(122,31,43,0.2)',
              border: '1px solid #7A1F2B',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#f2b8bd',
            }}
          >
            🤖 FRC 4020 · Cyber Tribe
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid #30363d',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#c9d1d9',
            }}
          >
            🎮 Tribe Bytes · TAEL
          </div>
        </div>

        {/* Quote */}
        <div
          style={{
            fontSize: '11px',
            color: '#8b949e',
            fontStyle: 'italic',
            lineHeight: '1.4',
            borderTop: '1px solid #30363d',
            paddingTop: '10px',
          }}
        >
          "I never ignore coincidence. Unless I'm busy, in which case I always ignore
          coincidence." — The Doctor
        </div>
      </div>
    ),
    {
      width: 660,
      height: 220,
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600',
      },
    }
  );
}
