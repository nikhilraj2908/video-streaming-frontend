// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1900/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const decodeAndSetUser = (jwt: string) => {
    try {
      const decoded: any = jwtDecode(jwt);
      setUser({
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Failed to decode token", err);
      setUser(null);
    }
  };

  
useEffect(() => {
  const storedToken = localStorage.getItem('auth_token');
  if (storedToken) {
    setToken(storedToken);
    decodeAndSetUser(storedToken);
    setIsAuthenticated(true);
    
  }
  // ✅ Move this after decoding completes (still safe to keep outside)
  setIsLoading(false);
}, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${API}/auth/login`, { email, password });
      const jwt = res.data.token;
      localStorage.setItem('auth_token', jwt);
      setToken(jwt);
      decodeAndSetUser(jwt);
      setIsAuthenticated(true);
    window.location.replace('/');
      
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      await axios.post(`${API}/auth/register`, { email, name: username, password });
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();

  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
