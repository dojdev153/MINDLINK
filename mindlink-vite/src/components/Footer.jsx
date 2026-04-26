import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (!wordmarkRef.current) return;
    gsap.fromTo(wordmarkRef.current,
      { x: -20 },
      {
        x: 20, ease: 'none',
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <footer style={{
      position: 'relative', zIndex: 2, width: '100%',
      paddingTop: '96px', paddingBottom: 0, marginBottom: 0,
      background: 'transparent', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {/* Top row */}
      <div className="container" style={{
        padding: '0 24px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '96px',
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(0,200,212,0.1)', border: '1px solid rgba(0,200,212,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: '12px', height: '12px', background: '#00c8d4', borderRadius: '3px' }} />
          </div>
          <span className="font-serif" style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '0.05em', textShadow: '0 0 12px rgba(0,200,212,0.4)' }}>
            MindLink
          </span>
        </a>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
            <a key={s} href="#" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#00c8d4'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
            >{s}</a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <p style={{
        position: 'relative', zIndex: 2,
        color: 'rgba(255,255,255,0.5)', fontSize: '12px',
        letterSpacing: '0.12em', marginBottom: '-2vh',
        pointerEvents: 'none',
      }}>
        © 2026 MINDLINK. ALL RIGHTS RESERVED. KIGALI, RWANDA.
      </p>

      {/* Giant Wordmark */}
      <div style={{
        width: '100%', display: 'flex', justifyContent: 'center',
        overflow: 'hidden', lineHeight: 0.85, paddingBottom: 0, marginBottom: 0,
        userSelect: 'none', pointerEvents: 'none',
      }}>
        <h1
          ref={wordmarkRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(80px, 18vw, 220px)',
            letterSpacing: '-0.04em',
            textAlign: 'center',
            width: '100%',
            margin: 0, padding: 0,
            background: 'linear-gradient(to bottom, #00c8d4 0%, #085041 60%, rgba(4,52,44,0.2) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          MINDLINK
        </h1>
      </div>
    </footer>
  );
}
