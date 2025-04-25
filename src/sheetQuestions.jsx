import SheetQuestionCard from "./sheetQuestionCard";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "./api/axios.js";
import "./sheetQuestions.css";

// Define category groups
export default function SheetQuestions() {
  const [searchParams] = useSearchParams();
  const [searchedSheet, setSearchedSheet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupedQuestions, setGroupedQuestions] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [sheetMeta, setSheetMeta] = useState({
    title: '',
    description: '',
    followers: 0
  });

  // Toggle category accordion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Categorize questions
  const categorizeQuestions = (questions) => {
    const categorized = {};

    // Initialize categories
   

    // Add uncategorized section
    

    questions.forEach(question => {
        if (!categorized[question.category]) {
          categorized[question.category] = [];
        }
        categorized[question.category].push(question);
        
    });

    return categorized;
  };

  useEffect(() => {
    const sheetId = searchParams.get('id');
    const getSearchedSheet = async () => {
      try {
        const response = await axios.get('/api/sheetQuestions', {
          headers: {
            'Content-Type': 'application/json'
          },
          params: { sheetId: sheetId }
        });

        const sheetsData = response.data.questions;
        setSearchedSheet(sheetsData);
        setSheetMeta({
          title: response.data.meta?.title || 'Untitled Sheet',
          description: response.data.meta?.description || '',
          followers: response.data.meta?.followers || 0
        });

        const categorized = categorizeQuestions(sheetsData);
        setGroupedQuestions(categorized);

        // Initialize all categories as expanded
        const initialExpandedState = {};
        Object.keys(categorized).forEach(category => {
          initialExpandedState[category] = true;
        });
        setExpandedCategories(initialExpandedState);

        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    getSearchedSheet();
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div className="sheetQuestion-loading">Loading...</div>;
  }

  return (
    <div id="sheetQuestion-searched-sheet">
      <div className="sheetQuestion-header">
        <h1>{sheetMeta.title}</h1>
        {sheetMeta.description && <p>{sheetMeta.description}</p>}
        <div className="sheetQuestion-meta">
          <div className="sheetQuestion-meta-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M17 21v-2a4 4 0 0 0-3-3.87M7 21v-2a4 4 0 0 1 3-3.87m5-4.13a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6 4v-1a3 3 0 0 0-2-2.82M3 16v-1a3 3 0 0 1 2-2.82" />
            </svg>
            <span>{sheetMeta.followers} Followers</span>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([category, questions]) => {
        if (questions.length === 0) return null;
        return (
          <div key={category} className="sheetQuestion-category-section">
            <div
              className="sheetQuestion-category-header"
              onClick={() => toggleCategory(category)}
            >
              <h2 className="sheetQuestion-category-title">
                {category}
                <span className="sheetQuestion-question-count">{questions.length}</span>
              </h2>
              <span className="sheetQuestion-toggle-icon">
                {expandedCategories[category] ? '▼' : '▶'}
              </span>
            </div>
            <div
              className={`sheetQuestion-questions-grid ${
                expandedCategories[category] ? 'expanded' : 'collapsed'
              }`}
            >
              {questions.map((question, index) => (
                <SheetQuestionCard
                  key={`${category}-${index}`}
                  question={question}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
