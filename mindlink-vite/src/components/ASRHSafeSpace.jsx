import { Lock, Ban, WifiOff, Accessibility } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ASRHSafeSpace() {
  const badges = [
    { icon: <Lock size={20} color="#00c8d4" />, text: 'Zero-knowledge encryption' },
    { icon: <Ban size={20} color="#00c8d4" />, text: 'No ads. Ever.' },
    { icon: <WifiOff size={20} color="#00c8d4" />, text: 'Offline functionality' },
    { icon: <Accessibility size={20} color="#00c8d4" />, text: 'Built barrier-free' },
  ];

  const text = 'A private haven for young minds.';
  const chars = text.split('');

  const containerV = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
  };
  const charV = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="asrh" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '120px 0', background: 'transparent', overflow: 'hidden' }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '64px' }}>

          {/* Left: Text */}
          <div style={{ flex: '1 1 400px' }}>
            <div style={{
              display: 'inline-block', padding: '6px 16px', borderRadius: '50px',
              background: 'rgba(0,200,212,0.08)', border: '1px solid rgba(0,200,212,0.3)',
              color: '#00c8d4', fontSize: '12px', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px',
            }}>
              ASRH Safe Space
            </div>

            <motion.h2
              variants={containerV}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="font-serif"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'white', marginBottom: '24px', lineHeight: 1.2 }}
            >
              {chars.map((c, i) => (
                <motion.span
                  key={i}
                  variants={charV}
                  style={i >= 20 ? { color: '#00c8d4', fontStyle: 'italic', textShadow: '0 0 12px rgba(0,200,212,0.4)' } : {}}
                >
                  {c}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, fontSize: '18px', lineHeight: 1.7 }}
            >
              Adolescent Sexual and Reproductive Health (ASRH) requires the utmost discretion. MindLink is engineered with a privacy-first architecture, ensuring that vulnerable youth can access vital information and support without fear of exposure.
            </motion.p>
          </div>

          {/* Right: Glass Panel */}
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,200,212,0.08)', filter: 'blur(80px)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div className="glass-card" style={{ position: 'relative', zIndex: 2, padding: '40px' }}>
              <div className="card-sheen" />
              <div className="card-flare-left" />
              <div className="card-flare-right" />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{ color: 'white', fontSize: '22px', fontWeight: 500, marginBottom: '28px' }}>Privacy Guarantees</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {badges.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 + 0.5, duration: 0.5, ease: 'easeOut' }}
                      viewport={{ once: true, margin: '-50px' }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        padding: '16px', borderRadius: '16px',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: 'rgba(0,200,212,0.1)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {b.icon}
                      </div>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500, fontSize: '15px' }}>{b.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
