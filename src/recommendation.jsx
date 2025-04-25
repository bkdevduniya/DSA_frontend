import { useEffect, useState } from "react";
import {NavLink} from 'react-router-dom'
import axios from "./api/axios.js";
import Questioncard from "./questioncard";
import "./recommendation.css";

const FlameIcon = () => (
  <svg className="flame-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3c.5 1.5 0 2.5-1 3.5-1 1.2-2 2.4-2 4 0 2.5 2 4.5 3 5s3-1 3-4.5c0-2-1-3-1-4 0-1.2.5-2.5 1-4z" 
          fill="url(#flame-gradient)"/>
    <path d="M8 14c0 2.5 2 4.5 3 5s3-1 3-4.5" 
          stroke="url(#flame-gradient)" 
          strokeWidth="1.5" 
          strokeLinecap="round"/>
    <defs>
      <linearGradient id="flame-gradient" x1="12" y1="3" x2="12" y2="19" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF512F"/>
        <stop offset="1" stopColor="#DD2476"/>
      </linearGradient>
    </defs>
  </svg>
);

const LoadingIcon = () => (
  <svg className="loading-icon" viewBox="0 0 50 50">
    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="4" stroke="url(#loading-gradient)"/>
    <defs>
      <linearGradient id="loading-gradient">
        <stop offset="0%" stopColor="#3a86ff"/>
        <stop offset="100%" stopColor="#8338ec"/>
      </linearGradient>
    </defs>
  </svg>
);

const LockIcon = () => (
  <svg className="lock-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15v2m-3-6V8a3 3 0 1 1 6 0v3m-8 4h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2z" 
          stroke="url(#lock-gradient)" 
          strokeWidth="2" 
          strokeLinecap="round"/>
    <defs>
      <linearGradient id="lock-gradient" x1="12" y1="7" x2="12" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3a86ff"/>
        <stop offset="1" stopColor="#8338ec"/>
      </linearGradient>
    </defs>
  </svg>
);

const Recommendation = () => {
  const [problems, setRecomended] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [recomendedTag, setRecomendedTag] = useState();
  const [isAuthorised, setISAuthorized] = useState(true);

  useEffect(() => {
    const fetchRecomendedSingle = async () => {
      try {
        const response = await axios.get(`/recommend`, {
          headers: { 'Content-Type': 'application/json' }
        });
        setRecomended(response.data.questions);
        setIsLoding(false);
        setISAuthorized(true);
      } catch (error) {
        setISAuthorized(false);
        console.error('Error fetching recommended problems:', error);
        setIsLoding(false);
      }
    };

    const fetchRecommendedMultiple = async () => {
      try {
        const response = await axios.get('/recommend/multiple', {
          headers: { 'Content-Type': 'application/json' }
        });
        setRecomended(response.data.questions);
        if (response.data.questions?.length > 0)
        setRecomendedTag(response.data.questions[0].tags);
        
        setISAuthorized(true);
        setIsLoding(false);

      } catch (err) {
        setISAuthorized(false);
        console.log("error", err);
        setIsLoding(false);
      }
    };

    if (window.location.pathname === '/')
      fetchRecomendedSingle();
    else
      fetchRecommendedMultiple();

    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    // Implement your load more functionality here
    console.log("Loading more problems...");
  };

  if(!isAuthorised){
    return (
      <div className="recommendation-unauthorized">
        <LockIcon />
        <h2>Personalized Recommendations Locked</h2>
        <p>Login or sign up to unlock problem recommendations tailored to your skill level</p>
        <div className="auth-buttons">
          <NavLink to="/login" className="login-button">Login</NavLink>
          <NavLink to="/signup" className="signup-button">Sign Up</NavLink>
        </div>
      </div>
    )
  }
 else{
  return (
    <div className="recommendation-container">
      {!isLoading ? (
        <>
          {recomendedTag && (
            <div className="recommendation-header">
              <FlameIcon />
              <span>Recommended Problems based on your current skill level</span>
              <div className="tag-pill">{recomendedTag}</div>
            </div>
          )}
          {problems?.length > 0 ? (
            <>
              <div className="recommendation-grid">
                {problems.map((qn, index) => (
                  <Questioncard key={`${qn.id}-${index}`} problem={qn} />
                ))}
              </div>
              {
              window.location.pathname=='/'&&
              <NavLink 
                className="more-problems-button"
                to="/recommended"
              >
                More Problems
              </NavLink>
}
            </>
          ) : (
            <div className="recommendation-fallback">
              <svg className="empty-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <p>Solve more problems to get personalized recommendations!</p>
              <button className="explore-button">
                Explore Problemset
                <svg className="arrow-icon" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="recommendation-loading">
          <LoadingIcon />
          <span>Curating your recommendations...</span>
        </div>
      )}
    </div>
  );
}
};

export default Recommendation;