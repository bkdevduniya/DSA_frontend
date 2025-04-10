import "./questioncard.css";

const QuestionCard = ({ problem }) => {
  const handleAction = (action) => {
    console.log(`Action: ${action} for problem ${problem.id}`);
    // Implement your logic here
  };

  return (
    <div className="question-card">
      <div className="question-card-header">
        <div className={`question-difficulty ${problem.difficulty && problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </div>
        <div className="question-rating">
          {problem.rating}
        </div>
      </div>
      
      <a className="question-title" href={problem.problemUrl}><h3>{problem.title}</h3></a>
      
      <div className="question-platform">
        {problem.platform}
      </div>
      
      <div className="question-tags">
        {problem.tag && <span className="question-tag">{problem.tag}</span>}
      </div>
      
      {problem.company && (
        <div className="question-companies">
          {problem.company.map((company, index) => (
            <span key={index} className="question-company">
              {company}
            </span>
          ))}
        </div>
      )}
      
      <div className="question-actions">
        <button 
          className="question-action question-solved"
          onClick={() => handleAction('solved')}
        >
          <span className="question-action-icon">✓</span>
          <span className="question-action-text">Solved</span>
        </button>
        <button 
          className="question-action question-skip-solved"
          onClick={() => handleAction('skip-solved')}
        >
          <span className="question-action-icon">→</span>
          <span className="question-action-text">Skip & Solved</span>
        </button>
        <button 
          className="question-action question-skip-unsolved"
          onClick={() => handleAction('skip-unsolved')}
        >
          <span className="question-action-icon">→</span>
          <span className="question-action-text">Skip & Unsolved</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;