import { motion } from 'framer-motion';
import { Mic, Languages, BrainCircuit, Activity, ShieldCheck, Share2 } from 'lucide-react';

const features = [
  {
    icon: <Mic size={24} color="#00c8d4" />,
    title: 'Voice & Tone Analysis',
    shortDesc: 'Detects subtle acoustic changes indicative of stress, anxiety, or depressive episodes.',
    detailDesc: 'Detects elevated stress biomarkers in voice with 87% accuracy across African language phonemes',
  },
  {
    icon: <Languages size={24} color="#00c8d4" />,
    title: 'Kinyarwanda-First',
    shortDesc: 'Fluent in local nuance, slang, and cultural context — built ground-up.',
    detailDesc: 'The only mental health AI trained natively on Kinyarwanda — not translated from English',
  },
  {
    icon: <BrainCircuit size={24} color="#00c8d4" />,
    title: 'CBT & DBT Frameworks',
    shortDesc: 'Guides users through scientifically validated cognitive behavioral therapy in real-time.',
    detailDesc: '14 evidence-based exercises, reviewed by licensed Rwandan clinical psychologists',
  },
  {
    icon: <Activity size={24} color="#00c8d4" />,
    title: 'Wearable Integration',
    shortDesc: 'Syncs with smartwatches to correlate heart-rate variability and sleep patterns.',
    detailDesc: 'Connects to Fitbit, Apple Watch, and affordable Android fitness bands common in East Africa',
  },
  {
    icon: <ShieldCheck size={24} color="#00c8d4" />,
    title: 'Zero-Knowledge Privacy',
    shortDesc: 'Your data is encrypted locally. We cannot read your sessions.',
    detailDesc: 'Your encryption keys never leave your device. Not even MindLink can read your sessions.',
  },
  {
    icon: <Share2 size={24} color="#00c8d4" />,
    title: 'Automated Referrals',
    shortDesc: 'If critical thresholds are met, MindLink bridges the gap to human professionals.',
    detailDesc: 'Direct integration with Caraes Ndera Hospital and 12 partner mental health clinics in Kigali',
  },
];

function FeatureCard({ icon, title, shortDesc, detailDesc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="flip-wrapper"
    >
      <div className="flip-inner">
        {/* Front */}
        <div className="glass-card flip-front" style={{ padding: '32px' }}>
          <div className="card-sheen" />
          <div className="card-flare-left" />
          <div className="card-flare-right" />
          <div className="card-content" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              background: 'rgba(0,200,212,0.1)', border: '1px solid rgba(0,200,212,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
            }}>
              {icon}
            </div>
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: 600, marginBottom: '10px' }}>
              {title}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6 }}>
              {shortDesc}
            </p>
          </div>
        </div>
        {/* Back */}
        <div className="glass-card flip-back">
          <div className="card-sheen" />
          <div className="card-flare-left" />
          <div className="card-flare-right" />
          <div className="card-content back-content" style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ color: '#00c8d4', fontWeight: 500, fontSize: '16px', lineHeight: 1.7 }}>
              {detailDesc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  return (
    <section id="features" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '120px 0', background: 'transparent' }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: 'white', marginBottom: '20px' }}>
            Beyond a <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">chatbot</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 300, lineHeight: 1.6 }}>
            MindLink leverages multimodal AI to understand what you're saying, how you're saying it, and the physiological context behind it.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {features.map((f, i) => (
            <FeatureCard key={i} index={i} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
