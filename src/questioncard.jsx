import "./questioncard.css";
import axios from "./api/axios.js";
import { useState } from "react";

const QuestionCard = ({ problem }) => {
  const [actionTaken, setActionTaken] = useState(null);

  const handleAction = async (action) => {
    try {
      if (action === 'solved') {
        await axios.patch('api/solved', problem, { method: 'PATCH' });
        setActionTaken('solved');
      } else {
        await axios.patch('api/skip', problem, { method: 'PATCH' });
        setActionTaken('skipped');
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="question-card">
      <div className="card-content">
        <div className="card-main">
          <a className="question-title" href={problem.problemUrl} target="_blank" rel="noreferrer">
            {problem.title}
          </a>
          <div className="meta-info">
            <span className="question-platform">{problem.platform}</span>
            {problem.company && problem.company.length > 0 && (
              <span className="question-company">{problem.company[0]}</span>
            )}
          </div>
        </div>
        
        <div className="card-side">
          <div className={`question-difficulty ${problem.difficulty?.toLowerCase()}`}>
            {problem.difficulty}
          </div>
          <div className="question-rating">
            {problem.rating}★
          </div>
          {problem.tags && (
            <div className="question-tag">{problem.tags}</div>
          )}
        </div>
      </div>
      
      <div className="question-actions">
        <button 
          className={`question-action ${actionTaken === 'solved' ? 'question-solved-active' : 'question-solved-neutral'}`}
          onClick={() => handleAction('solved')}
        >
          <span className="question-action-icon">
            {actionTaken === 'solved' ? '✓' : ''}
          </span>
          <span className="question-action-text">
            {actionTaken === 'solved' ? 'Solved' : 'Mark Solved'}
          </span>
        </button>
        <button 
          className={`question-action ${actionTaken === 'skipped' ? 'question-skip-active' : 'question-skip-neutral'}`}
          onClick={() => handleAction('skip')}
        >
          <span className="question-action-icon">
            {actionTaken === 'skipped' ? '✗' : ''}
          </span>
          <span className="question-action-text">
            {actionTaken === 'skipped' ? 'Skipped' : 'Skip'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;