import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from './api/axios';


export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    level: 'beginner',
  });

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
      'auth/signup',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const result = res.data;

      if (result.msg === 'user already exist with this email') {
        setMessage(result.msg);
        setMessageColor('red');
      } else if (result.msg === 'user created') {
        setMessage(result.msg);
        setMessageColor('green');
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('Something went wrong.');
      setMessageColor('red');
    }
  };

  return (
    <div className="signup-container">
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
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="username"
          type="text"
          placeholder="name"
          required
          value={formData.username}
          onChange={handleChange}
        /><br />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="email"
          required
          value={formData.email}
          onChange={handleChange}
        /><br />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="password"
          required
          value={formData.password}
          onChange={handleChange}
        /><br />

        <label htmlFor="level">Current level</label>
        <select
          id="level"
          name="level"
          required
          value={formData.level}
          onChange={handleChange}
        >
          <option value="beginner">beginner</option>
          <option value="intermediate">intermediate</option>
          <option value="expert">expert</option>
        </select>

        <button type="submit" id="signup">Signup</button>

        <div id="another-option">
          Already have an account? <Link to="/login">login</Link>
        </div>
      </form>
    </div>
  );
}
