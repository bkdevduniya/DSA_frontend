import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import Recommended from "./recommendation";
import axios from "./api/axios";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyRange, setDifficultyRange] = useState([800, 2000]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showRecommendationInfo, setShowRecommendationInfo] = useState(false);
  const [allowRecommendationInfo, setAllowRecommendationInfo] = useState(true);

  const problemCategories = [
    { name: "array", tag: "array" },
    { name: "string", tag: "string" },
    { name: "linked list", tag: "linkedlist" },
    { name: "hash table", tag: "hashtable" },
    { name: "two pointers", tag: "twopointers" },
    { name: "sorting", tag: "sort" },
    { name: "searching", tag: "search" },
    { name: "binary search", tag: "binarysearch" },
    { name: "sliding window", tag: "slidingwindow" },
    { name: "heap", tag: "heap" },
    { name: "tree", tag: "tree" },
    { name: "backtracking", tag: "backtrack" },
    { name: "greedy", tag: "greedy" },
    { name: "depth first search", tag: "dfs" },
    { name: "breadth first search", tag: "bfs" },
    { name: "bit manipulation", tag: "bit" },
    { name: "prefix sum", tag: "prefixsum" },
    { name: "graph", tag: "graph" },
    { name: "topological sort", tag: "topological sort" },
    { name: "dynamic programming", tag: "dp" },
    { name: "trie", tag: "trie" },
    { name: "segment tree", tag: "segment tree" },
    { name: "fenwick tree", tag: "binary tree" },
    { name: "persistent segment tree", tag: "persistent seg. tree" },
    { name: "sparse table", tag: "sparse table" },
    { name: "number theory", tag: "number theory" },
    { name: "combinatorics", tag: "combinatrics" },
    { name: "modular arithmetic", tag: "mod" },
    { name: "game theory", tag: "game" },
    { name: "bitmasking", tag: "bitmask" },
    { name: "memoization", tag: "memoization" },
    { name: "geometry", tag: "geo" },
    { name: "recursion", tag: "recursion" }
  ];

  const problemsetCategories = [
    "array", "string", "two pointers", "binary search", "graph",
    "prefix sum", "bitmasking",  "dynamic programming", "greedy"
  ];
  
  const extendedCategories = [
    ...problemsetCategories,
    "linked list", "sorting", "tree", "recursion","hash table", "searching", "sliding window", "heap", "backtracking",
    "depth first search", "breadth first search", "topological sort", "trie",
    "segment tree", "number theory", "combinatorics", "modular arithmetic",
    "geometry", "memoization"
  ];

  // const companyTags = [
  //   "Google", "Amazon", "Microsoft", "Facebook", "Apple",
  //   "Netflix", "Uber", "Airbnb", "Twitter", "LinkedIn"
  // ];

  const toggleCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  return (
    <div className="home-cp-container">
      {/* Hero Section with Search */}
      <section className="home-cp-hero">
        <h1 className="home-cp-title">Master Competitive Programming</h1>
        <p className="home-cp-subtitle">Practice with curated problems and track your progress</p>
        
        {/* Search Section */}
        <div className="home-cp-search-section">
          <div className="home-cp-search-bar">
            <select
              className="home-cp-tag-select"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            >
              <option value="">All Tags</option>
              {problemCategories.map(category => (
                <option key={category.tag} value={category.name}>{category.tag}</option>
              ))}
            </select>
          </div>
          
          <div className="home-cp-advanced-search">
            <div className="home-cp-difficulty-range">
              <label>Difficulty: {difficultyRange[0]} - {difficultyRange[1]}</label>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={parseInt(difficultyRange[0])}
                onChange={(e) => setDifficultyRange([parseInt(e.target.value), difficultyRange[1]])}
                className="home-cp-range-slider"
              />
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={parseInt(difficultyRange[1])}
                onChange={(e) => setDifficultyRange([difficultyRange[0], parseInt(e.target.value)])}
                className="home-cp-range-slider"
              />
            </div>
          </div>
          <NavLink 
            className="home-cp-search-display-button" 
            to={`/problemset?tag=${searchTerm}&difficultyMin=${Math.min(difficultyRange[0],difficultyRange[1])}&difficultyMax=${Math.max(difficultyRange[0], difficultyRange[1])}`}
          >
            Search
          </NavLink>
        </div>
      </section>

      {/* Recommended Problems */}
      <section 
        className="home-cp-recommended"
        onMouseEnter={() =>{
          setShowRecommendationInfo(true);
          setTimeout(() => {
            setShowRecommendationInfo(false);
            setAllowRecommendationInfo(false);
          },3000);
        }
        }
        onMouseLeave={() => setShowRecommendationInfo(false)}
      >
        <h2 className="home-cp-section-title">Recommended For You</h2>
       {allowRecommendationInfo&&<p className="home-cp-recommended-info" style={{display: showRecommendationInfo ? 'block' : 'none', opacity: showRecommendationInfo ? 1 : 0, transition: 'opacity 0.3s ease-in-out', color: 'var( #3a0ca3)', fontSize: '0.9rem'
          , marginBottom: 'var(--space-md)', textAlign: 'center', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto',border: '1px solid var(--cp-gray)', borderRadius: 'var(--radius-md)', padding: 'var(--space-sm)'
        }}> Based on your current progress, we recommend these problems.<br></br>
            follow these problems for more organised learning
        </p>
        }
        <Recommended />
      </section>

      {/* Problem Categories */}
      <section className="home-cp-categories">
        <h2 className="home-cp-section-title">Problem Categories</h2>
        <div className="home-cp-category-grid">
          {(showAllCategories ? extendedCategories : problemsetCategories).map((category,index) => (
            <NavLink
              key={index}
              to={`/problemset?tag=${category}&difficultyMin=800&difficultyMax=3000`}
              className="home-cp-category-card"
            >
              <h3>{category}</h3>
              <p>Practice {category.toLowerCase()} problems</p>
            </NavLink>
          ))}
        </div>
        <button 
          className="home-cp-show-more-btn"
          onClick={toggleCategories}
        >
          {showAllCategories ? 'Show Less' : 'Show More Categories'}
        </button>
      </section>

      {/* Cheat Sheets Section */}
      <section className="home-cp-sheets">
        <h2 className="home-cp-section-title">Quick Reference Sheets</h2>
        <div className="home-cp-sheet-grid">
          <NavLink to="/sheets?id=680935db1c17d1e96b9e57ab" className="home-cp-sheet-card">
            <h3>Dynamic Programming</h3>
            <p>Common patterns and templates</p>
          </NavLink>
          
          <NavLink to="/sheets?id=6809370b1c17d1e96b9e57c6" className="home-cp-sheet-card">
            <h3>Graph Algorithms</h3>
            <p>DFS, BFS, Dijkstra and more</p>
          </NavLink>
          
          <NavLink to="/sheets?id=680932951c17d1e96b9e57a8" className="home-cp-sheet-card">
            <h3>Binary Search</h3>
            <p>Implementation and variations</p>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;