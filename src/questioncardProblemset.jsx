import "./questioncardProblemset.css";
import axios from "./api/axios.js";
import { useState } from "react";


const QuestionCard = ({ problem,statusChange,curStatus }) => {
  // const [isSolved, setIsSolved] = useState(false);
  const handleSolved = async () => {
    try {
      let tempStatus= Array.from(curStatus);
      if(problem.status=='unsolved'){
      await axios.patch('api/solved', problem, { method: 'PATCH' });
      // setIsSolved(true);
      tempStatus[0].add(problem.title);
      tempStatus[1].delete(problem.title);
      statusChange(tempStatus);
      }
      else{
      await axios.patch('api/unsolved', problem, { method: 'PATCH' });
      // setIsSolved(true);
      tempStatus[0].delete(problem.title);
      tempStatus[1].add(problem.title);
      statusChange(tempStatus);
      }
      // No page reload to maintain smooth UX
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="questioncardproblemset">
      <div className="questioncardproblemset-content">
        <div className="questioncardproblemset-main">
          <div className="questioncardproblemset-header">
            <span className={`questioncardproblemset-difficulty ${problem.difficulty?.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            <span className="questioncardproblemset-rating">{problem.rating}★</span>
          </div>
          
          <a className="questioncardproblemset-title" href={problem.problemUrl} target="_blank" rel="noreferrer">
            {problem.title}
          </a>
          
          <div className="questioncardproblemset-meta">
            <span className="questioncardproblemset-platform">{problem.platform}</span>
            {problem.tags && (
              <span className="questioncardproblemset-tag">{problem.tags}</span>
            )}
          </div>
        </div>
        
        <div className="questioncardproblemset-actions">
          <button 
            className={`questioncardproblemset-action ${problem.status=='solved'? 'solved-active' : ''}`}
            onClick={handleSolved}
          >
            {problem.status=='solved'? '✓ Solved' : 'Mark Solved'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;