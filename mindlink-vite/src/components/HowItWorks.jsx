import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Ear, Sparkles, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: '01', title: 'Open & Speak Freely', desc: 'Share your thoughts securely.', icon: <Mic size={24} color="#00c8d4" /> },
  { num: '02', title: 'MindLink Listens', desc: 'AI analyzes vocal and text patterns.', icon: <Ear size={24} color="#00c8d4" /> },
  { num: '03', title: 'Personalised Response', desc: 'Receive immediate CBT/DBT coping strategies.', icon: <Sparkles size={24} color="#00c8d4" /> },
  { num: '04', title: 'Bridge to Care', desc: 'Automated escalation to human professionals.', icon: <HeartHandshake size={24} color="#00c8d4" /> },
];

const positions = [
  { top: '5%', left: '5%', right: 'auto', textAlign: 'left' },
  { top: '25%', left: 'auto', right: '8%', textAlign: 'right' },
  { top: '52%', left: '5%', right: 'auto', textAlign: 'left' },
  { top: '72%', left: 'auto', right: '8%', textAlign: 'right' },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const nodesRef = useRef([]);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;

    const pathLength = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 30%',
        end: 'bottom 80%',
        scrub: 1,
      },
    });

    nodesRef.current.forEach((node) => {
      if (!node) return;
      gsap.fromTo(node,
        { scale: 0, rotation: -15, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          duration: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: node, start: 'top 75%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }, []);

  return (
    <section id="how-it-works" ref={containerRef} style={{ position: 'relative', zIndex: 2, width: '100%', padding: '120px 0', background: 'transparent', overflow: 'hidden' }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'white', marginBottom: '20px' }}>
            The Journey to <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">Clarity</span>
          </h2>
        </div>

        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', minHeight: '700px' }}>
          {/* SVG Road — z-index 1 */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} preserveAspectRatio="none" viewBox="0 0 1000 700">
            <path
              d="M 500 0 C 500 120, 850 180, 850 280 C 850 420, 150 420, 150 540 C 150 640, 500 680, 500 700"
              fill="none" stroke="rgba(0,200,212,0.05)" strokeWidth="20" strokeLinecap="round"
            />
            <path
              ref={pathRef}
              d="M 500 0 C 500 120, 850 180, 850 280 C 850 420, 150 420, 150 540 C 150 640, 500 680, 500 700"
              fill="none" stroke="#00c8d4" strokeWidth="3" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 8px rgba(0,200,212,0.8))' }}
            />
          </svg>

          {/* Step nodes — z-index 2 */}
          {steps.map((step, i) => (
            <div
              key={i}
              ref={el => { nodesRef.current[i] = el; }}
              style={{
                position: 'absolute',
                top: positions[i].top,
                left: positions[i].left,
                right: positions[i].right,
                zIndex: 2,
                display: 'flex',
                flexDirection: positions[i].textAlign === 'right' ? 'row-reverse' : 'row',
                alignItems: 'center',
                gap: '20px',
                maxWidth: '350px',
              }}
            >
              {/* Icon hexagon */}
              <div className="glass-card" style={{
                width: '64px', height: '64px', borderRadius: '16px',
                transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div className="card-sheen" />
                <div style={{ transform: 'rotate(-45deg)', position: 'relative', zIndex: 2 }}>{step.icon}</div>
              </div>
              {/* Text */}
              <div style={{ textAlign: positions[i].textAlign }}>
                <span style={{ color: '#00c8d4', fontWeight: 700, fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  Step {step.num}
                </span>
                <h3 style={{ color: 'white', fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>{step.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginTop: '4px' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
