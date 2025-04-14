import "./questioncard.css";
import axios from "./api/axios.js";

const QuestionCard = ({ problem }) => {
  const handleAction = async (action) => {
    try{
    if(action === 'solved'||action === 'skip solved'){
      const response=await axios.patch('api/solved',problem,{
        method:'PATCH'
      });
      console.log(response);
    }
    else{
      const response=await axios.patch('api/skip',problem,{
        method:'PATCH'
      });
      console.log(response);
    }
    window.location.reload();
  }
  catch(err){
    console.log(err);
  }
   // Implement your logic here
  };

  return (
    <div className="question-card">
      <div className="question-card-header">
        <div className={`question-difficulty ${problem.difficulty && problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </div>
        
        <div className="question-tags">
        {problem.tags && <span className="question-tag">{problem.tags}</span>}
      </div>

      <div className="question-rating">
          {'Rating:'+problem.rating }
        </div>
      </div>
      
      <a className="question-title" href={problem.problemUrl} target="_blank"><h3>{problem.title}</h3></a>
      
      <div className="question-platform">
        {problem.platform}
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
          onClick={() => handleAction('skip solved')}
        >
          <span className="question-action-icon">→</span>
          <span className="question-action-text">Skip & Solved</span>
        </button>
        <button 
          className="question-action question-skip-unsolved"
          onClick={() => handleAction('skip unsolved')}
        >
          <span className="question-action-icon">→</span>
          <span className="question-action-text">Skip & Unsolved</span>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;