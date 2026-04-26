import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator({ background, hero }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || !canvasRef.current) return;

    gsap.to(canvasRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={heroRef} style={{ position: 'relative', width: '100%', height: '100vh', background: 'transparent' }}>
      {/* 3D Canvas — fixed, fades out on scroll */}
      <div ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        {background}
      </div>
      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {hero}
      </div>
    </div>
  );
}
