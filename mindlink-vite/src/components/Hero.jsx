import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}>
      {/* Giant ChromaCare heading */}
      <h1 className="font-serif" style={{
        fontSize: 'clamp(48px, 8vw, 96px)',
        fontWeight: 700,
        color: '#00c8d4',
        textShadow: '0 0 40px rgba(0,200,212,0.4)',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        ChromaCare
      </h1>

      {/* Subtitle */}
      <p style={{
        color: 'rgba(255,255,255,0.6)',
        fontSize: '18px',
        fontWeight: 300,
        textAlign: 'center',
        maxWidth: '520px',
        lineHeight: 1.6,
        marginBottom: '32px',
        padding: '0 20px',
      }}>
        Your private, AI-powered mental health companion.<br />
        Built for Rwandan youth. Engineered for trust.
      </p>

      {/* ONE small CTA button */}
      <a href="#waitlist" style={{
        background: 'white',
        color: '#050d0f',
        borderRadius: '50px',
        padding: '12px 28px',
        fontSize: '15px',
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
        Join the Waitlist →
      </a>

      {/* Small text below button */}
      <p style={{
        color: 'rgba(0,200,212,0.6)',
        fontSize: '13px',
        marginTop: '16px',
      }}>
        Be among the first. Free. No spam.
      </p>

      {/* Scroll indicator + launching text at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(0,200,212,0.5)',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          Scroll to explore
        </span>
        <div className="bounce-arrow" style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(0,200,212,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0,200,212,0.15)',
        }}>
          <ArrowDown size={16} color="#00c8d4" />
        </div>
        <span style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(0,200,212,0.4)',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}>
          Launching 2026 · Kigali, Rwanda
        </span>
      </div>
    </section>
  );
}
