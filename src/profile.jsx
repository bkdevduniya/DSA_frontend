import React, { useState, useEffect } from 'react';
import './profile.css';
import axios from './api/axios.js';

const Profile = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('overview');
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const response = await axios.get('/api/userStats');
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserStats();
  }, []);
  
  // Process user data
  let progressArray, overallScore, strongTopics, averageTopics, weakTopics, totalSolvedQuestions = 0, easySolved = 0, mediumSolved = 0, hardSolved = 0;
  if(userData){
    progressArray = Object.entries(userData.stats?.tags || {})
      .map(([topic, [solved,,score,totalScore,]]) => {
        totalSolvedQuestions += solved.length;
        solved.forEach(problem => {
          if (problem.rating >= 800 && problem.rating <= 1000) easySolved++;
          else if (problem.rating >= 1100 && problem.rating <= 1400) mediumSolved++;
          else hardSolved++;
        });
        return ({ 
          topic, 
          score:totalScore === 0 ? 0 : Math.round((score/totalScore)*100),
          category: (score/totalScore)*100 >= 70 ? 'strong' :(score/totalScore)*100 >= 30 ? 'average' : 'weak'
        });
      })
      .sort((a, b) => b.score - a.score);
    
    const overallCurScore = progressArray.reduce((acc, t) => acc + t.score, 0);
    const overallMaxScore = Object.values(userData.stats?.tags||{}).reduce((acc, t) => acc + t[3], 0);
    overallScore = Math.round((overallCurScore / overallMaxScore) * 100);
    
    strongTopics = progressArray.filter(t => t.category === 'strong');
    averageTopics = progressArray.filter(t => t.category === 'average');
    weakTopics = progressArray.filter(t => t.category === 'weak');
  }

  const getPerformanceColor = (score) => {
    if (!score) return '#e2e8f0';
    return score >= 70 ? '#10b981' : 
           score >= 30 ? '#f59e0b' : 
           '#ef4444';
  };

  const getPerformanceText = (score) => {
    if (!score) return 'No Data';
    return score >= 70 ? 'Excellent' : 
           score >= 30 ? 'Good' : 
           'Needs Work';
  };

  const getTopicIcon = (category) => {
    switch(category) {
      case 'strong': return '🚀';
      case 'average': return '📈';
      case 'weak': return '🛠️';
      default: return '📊';
    }
  };

  if (isLoading) {
    return (
      <div className="profile-loading-screen">
        <div className="profile-loading-spinner">
          <div className="profile-spinner-sector profile-spinner-primary"></div>
          <div className="profile-spinner-sector profile-spinner-secondary"></div>
          <div className="profile-spinner-sector profile-spinner-tertiary"></div>
        </div>
        <p className="profile-loading-text">Crunching your data...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Theme Toggle */}
      <button 
        className="profile-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      {/* Main Content */}
      <main className="profile-main">
        {/* User Profile Card */}
        <section className="profile-user-card">
          {/* Top Right Stats Section */}
          <div className="profile-top-right-stats">
            <div className="profile-stat-total">
              <span className="profile-stat-number">{totalSolvedQuestions || 0}</span>
              <span className="profile-stat-label">Problems Solved</span>
            </div>
            
            <div className="profile-difficulty-breakdown">
              <h4 className="profile-difficulty-title">By Difficulty</h4>
              <div className="profile-difficulty-bars">
                <div className="profile-difficulty-bar">
                  <div className="profile-difficulty-label">
                    <span className="profile-difficulty-dot profile-difficulty-easy"></span>
                    <span>Easy</span>
                  </div>
                  <div className="profile-difficulty-value">
                    <span className="profile-difficulty-count">{easySolved}</span>
                    <span className="profile-difficulty-percent">
                      {totalSolvedQuestions ? Math.round((easySolved / totalSolvedQuestions) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="profile-difficulty-bar">
                  <div className="profile-difficulty-label">
                    <span className="profile-difficulty-dot profile-difficulty-medium"></span>
                    <span>Medium</span>
                  </div>
                  <div className="profile-difficulty-value">
                    <span className="profile-difficulty-count">{mediumSolved}</span>
                    <span className="profile-difficulty-percent">
                      {totalSolvedQuestions ? Math.round((mediumSolved / totalSolvedQuestions) * 100) : 0}%
                    </span>
                  </div>
                </div>
                <div className="profile-difficulty-bar">
                  <div className="profile-difficulty-label">
                    <span className="profile-difficulty-dot profile-difficulty-hard"></span>
                    <span>Hard</span>
                  </div>
                  <div className="profile-difficulty-value">
                    <span className="profile-difficulty-count">{hardSolved}</span>
                    <span className="profile-difficulty-percent">
                      {totalSolvedQuestions ? Math.round((hardSolved / totalSolvedQuestions) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Identity Section */}
          <div className="profile-user-identity">
            <div className="profile-avatar-progress-container">
              <div 
                className="profile-avatar-progress"
                style={{ 
                  '--progress': `${overallScore || 0}%`,
                  '--progress-color': getPerformanceColor(overallScore)
                }}
              >
                <div 
                  className="profile-avatar-container"
                  onMouseEnter={() => setIsHoveringAvatar(true)}
                  onMouseLeave={() => setIsHoveringAvatar(false)}
                >
                  <img 
                    src={userData?.profilePic || '/default-avatar.png'} 
                    alt="Profile" 
                    className="profile-user-avatar"
                  />
                  <div className={`profile-level-badge profile-level-${userData?.level?.toLowerCase() || 'beginner'}`}>
                    {userData?.level || 'Beginner'}
                  </div>
                  {isHoveringAvatar && (
                    <div className="profile-avatar-hover">
                      <span>Change Photo</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="profile-user-info">
              <h2 className="profile-username">{userData?.username || 'Anonymous User'}</h2>
              <p className="profile-user-email">{userData?.email || 'user@example.com'}</p>
            </div>
          </div>
          
          {/* Topic Stats Grid */}
          <div className="profile-stats-grid">
            <div className="profile-stat-card profile-stat-strong">
              <div className="profile-stat-value">{strongTopics?.length || 0}</div>
              <div className="profile-stat-label">Strong Topics</div>
              <div className="profile-stat-icon">💪</div>
              <div className="profile-stat-decoration"></div>
            </div>
            <div className="profile-stat-card profile-stat-average">
              <div className="profile-stat-value">{averageTopics?.length || 0}</div>
              <div className="profile-stat-label">Average Topics</div>
              <div className="profile-stat-icon">📊</div>
              <div className="profile-stat-decoration"></div>
            </div>
            <div className="profile-stat-card profile-stat-weak">
              <div className="profile-stat-value">{weakTopics?.length || 0}</div>
              <div className="profile-stat-label">Weak Topics</div>
              <div className="profile-stat-icon">⚠️</div>
              <div className="profile-stat-decoration"></div>
            </div>
          </div>
        </section>

        {/* Progress Sections */}
        <section className="profile-progress-sections">
          {/* Strong Topics */}
          {strongTopics?.length > 0 && (
            <div className="profile-progress-section profile-strong-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">
                  <span className="profile-title-icon">🚀</span>
                  Strong Topics <span className="profile-count-badge">{strongTopics.length}</span>
                </h3>
                <p className="profile-section-subtitle">You're crushing these topics!</p>
              </div>
              <div className="profile-progress-items">
                {strongTopics.map(({ topic, score }, index) => (
                  <div 
                    key={`strong-${topic}`} 
                    className="profile-progress-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="profile-topic-info">
                      <span className="profile-topic-icon">{getTopicIcon('strong')}</span>
                      <div className="profile-topic-name">
                        {topic.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                    </div>
                    <div className="profile-progress-track">
                      <div 
                        className="profile-progress-fill profile-strong-fill"
                        style={{ width: `${score}%` }}
                      >
                        <span className="profile-score-badge">{score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Average Topics */}
          {averageTopics?.length > 0 && (
            <div className="profile-progress-section profile-average-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">
                  <span className="profile-title-icon">📈</span>
                  Average Topics <span className="profile-count-badge">{averageTopics.length}</span>
                </h3>
                <p className="profile-section-subtitle">Keep practicing to level up!</p>
              </div>
              <div className="profile-progress-items">
                {averageTopics.map(({ topic, score }, index) => (
                  <div 
                    key={`average-${topic}`} 
                    className="profile-progress-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="profile-topic-info">
                      <span className="profile-topic-icon">{getTopicIcon('average')}</span>
                      <div className="profile-topic-name">
                        {topic.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                    </div>
                    <div className="profile-progress-track">
                      <div 
                        className="profile-progress-fill profile-average-fill"
                        style={{ width: `${score}%` }}
                      >
                        <span className="profile-score-badge">{score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weak Topics */}
          {weakTopics?.length > 0 && (
            <div className="profile-progress-section profile-weak-section">
              <div className="profile-section-header">
                <h3 className="profile-section-title">
                  <span className="profile-title-icon">🛠️</span>
                  Weak Topics <span className="profile-count-badge">{weakTopics.length}</span>
                </h3>
                <p className="profile-section-subtitle">Focus on these areas to improve</p>
              </div>
              <div className="profile-progress-items">
                {weakTopics.map(({ topic, score }, index) => (
                  <div 
                    key={`weak-${topic}`} 
                    className="profile-progress-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="profile-topic-info">
                      <span className="profile-topic-icon">{getTopicIcon('weak')}</span>
                      <div className="profile-topic-name">
                        {topic.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </div>
                    </div>
                    <div className="profile-progress-track">
                      <div 
                        className="profile-progress-fill profile-weak-fill"
                        style={{ width: `${score}%` }}
                      >
                        <span className="profile-score-badge">{score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {progressArray?.length === 0 && (
            <div className="profile-empty-state">
              <div className="profile-empty-icon">📊</div>
              <h3 className="profile-empty-title">No progress data yet</h3>
              <p className="profile-empty-message">Start solving problems to track your mastery</p>
              <button className="profile-empty-action">Begin Practice</button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
