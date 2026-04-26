import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter logic
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    const timer = setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
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
      <div style={{ position: 'relative', width: '240px', height: '240px' }}>
        {/* Neon Glow Background */}
        <div style={{
          position: 'absolute',
          inset: '-40px',
          background: 'radial-gradient(circle, rgba(0,200,212,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          animation: 'pulse 2s infinite alternate'
        }} />

        {/* Main Bubble Container */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: '2px solid rgba(0,200,212,0.4)',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 30px rgba(0,200,212,0.3), 0 0 20px rgba(0,200,212,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Filling Liquid */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, #00c8d4, #0096a1)',
            transform: `translateY(${100 - progress}%)`,
            transition: 'transform 0.1s linear',
            boxShadow: '0 0 40px #00c8d4'
          }}>
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

          {/* Percentage Text */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            fontSize: '48px',
            fontWeight: 800,
            color: progress > 50 ? '#050d0f' : '#00c8d4',
            transition: 'color 0.3s ease',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-2px'
          }}>
            {progress}%
          </div>
        </div>

        {/* Floating Particles (Dots) with Depth (Scale/Blur/Z-Index) */}
        {[...Array(12)].map((_, i) => {
          const depth = Math.random(); // 0 to 1
          const size = 6 + (depth * 14);
          const blur = (1 - depth) * 4;
          const zIndex = depth > 0.5 ? 20 : -1;
          
          return (
            <div key={i} style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              background: '#00c8d4',
              borderRadius: '50%',
              boxShadow: `0 0 ${10 + depth * 10}px #00c8d4`,
              opacity: 0.3 + (depth * 0.5),
              filter: `blur(${blur}px)`,
              zIndex: zIndex,
              left: `${50 + (Math.cos(i * 30 * Math.PI / 180) * (90 + depth * 40))}%`,
              top: `${50 + (Math.sin(i * 30 * Math.PI / 180) * (90 + depth * 40))}%`,
              animation: `float3D ${3 + Math.random() * 3}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0.9; }
        }
        @keyframes float3D {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(\${Math.random() * 40 - 20}px, \${Math.random() * 40 - 20}px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
