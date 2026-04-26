export default function FinalCTA() {
  return (
    <section id="early-access" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '120px 0', background: 'transparent', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: '800px', height: '256px',
        background: 'rgba(0,200,212,0.08)', borderRadius: '100% 100% 0 0',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div className="container" style={{ padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: 'white', marginBottom: '28px', lineHeight: 1.1 }}>
            Ready to shape the<br />
            <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">future of care?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 300, marginBottom: '48px', lineHeight: 1.6 }}>
            Join our early access program to be among the first to experience the next evolution in digital mental health support.
          </p>
          <a href="#waitlist" style={{
            display: 'inline-block',
            background: 'white',
            color: '#050d0f',
            borderRadius: '50px',
            padding: '14px 36px',
            fontSize: '16px',
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(255,255,255,0.15)',
          }}
          onMouseEnter={e => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 0 30px rgba(255,255,255,0.25)';
          }}
          onMouseLeave={e => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 0 20px rgba(255,255,255,0.15)';
          }}
          >
            Join the Waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
