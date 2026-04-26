import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Artificial delay to show off the animation
    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#050d0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease-in-out, visibility 0.8s',
      opacity: isExiting ? 0 : 1,
      visibility: isExiting ? 'hidden' : 'visible'
    }}>
      <div style={{ position: 'relative', width: '200px', height: '200px' }}>
        {/* Neon Glow Background */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          background: 'radial-gradient(circle, rgba(0,200,212,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          animation: 'pulse 2s infinite alternate'
        }} />

        {/* Main Bubble Container */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid rgba(0,200,212,0.3)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 20px rgba(0,200,212,0.2), 0 0 15px rgba(0,200,212,0.1)'
        }}>
          {/* Filling Liquid */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, #00c8d4, #0096a1)',
            transform: 'translateY(100%)',
            animation: 'fillUp 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards',
            boxShadow: '0 0 30px #00c8d4'
          }}>
            {/* Liquid Shine */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
              filter: 'blur(5px)'
            }} />
          </div>
        </div>

        {/* Floating Particles (Dots) */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: i % 2 === 0 ? '8px' : '12px',
            height: i % 2 === 0 ? '8px' : '12px',
            background: '#00c8d4',
            borderRadius: '50%',
            boxShadow: '0 0 10px #00c8d4',
            opacity: 0.6,
            left: `${50 + (Math.cos(i * 45 * Math.PI / 180) * 80)}%`,
            top: `${50 + (Math.sin(i * 45 * Math.PI / 180) * 80)}%`,
            animation: `floatAround ${2 + Math.random() * 2}s infinite ease-in-out alternate`,
            animationDelay: `${Math.random() * 2}s`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes fillUp {
          0% { transform: translateY(100%); }
          100% { transform: translateY(10%); }
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }
        @keyframes floatAround {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(\${Math.random() * 20 - 10}px, \${Math.random() * 20 - 10}px) scale(1.2); }
        }
      `}</style>
    </div>
  );
}
