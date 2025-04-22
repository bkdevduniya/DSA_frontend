import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from './api/axios';
import './login.css';

export default function Login() {
  
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('auth/login', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = res.data;
      if (result.msg === 'invalid credentials') {
        setMessage('Invalid email or password');
        setMessageType('error');
      } else if (result.msg === 'login success') {
        setMessage('Login successful! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (err) {
      console.error('Login error:', err);
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue your coding journey</p>
        </div>

        {message && (
          <div className={`login-message login-${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-submit-btn">
            Log In
          </button>
        </form>

        <div className="login-footer">
          Don't have an account? <Link to="/signup" className="login-signup-link">Sign up</Link>
        </div>
      </div>
    </div>
  );
}