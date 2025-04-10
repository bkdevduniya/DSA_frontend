import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from './api/axios';
import './signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    level: 'beginner',
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
      const res = await axios.post('auth/signup', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      const result = res.data;
      if (result.msg === 'user already exist with this email') {
        setMessage(result.msg);
        setMessageType('error');
      } else if (result.msg === 'user created') {
        setMessage('Account created successfully! Redirecting...');
        setMessageType('success');
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Your Account</h2>
        </div>

        {message && (
          <div className={`signup-message signup-${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-form-group">
            <label htmlFor="signup-username">Full Name</label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="Enter your name"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="signup-form-group">
            <label htmlFor="signup-level">Skill Level</label>
            <select
              id="signup-level"
              name="level"
              required
              value={formData.level}
              onChange={handleChange}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <button type="submit" className="signup-submit-btn">
            Sign Up
          </button>
        </form>

        <div className="signup-footer">
          Already have an account? <Link to="/login" className="signup-login-link">Log in</Link>
        </div>
      </div>
    </div>
  );
}