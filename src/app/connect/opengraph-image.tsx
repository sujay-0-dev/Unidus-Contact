import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Route segment config
export const alt = 'UNIDUS Integrated Solutions & Services';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/jpeg';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
          color: 'white',
          padding: '60px',
          fontFamily: 'sans-serif',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            gap: '20px'
          }}
        >
          {/* Simulated logo icon since we can't reliably load external assets in edge OG without fetch */}
          <div style={{ display: 'flex', backgroundColor: '#2dbfbb', padding: '15px', borderRadius: '15px' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: 0, letterSpacing: '2px', color: '#ffffff' }}>UNIDUS</h1>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#2dbfbb', textAlign: 'center' }}>
          Integrated Solutions & Services
        </h2>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '40px',
          maxWidth: '900px'
        }}>
          {['Software', 'Automation', 'Security', 'AI', 'Building Management', 'Networking', 'Cloud'].map((tag) => (
            <div key={tag} style={{
              padding: '12px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              border: '2px solid rgba(45, 191, 187, 0.5)',
              fontSize: '24px',
              color: '#cbd5e1'
            }}>
              {tag}
            </div>
          ))}
        </div>

        <div style={{
          position: 'absolute',
          bottom: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          fontSize: '28px',
          color: '#2dbfbb'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          <span>www.unidus.co.in</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
