import React, { useState,useEffect, use } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import Recommended from "./recommendation";



const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyTag, setCompanyTag] = useState("");
  const [difficultyRange, setDifficultyRange] = useState([800, 2000]);
  const [recomended, setRecomended] = useState([]);

  const problemCategories = [
    { name: "Arrays", tag: "array" },
    { name: "Dynamic Programming", tag: "dp" },
    { name: "Graphs", tag: "graph" },
    { name: "Trees", tag: "tree" },
    { name: "Strings", tag: "string" },
    { name: "Math", tag: "math" },
    { name: "Greedy", tag: "greedy" },
    { name: "Bit Manipulation", tag: "bit" },
  ];

  const companyTags = [
    "Google", "Amazon", "Microsoft", "Facebook", "Apple",
    "Netflix", "Uber", "Airbnb", "Twitter", "LinkedIn"
  ];

  return (
    <div className="home-cp-container">
      {/* Hero Section with Search */}
      <section className="home-cp-hero">
        <h1 className="home-cp-title">Master Competitive Programming</h1>
        <p className="home-cp-subtitle">Practice with curated problems and track your progress</p>
        
        {/* Search Section */}
        <div className="home-cp-search-section">
          <div className="home-cp-search-bar">
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="home-cp-search-input"
            />
            <button className="home-cp-search-button">
            <i icon="fa-solid fa-magnifying-glass" />
            </button>
          </div>
          
          <div className="home-cp-advanced-search">
            <select 
              className="home-cp-tag-select"
              value={companyTag}
              onChange={(e) => setCompanyTag(e.target.value)}
            >
              <option value="">All Companies</option>
              {companyTags.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
            
            <div className="home-cp-difficulty-range">
              <label>Difficulty: {difficultyRange[0]} - {difficultyRange[1]}</label>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={difficultyRange[0]}
                onChange={(e) => setDifficultyRange([parseInt(e.target.value), difficultyRange[1]])}
                className="home-cp-range-slider"
              />
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={difficultyRange[1]}
                onChange={(e) => setDifficultyRange([difficultyRange[0], parseInt(e.target.value)])}
                className="home-cp-range-slider"
              />
            </div>
          </div>
        </div>
        <button className="home-cp-search-display-button">Search</button>
      </section>

       {/* Recommended Problems */}
       <section className="home-cp-recommended">
        <h2 className="home-cp-section-title">Recommended For You</h2>
        
          {/* This would be populated from your Recommendation component */}
          {/* <div className="home-cp-problem-card">
            <div className="home-cp-problem-difficulty easy">Easy</div>
            <h3>Two Sum</h3>
            <div className="home-cp-problem-tags">
              <span className="home-cp-tag">array</span>
              <span className="home-cp-tag">hash table</span>
            </div>
            <div className="home-cp-problem-meta">
              <span>Solved by 75%</span>
              <span>Google, Amazon</span>
            </div>
          </div> */}
         <Recommended />
      </section>

      {/* Problem Categories */}
      <section className="home-cp-categories">
        <h2 className="home-cp-section-title">Problem Categories</h2>
        <div className="home-cp-category-grid">
          {problemCategories.map(category => (
            <NavLink
              key={category.tag}
              to={`/problems/${category.tag}`}
              className="home-cp-category-card"
            >
              <h3>{category.name}</h3>
              <p>Practice {category.name.toLowerCase()} problems</p>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Cheat Sheets Section */}
      <section className="home-cp-sheets">
        <h2 className="home-cp-section-title">Quick Reference Sheets</h2>
        <div className="home-cp-sheet-grid">
          <NavLink to="/sheets/dp" className="home-cp-sheet-card">
            <h3>Dynamic Programming</h3>
            <p>Common patterns and templates</p>
          </NavLink>
          
          <NavLink to="/sheets/graph" className="home-cp-sheet-card">
            <h3>Graph Algorithms</h3>
            <p>DFS, BFS, Dijkstra and more</p>
          </NavLink>
          
          <NavLink to="/sheets/binary-search" className="home-cp-sheet-card">
            <h3>Binary Search</h3>
            <p>Implementation and variations</p>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;