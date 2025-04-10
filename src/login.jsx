import React, { useState } from 'react';
import axios from './api/axios';


export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('red');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'auth/login',
        formData,
        {
          withCredentials: true, // important if you're using cookies
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const result = res.data;

      if (result.msg === 'invalid credentials') {
        setMessage(result.msg);
        setMessageColor('red');
      } else if (result.msg === 'login success') {
        setMessage(result.msg);
        setMessageColor('green');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Something went wrong.');
      setMessageColor('red');
    }
  };

  return (
    <div className="login-container">
      {message && (
        <div
          id="response-message"
          style={{
            color: messageColor,
            border: `solid 1px ${messageColor}`,
            boxShadow: `3px 3px 3px ${messageColor}, -3px -3px 3px ${messageColor}`,
            padding: '10px',
            marginBottom: '15px'
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} id="user-form">
        <label htmlFor="email">email</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        /><br />
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        /><br />
        <button type="submit">login</button>
        <div id="another-option">
          Not registered? <a href="/signup">signup</a>
        </div>
      </form>
    </div>
  );
}
