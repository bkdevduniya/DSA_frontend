import React, { useEffect, useState } from 'react';
import axios from './api/axios';
import { useNavigate, Link } from 'react-router-dom';
import "./admin.css";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    problemUrl: '',
    difficulty: '',
    rating: '',
    tags: '',
    companies: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get('api/admin', { withCredentials: true });
        if (res.data.admin) {
          setIsAdmin(true);
        } else {
          setResponseMsg(res.data.msg || "You need admin privileges to access this page.");
        }
      } catch (err) {
        setResponseMsg("Failed to verify admin status. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
    return 
  }, []);

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === 'select-multiple') {
      const selectedValues = Array.from(selectedOptions).map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: selectedValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/addQuestion', formData, {
        withCredentials: true,
      });
      setResponseMsg(res.data.msg);
      console.log(res.data.msg);
      // Reset form after successful submission
      if (res.data.msg === 'question uploaded') {
        setFormData({
          title: '',
          platform: '',
          problemUrl: '',
          difficulty: '',
          rating: '',
          tags: '',
          companies: [],
        });
      }
    } catch (err) {
      console.error(err);
      setResponseMsg(err.response?.data?.msg || 'Failed to submit question');
    }
    window.scrollTo(0, 0);
  };

  const logoutUser = async () => {
    try {
      const res=await axios.post('api/logout', {}, { withCredentials: true });
      if(res.data.msg==='logout success') navigate('/');
      else alert('Logout failed');
    } catch (err) {
      alert('Logout failed');
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Verifying admin privileges...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-container">
        <div className="error-message">
          <h2>Access Denied</h2>
          <p>{responseMsg}</p>
          <Link to="/login" className="login-link">Return to login page</Link>
        </div>
      </div>
    );
  }

  else{
  
  return (
    <div className="admin-page">
      <nav className="navbar-admin">
        <div className="navbar-admin-title">DSA Tracker Admin</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/problemset">Questions</Link>
          <Link to="/admin" className="active">Add New</Link>
          <Link to="/users">Users</Link>
          <button onClick={logoutUser} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="admin-container">
        {responseMsg && (
          <div className={`response-message ${responseMsg.includes('uploaded') ? 'success' : 'error'}`}>
            {responseMsg}
          </div>
        )}

        <div className="form-container">
          <h1 className="form-header">Add New Question</h1>
          <form onSubmit={handleSubmit} className="question-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Question Title:</label>
                <input 
                  id="title"
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter question title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="platform">Platform:</label>
                <select 
                  id="platform"
                  name="platform" 
                  value={formData.platform} 
                  onChange={handleChange} 
                  required
                  className="form-select-single"
                >
                  <option value="">Select Platform</option>
                  <option value="leetcode">LeetCode</option>
                  <option value="hackerrank">HackerRank</option>
                  <option value="codeforces">Codeforces</option>
                  <option value="codechef">CodeChef</option>
                  <option value="geeksforgeeks">GeeksforGeeks</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="problemUrl">Problem URL:</label>
                <input 
                  id="problemUrl"
                  name="problemUrl" 
                  type="url" 
                  value={formData.problemUrl} 
                  onChange={handleChange} 
                  required 
                  placeholder="https://example.com/problem"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty:</label>
                <select 
                  id="difficulty"
                  name="difficulty" 
                  value={formData.difficulty} 
                  onChange={handleChange} 
                  required
                  className="form-select-single"
                >
                  <option value="">Select Difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating :</label>
                <input 
                  id="rating"
                  name="rating" 
                  type="number" 
                  value={formData.rating} 
                  onChange={handleChange} 
                  required 
              
                />
              </div>

              <div className="form-group">
                <label htmlFor="tags">Tag:</label>
                <select 
                  id="tags"
                  name="tags" 
                  value={formData.tags} 
                  onChange={handleChange} 
                  required
                  className="form-select-single"
                >
                  
  <option value="">Select Tag</option>
  
  <optgroup label="Data Structures">
    <option value="array">Array</option>
    <option value="string">String</option>
    <option value="linked list">Linked List</option>
    <option value="hash table">Hash Table</option>
    <option value="heap">Heap</option>
    <option value="tree">Tree</option>
    <option value="graph">Graph</option>
    <option value="trie">Trie</option>
    <option value="segment tree">Segment Tree</option>
    <option value="fenwick tree">Fenwick Tree</option>
    <option value="persistent segment tree">Persistent Segment Tree</option>
    <option value="sparse table">Sparse Table</option>
  </optgroup>
  
  <optgroup label="Algorithms">
    <option value="two pointers">Two Pointers</option>
    <option value="sliding window">Sliding Window</option>
    <option value="sorting">Sorting</option>
    <option value="searching">Searching</option>
    <option value="binary search">Binary Search</option>
    <option value="depth-first search">Depth-First Search</option>
    <option value="breadth-first search">Breadth-First Search</option>
    <option value="topological sort">Topological Sort</option>
    <option value="prefix sum">Prefix Sum</option>
  </optgroup>
  
  <optgroup label="Problem Solving Techniques">
    <option value="backtracking">Backtracking</option>
    <option value="greedy">Greedy</option>
    <option value="dynamic programming">Dynamic Programming</option>
    <option value="bit manipulation">Bit Manipulation</option>
    <option value="bitmasking">Bitmasking</option>
    <option value="memoization">Memoization</option>
    <option value="recursion">Recursion</option>
  </optgroup>
  
  <optgroup label="Mathematics">
    <option value="number theory">Number Theory</option>
    <option value="combinatorics">Combinatorics</option>
    <option value="modular arithmetic">Modular Arithmetic</option>
    <option value="game theory">Game Theory</option>
    <option value="geometry">Geometry</option>
  </optgroup>

                </select>
              </div>

              <div className="form-group">
                <label htmlFor="companies">Companies (Hold Ctrl to select multiple):</label>
                <select 
                  id="companies"
                  name="companies" 
                  multiple 
                  value={formData.companies} 
                  onChange={handleChange}
                  className="form-select-multiple"
                >
                  <option value="google">Google</option>
                  <option value="amazon">Amazon</option>
                  <option value="microsoft">Microsoft</option>
                  <option value="meta">Meta</option>
                  <option value="apple">Apple</option>
                  <option value="netflix">Netflix</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-publish">
                Publish Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
};

export default AdminPage;