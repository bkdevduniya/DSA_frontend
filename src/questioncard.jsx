import "./questioncard.css";
import axios from "./api/axios.js";

const QuestionCard = ({ problem }) => {
  const handleAction = async (action) => {
    try {
      if (action === 'solved') {
        await axios.patch('api/solved', problem, { method: 'PATCH' });
      } else {
        await axios.patch('api/skip', problem, { method: 'PATCH' });
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
          className="question-action question-solved"
          onClick={() => handleAction('solved')}
        >
          <span className="question-action-icon">✓</span>
          <span className="question-action-text">Solved</span>
        </button>
        <button 
          className="question-action question-skip"
          onClick={() => handleAction('skip')}
        >
          <span className="question-action-icon">→</span>
          <span className="question-action-text">Skip</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;