import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { waitlistAPI } from '../services/api';

export default function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    age_group: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    waitlistAPI.count()
      .then(res => setWaitlistCount(res.count))
      .catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await waitlistAPI.join(formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="waitlist" style={{ position: 'relative', zIndex: 2, width: '100%', padding: '120px 0', background: 'transparent' }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'white', marginBottom: '20px' }}>
            Be Part of Something <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">Bigger</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            MindLink is launching soon. Register now and get priority access when we go live.
          </p>
          {waitlistCount > 0 && (
            <p style={{ color: '#00c8d4', fontSize: '14px', fontWeight: 500, marginTop: '16px' }}>
              Join {waitlistCount} others already waiting
            </p>
          )}
        </div>

        <div style={{ maxWidth: '440px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="glass-card"
                style={{ padding: '40px' }}
              >
                <div className="card-sheen" />
                <div className="card-flare-left" />
                <div className="card-flare-right" />
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Full Name</label>
                    <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} placeholder="Jane Doe" className="glass-input" style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Email Address</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="jane@example.com" className="glass-input" style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Age Group</label>
                      <select name="age_group" required value={formData.age_group} onChange={handleChange} className="glass-input" style={{ width: '100%', padding: '12px 16px', fontSize: '14px', background: 'rgba(255,255,255,0.06)' }}>
                        <option value="" disabled>Select</option>
                        <option value="15-18">15–18</option>
                        <option value="19-24">19–24</option>
                        <option value="25-30">25–30</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Location</label>
                      <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="Kigali" className="glass-input" style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }} />
                    </div>
                  </div>
                  
                  {error && <p style={{ color: '#ff4b4b', fontSize: '13px', textAlign: 'center', marginTop: '4px', marginBottom: '-8px' }}>{error}</p>}
                  
                  <button type="submit" disabled={loading} style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '16px',
                    borderRadius: '14px',
                    border: 'none',
                    background: '#00c8d4',
                    color: '#050d0f',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 20px rgba(0,200,212,0.3)',
                    opacity: loading ? 0.7 : 1
                  }}
                  onMouseEnter={e => {
                    if (loading) return;
                    e.target.style.boxShadow = '0 0 35px rgba(0,200,212,0.5)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    if (loading) return;
                    e.target.style.boxShadow = '0 0 20px rgba(0,200,212,0.3)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  >
                    {loading ? 'Joining...' : 'Secure My Spot'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>
                    🔒 Your data is private. We will never share it.
                  </p>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="glass-card"
                style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '400px', justifyContent: 'center' }}
              >
                <div className="card-sheen" />
                <div className="card-flare-left" />
                <div className="card-flare-right" />
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'rgba(0,200,212,0.1)', border: '1px solid rgba(0,200,212,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px',
                    boxShadow: '0 0 24px rgba(0,200,212,0.2)',
                  }}>
                    <CheckCircle2 size={40} color="#00c8d4" />
                  </div>
                  <h3 style={{ fontSize: '24px', color: 'white', fontWeight: 700, marginBottom: '12px' }}>You're on the list!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)' }}>Thank you for registering. Check your email for a confirmation message.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
