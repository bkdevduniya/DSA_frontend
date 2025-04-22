import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import Recommended from "./recommendation";
import axios from "./api/axios";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyRange, setDifficultyRange] = useState([800, 2000]);

  const problemCategories = [
    { name: "array", tag: "array" },
    { name: "string", tag: "string" },
    { name: "two pointers", tag: "two pointers" },
    { name: "binary search", tag: "binary search" },
    { name: "tree", tag: "tree" },
    { name: "greedy", tag: "greedy" },
    { name: "bit manipulation", tag: "bit manipulation" },
    { name: "prefix sum", tag: "prefix sum" },
    { name: "graph", tag: "graph" },
    { name: "dynamic programming", tag: "dp" },
    { name: "segment tree", tag: "segment tree" },
    { name: "recursion", tag: "recursion" }
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
      <section className="home-cp-recommended">
        <h2 className="home-cp-section-title">Recommended For You</h2>
        <Recommended />
      </section>

      {/* Problem Categories */}
      <section className="home-cp-categories">
        <h2 className="home-cp-section-title">Problem Categories</h2>
        <div className="home-cp-category-grid">
          {problemCategories.map(category => (
            <NavLink
              key={category.tag}
              to={`/problemset?tag=${category.name}&difficultyMin=800&difficultyMax=3000`}
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