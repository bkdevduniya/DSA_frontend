import React, { useEffect, useState } from 'react';
import axios from './api/axios';
import { useNavigate, Link } from 'react-router-dom';
import "./admin.css";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [sheetResponseMsg, setSheetResponseMsg] = useState('');
  const [activeTab, setActiveTab] = useState('question'); // 'question' or 'sheet'
  
  // Form data for adding a question
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    problemUrl: '',
    difficulty: '',
    rating: '',
    tags: '',
    companies: [],
  });

  // Form data for adding a DSA sheet
  const [sheetFormData, setSheetFormData] = useState({
    title: '',
    description: '',
    questions: [{ 
      questiontitle: '', 
      tags: [], 
      url: '',
      category: ''
    }]
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

  const handleSheetChange = (e, index) => {
    const { name, value, type, selectedOptions } = e.target;
    
    if (name === 'title' || name === 'description') {
      setSheetFormData(prev => ({ ...prev, [name]: value }));
    } else {
      const updatedQuestions = [...sheetFormData.questions];
      
      if (type === 'select-multiple' && name === 'tags') {
        const selectedTags = Array.from(selectedOptions).map(option => option.value);
        updatedQuestions[index][name] = selectedTags;
      } else {
        updatedQuestions[index][name] = value;
      }
      
      setSheetFormData(prev => ({ ...prev, questions: updatedQuestions }));
    }
  };

  const addQuestionField = () => {
    setSheetFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { 
        questiontitle: '', 
        tags: [], 
        url: '',
        category: ''
      }]
    }));
  };

  const removeQuestionField = (index) => {
    if (sheetFormData.questions.length > 1) {
      const updatedQuestions = [...sheetFormData.questions];
      updatedQuestions.splice(index, 1);
      setSheetFormData(prev => ({ ...prev, questions: updatedQuestions }));
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

  const handleSheetSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/addSheet', sheetFormData, {
        withCredentials: true,
      });
      setSheetResponseMsg(res.data.msg);
      console.log(res.data.msg);
      // Reset form after successful submission
      if (res.data.msg === 'sheet created') {
        setSheetFormData({
          name: '',
          description: '',
          questions: [{ title: '', tag: '', url: '' }]
        });
      }
    } catch (err) {
      console.error(err);
      setSheetResponseMsg(err.response?.data?.msg || 'Failed to create sheet');
    }
    window.scrollTo(0, 0);
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post('api/logout', {}, { withCredentials: true });
      if (res.data.msg === 'logout success') {
        window.localStorage.removeItem("userData");
        navigate('/');
      }
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

  return (
    <div className="admin-page">
      <nav className="navbar-admin">
        <div className="navbar-admin-title">Admin Panel</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <button onClick={logoutUser} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="admin-container">
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'question' ? 'active' : ''}`}
            onClick={() => setActiveTab('question')}
          >
            Add Question
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sheet' ? 'active' : ''}`}
            onClick={() => setActiveTab('sheet')}
          >
            Create DSA Sheet
          </button>
        </div>

        {activeTab === 'question' ? (
          <>
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
                        <option value="depth first search">Depth First Search</option>
                        <option value="breadth first search">Breadth First Search</option>
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
          </>
        ) : (
          <>
            {sheetResponseMsg && (
              <div className={`response-message ${sheetResponseMsg.includes('successfully') ? 'success' : 'error'}`}>
                {sheetResponseMsg}
              </div>
            )}

            <div className="form-container">
              <h1 className="form-header">Create DSA Sheet</h1>
              <form onSubmit={handleSheetSubmit} className="sheet-form">
                <div className="form-group">
                  <label htmlFor="sheetName">Sheet Name:</label>
                  <input 
                    id="sheetName"
                    name="title" 
                    value={sheetFormData.name} 
                    onChange={(e) => handleSheetChange(e)} 
                    required 
                    placeholder="Enter sheet name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sheetDescription">Description:</label>
                  <textarea 
                    id="sheetDescription"
                    name="description" 
                    value={sheetFormData.description} 
                    onChange={(e) => handleSheetChange(e)} 
                    required 
                    placeholder="Enter sheet description"
                    rows="3"
                  />
                </div>

                <div className="questions-section">
                  <h3>Questions in Sheet:</h3>
                  {sheetFormData.questions.map((question, index) => (
                  <div key={index} className="question-item">
                  <div className="form-grid">
                    <div className="form-group">
               <label htmlFor={`questionTitle-${index}`}>Question Title:</label>
                <input 
          id={`questionTitle-${index}`}
          name="questiontitle" 
          value={question.questiontitle} 
          onChange={(e) => handleSheetChange(e, index)} 
          required 
          placeholder="Enter question title"
        />
      </div>

      <div className="form-group">
        <label htmlFor={`questionCategory-${index}`}>Category:</label>
        <input
          id={`questionCategory-${index}`}
          name="category"
          type="text"
          value={question.category}
          onChange={(e) => handleSheetChange(e, index)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor={`questionTag-${index}`}>Tags (Multiple):</label>
        <select 
          id={`questionTag-${index}`}
          name="tags" 
          multiple
          value={question.tags}
          onChange={(e) => handleSheetChange(e, index)} 
          className="form-select-multiple"
        >
                 <option value="">Select Tags</option>
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
                        <option value="depth first search">Depth First Search</option>
                        <option value="breadth first search">Breadth First Search</option>
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
        <label htmlFor={`questionUrl-${index}`}>Problem URL:</label>
        <input 
          id={`questionUrl-${index}`}
          name="url" 
          type="url" 
          value={question.url} 
          onChange={(e) => handleSheetChange(e, index)} 
          required 
          placeholder="https://example.com/problem"
        />
      </div>
    </div>

    {index > 0 && (
      <button 
        type="button" 
        className="btn btn-remove"
        onClick={() => removeQuestionField(index)}
      >
        Remove
      </button>
    )}
  </div>
))}


                  <button 
                    type="button" 
                    className="btn btn-add"
                    onClick={addQuestionField}
                  >
                    + Add Another Question
                  </button>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-publish">
                    Create Sheet
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default AdminPage;