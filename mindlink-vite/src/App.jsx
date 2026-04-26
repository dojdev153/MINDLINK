import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Cursor from './components/Cursor';
import GridOverlay from './components/GridOverlay';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import LoadingScreen from './components/LoadingScreen';

export default function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 3600); // Wait for loader animation + fade
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <LoadingScreen />
        <Cursor />
        <GridOverlay />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
