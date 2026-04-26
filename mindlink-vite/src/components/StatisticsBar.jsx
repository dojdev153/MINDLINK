import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StatisticsBar() {
  const stats = [
    { target: 3.64, suffix: 'M', label: 'youth with no mental health access', decimals: 2 },
    { target: 20.5, suffix: '%', label: 'of Rwandans with mental health conditions', decimals: 1 },
    { target: 24, suffix: '%', label: 'youth HIV share', decimals: 0 },
    { target: 8, suffix: '%', label: 'teenage pregnancy rate', decimals: 0 },
  ];

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const numbersRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Fade-up stagger
    gsap.fromTo(cardsRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );

    // Count-up
    numbersRef.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stats[i].target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        onUpdate: () => { el.textContent = obj.val.toFixed(stats[i].decimals); },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ position: 'relative', zIndex: 2, width: '100%', padding: '80px 0', background: 'transparent' }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="glass-card"
              style={{ padding: '32px', textAlign: 'center', opacity: 0 }}
            >
              <div className="card-sheen" />
              <div className="card-flare-left" />
              <div className="card-flare-right" />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="font-serif" style={{ fontSize: '48px', color: '#00c8d4', textShadow: '0 0 12px rgba(0,200,212,0.4)', marginBottom: '12px', display: 'flex', alignItems: 'baseline', justifyContent: 'center' }}>
                  <span ref={el => { numbersRef.current[i] = el; }}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5 }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
