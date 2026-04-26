import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const data = await authAPI.login({ email, password });
      login(data.token, data.refreshToken, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ 
      position: 'relative', zIndex: 2, width: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px', background: 'transparent'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="font-serif" style={{ fontSize: '36px', color: 'white', marginBottom: '16px' }}>
            Welcome <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">Back</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300, fontSize: '16px' }}>
            Sign in to continue your journey.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '40px' }}>
          <div className="card-sheen" />
          <div className="card-flare-left" />
          <div className="card-flare-right" />
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2 }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@example.com" 
                className="glass-input" 
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="glass-input" 
                style={{ width: '100%', padding: '12px 16px', fontSize: '14px' }} 
              />
            </div>

            {error && (
              <p style={{ color: '#ff4b4b', fontSize: '13px', marginTop: '-4px' }}>{error}</p>
            )}

            <button type="submit" disabled={loading} style={{
              width: '100%',
              marginTop: '16px',
              padding: '14px',
              borderRadius: '50px',
              background: 'transparent',
              border: '1px solid #00c8d4',
              color: '#00c8d4',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => {
              if (loading) return;
              e.target.style.background = 'rgba(0,200,212,0.1)';
              e.target.style.boxShadow = '0 0 20px rgba(0,200,212,0.2)';
            }}
            onMouseLeave={e => {
              if (loading) return;
              e.target.style.background = 'transparent';
              e.target.style.boxShadow = 'none';
            }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <p style={{ textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#00c8d4', textDecoration: 'none', fontWeight: 500 }}>Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
