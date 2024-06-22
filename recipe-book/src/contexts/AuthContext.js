import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:4004/api/auth/login', { username, password });
      setUser({ username });
      setMessage('Login successful');
    } catch (err) {
      setMessage(err.response ? err.response.data : 'Login failed');
    }
  };

  const register = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:4004/api/auth/register', { username, password });
      setMessage('Registration successful');
    } catch (err) {
      setMessage(err.response ? err.response.data : 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    setMessage(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, message, setMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
