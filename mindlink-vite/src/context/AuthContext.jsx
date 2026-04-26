import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('ml_token');
      if (token) {
        try {
          const userData = await authAPI.me();
          setUser(userData);
        } catch (error) {
          console.error('Session expired', error);
          localStorage.removeItem('ml_token');
          localStorage.removeItem('ml_refresh_token');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = (token, refreshToken, userData) => {
    localStorage.setItem('ml_token', token);
    localStorage.setItem('ml_refresh_token', refreshToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('ml_token');
    localStorage.removeItem('ml_refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
