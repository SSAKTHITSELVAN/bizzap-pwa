//src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const response = await apiCall('companies/profile', 'GET', null, true);
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (phoneNumber, otp) => {
    try {
      const response = await apiCall('auth/verify-otp', 'POST', { phoneNumber, otp }, false);
      
      if (response.data.isNewUser) {
        return { isNewUser: true, phoneNumber, otp };
      } else {
        const newToken = response.data.token;
        setToken(newToken);
        setUser(response.data.company);
        localStorage.setItem('authToken', newToken);
        return { isNewUser: false, user: response.data.company };
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (registrationData) => {
    try {
      const response = await apiCall('auth/register', 'POST', registrationData, false);
      const newToken = response.data.token;
      setToken(newToken);
      setUser(response.data.company);
      localStorage.setItem('authToken', newToken);
      return response.data.company;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const sendOtp = async (phoneNumber) => {
    try {
      await apiCall('auth/send-otp', 'POST', { phoneNumber }, false);
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    sendOtp
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};