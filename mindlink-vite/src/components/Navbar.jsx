import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'fixed',
      top: '24px',
      left: 0,
      right: 0,
      zIndex: 50,
      display: 'flex',
      justifyContent: 'center',
      padding: '0 16px',
      pointerEvents: 'none',
    }}>
      <div style={{
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '900px',
        borderRadius: '50px',
        padding: isScrolled ? '10px 24px' : '12px 24px',
        background: isScrolled
          ? 'rgba(5, 18, 22, 0.85)'
          : 'rgba(5, 18, 22, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: isScrolled
          ? '1px solid rgba(0, 200, 212, 0.4)'
          : '1px solid rgba(0, 200, 212, 0.2)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 0 20px rgba(0,200,212,0.1)' : 'none',
      }}>
        {/* Logo */}
        <Link to="/" className="font-serif" style={{
          fontSize: '20px',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: '#00c8d4',
          textDecoration: 'none',
          textShadow: '0 0 12px rgba(0,200,212,0.4)',
        }}>
          MindLink
        </Link>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {['Features', 'How it works', 'ASRH', 'Privacy'].map(link => (
            <a key={link} href={`/#${link.toLowerCase().replace(/ /g, '-')}`} style={{
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#00c8d4'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {isAuthenticated ? (
            <>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                {user?.full_name.split(' ')[0]}
              </span>
              <button onClick={logout} style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'transparent';
              }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
              }}>
                Sign In
              </Link>
              <Link to="/signup" style={{
                background: 'rgba(0,200,212,0.15)',
                border: '1px solid rgba(0,200,212,0.4)',
                color: '#00c8d4',
                borderRadius: '50px',
                padding: '8px 20px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(0,200,212,0.25)';
                e.target.style.boxShadow = '0 0 15px rgba(0,200,212,0.3)';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'rgba(0,200,212,0.15)';
                e.target.style.boxShadow = 'none';
              }}
              >
                Get Early Access
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
