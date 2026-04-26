import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <section style={{ 
      position: 'relative', zIndex: 2, width: '100%', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '120px 24px', background: 'transparent'
    }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ 
            width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #00c8d4',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', boxShadow: '0 0 20px rgba(0,200,212,0.2)'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00c8d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          
          <h2 className="font-serif" style={{ fontSize: '42px', color: 'white', marginBottom: '20px' }}>
            Registration <span style={{ color: '#00c8d4', fontStyle: 'italic' }} className="text-glow">Complete</span>
          </h2>
          
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <div className="card-sheen" />
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: '1.6', marginBottom: '32px', fontWeight: 300 }}>
              Welcome to the inner circle. We've added you to the primary waitlist and will notify you via email as soon as the <span style={{ color: '#00c8d4' }}>ChromaCare mobile product</span> is ready for deployment.
            </p>
            
            <Link to="/" style={{
              display: 'inline-block',
              padding: '14px 32px',
              borderRadius: '50px',
              background: 'transparent',
              border: '1px solid #00c8d4',
              color: '#00c8d4',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(0,200,212,0.1)';
              e.target.style.boxShadow = '0 0 20px rgba(0,200,212,0.2)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent';
              e.target.style.boxShadow = 'none';
            }}
            >
              Back to Command Center
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
