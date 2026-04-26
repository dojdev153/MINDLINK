const getBaseURL = () => {
  // Check for environment variable first (standard for production/Vercel)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback for local development
  return 'http://localhost:5000/api';
};

const BASE = getBaseURL();

const getHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('ml_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Interceptor logic could go here for fetch, but we'll keep it simple
const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

export const authAPI = {
  signup: (data) => fetch(`${BASE}/auth/signup`, {
    method: 'POST', headers: getHeaders(), body: JSON.stringify(data)
  }).then(handleResponse),

  login: (data) => fetch(`${BASE}/auth/login`, {
    method: 'POST', headers: getHeaders(), body: JSON.stringify(data)
  }).then(handleResponse),

  me: () => fetch(`${BASE}/auth/me`, { 
    headers: getHeaders() 
  }).then(handleResponse),
};

export const waitlistAPI = {
  join: (data) => fetch(`${BASE}/waitlist/join`, {
    method: 'POST', headers: getHeaders(), body: JSON.stringify(data)
  }).then(handleResponse),

  count: () => fetch(`${BASE}/waitlist/count`).then(handleResponse),
};
