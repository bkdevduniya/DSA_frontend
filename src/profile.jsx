import React, { useRef, useEffect, useState } from 'react';
import './profile.css';

const Profile = () => {
  const bubblesRef = useRef(null);
  const strongRef = useRef(null);
  const averageRef = useRef(null);
  const weakRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    level: 'Intermediate',
    progress: {
      'array': 85,
      'string': 75,
      'linked list': 60,
      'hash table': 45,
      'two pointers': 70,
      'sorting': 65,
      'searching': 80,
      'binary search': 75,
      'sliding window': 50,
      'heap': 40,
      'tree': 55,
      'backtracking': 30,
      'greedy': 65,
      'depth_first search': 45,
      'breadth first search': 50,
      'bit manipulation': 35,
      'prefix sum': 60,
      'graph': 40,
      'topological_sort': 25,
      'dynamic programming': 30,
      'trie': 20,
      'segment tree': 15,
      'fenwick_tree': 10,
      'persistent segment tree': 5,
      'sparse table': 5,
      'number theory': 25,
      'combinatorics': 20,
      'modular arithmetic': 30,
      'game theory': 15,
      'bitmasking': 10,
      'memoization': 40,
      'geometry': 20,
      'recursion': 70
    }
  };

  // Categorize topics
  const progressArray = Object.entries(user.progress)
    .map(([topic, score]) => ({ 
      topic, 
      score,
      size: 40 + (score * 0.8),
      category: score >= 70 ? 'strong' : score >= 30 ? 'average' : 'weak'
    }))
    .sort((a, b) => b.score - a.score);

  const strongTopics = progressArray.filter(t => t.category === 'strong');
  const averageTopics = progressArray.filter(t => t.category === 'average');
  const weakTopics = progressArray.filter(t => t.category === 'weak');

  // Position bubbles with force-directed layout
  const positionBubbles = (containerRef, items) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const bubbles = Array.from(container.children);
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    
    // Initial positions in a grid
    bubbles.forEach((bubble, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      bubble._x = (col + 1) * (container.offsetWidth / 6);
      bubble._y = (row + 1) * (container.offsetHeight / (Math.ceil(items.length / 5) + 1));
    });

    // Force-directed layout
    const repelForce = 1.2;
    const iterations = 50;
    
    for (let i = 0; i < iterations; i++) {
      bubbles.forEach(bubble1 => {
        let fx = 0;
        let fy = 0;
        
        bubbles.forEach(bubble2 => {
          if (bubble1 === bubble2) return;
          
          const dx = bubble1._x - bubble2._x;
          const dy = bubble1._y - bubble2._y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = (parseInt(bubble1.style.width) + parseInt(bubble2.style.width)) / 2 + 15;
          
          if (distance < minDistance) {
            const force = (minDistance - distance) / distance * repelForce;
            fx += dx * force;
            fy += dy * force;
          }
        });
        
        // Apply forces
        bubble1._x += fx;
        bubble1._y += fy;
        
        // Keep within container bounds
        const bubbleWidth = parseInt(bubble1.style.width);
        const bubbleHeight = parseInt(bubble1.style.height);
        bubble1._x = Math.max(bubbleWidth/2, Math.min(container.offsetWidth - bubbleWidth/2, bubble1._x));
        bubble1._y = Math.max(bubbleHeight/2, Math.min(container.offsetHeight - bubbleHeight/2, bubble1._y));
      });
    }

    // Apply final positions
    bubbles.forEach(bubble => {
      bubble.style.left = `${bubble._x - parseInt(bubble.style.width)/2}px`;
      bubble.style.top = `${bubble._y - parseInt(bubble.style.height)/2}px`;
    });
  };

  useEffect(() => {
    positionBubbles(bubblesRef, progressArray);
    positionBubbles(strongRef, strongTopics);
    positionBubbles(averageRef, averageTopics);
    positionBubbles(weakRef, weakTopics);

    const updateDimensions = () => {
      if (bubblesRef.current) {
        setDimensions({
          width: bubblesRef.current.offsetWidth,
          height: bubblesRef.current.offsetHeight
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [dimensions]);

  return (
    <div className="profile-dark-container">
      <div className="profile-dark-header">
        <h1 className="profile-dark-title">DSA Mastery Dashboard</h1>
      </div>
      <div className="profile-dark-content">
        {/* User Info Section */}
        <div className="profile-dark-user-info">
          <div className="profile-dark-avatar-container">
            <img src={user.profilePic} alt="Profile" className="profile-dark-avatar"/>
            <div className={`profile-dark-level-badge profile-dark-level-${user.level.toLowerCase()}`}>
              {user.level}
            </div>
          </div>
          <div className="profile-dark-user-details">
            <h2 className="profile-dark-username">{user.name}</h2>
            <p className="profile-dark-email">{user.email}</p>
            <div className="profile-dark-stats">
              <div className="profile-dark-stat">
                <span className="profile-dark-stat-value">
                  {Math.round(progressArray.reduce((sum, {score}) => sum + score, 0) / progressArray.length)}%
                </span>
                <span className="profile-dark-stat-label">Overall</span>
              </div>
              <div className="profile-dark-stat">
                <span className="profile-dark-stat-value">
                  {strongTopics.length}
                </span>
                <span className="profile-dark-stat-label">Strong</span>
              </div>
              <div className="profile-dark-stat">
                <span className="profile-dark-stat-value">
                  {progressArray.length}
                </span>
                <span className="profile-dark-stat-label">Topics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strong Topics Section */}
        <div className="profile-dark-group-section profile-dark-strong-section">
          <h3 className="profile-dark-section-title">
            <span className="profile-dark-section-title-icon">💪</span> Strong Topics ({strongTopics.length})
          </h3>
          <p className="profile-dark-section-subtitle">Topics with 70% or higher mastery</p>
          
          <div className="profile-dark-bubbles-container profile-dark-group-container" ref={strongRef}>
            {strongTopics.map(({ topic, score, size }) => (
              <div 
                key={`strong-${topic}`} 
                className="profile-dark-bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  '--progress': `${score}%`,
                  '--color': getBubbleColor(score)
                }}
                data-tooltip={`${topic}: ${score}%`}
              >
                <div className="profile-dark-bubble-inner">
                  <span className="profile-dark-bubble-text">
                    {topic.split('_').join(' ')}
                  </span>
                </div>
                <div className="profile-dark-bubble-meter">
                  <div 
                    className="profile-dark-bubble-meter-fill"
                    style={{ '--meter-progress': `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Average Topics Section */}
        <div className="profile-dark-group-section profile-dark-average-section">
          <h3 className="profile-dark-section-title">
            <span className="profile-dark-section-title-icon">🔄</span> Average Topics ({averageTopics.length})
          </h3>
          <p className="profile-dark-section-subtitle">Topics with 30-69% mastery</p>
          
          <div className="profile-dark-bubbles-container profile-dark-group-container" ref={averageRef}>
            {averageTopics.map(({ topic, score, size }) => (
              <div 
                key={`average-${topic}`} 
                className="profile-dark-bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  '--progress': `${score}%`,
                  '--color': getBubbleColor(score)
                }}
                data-tooltip={`${topic}: ${score}%`}
              >
                <div className="profile-dark-bubble-inner">
                  <span className="profile-dark-bubble-text">
                    {topic.split('_').join(' ')}
                  </span>
                </div>
                <div className="profile-dark-bubble-meter">
                  <div 
                    className="profile-dark-bubble-meter-fill"
                    style={{ '--meter-progress': `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics Section */}
        <div className="profile-dark-group-section profile-dark-weak-section">
          <h3 className="profile-dark-section-title">
            <span className="profile-dark-section-title-icon">⚠️</span> Weak Topics ({weakTopics.length})
          </h3>
          <p className="profile-dark-section-subtitle">Topics below 30% mastery</p>
          
          <div className="profile-dark-bubbles-container profile-dark-group-container" ref={weakRef}>
            {weakTopics.map(({ topic, score, size }) => (
              <div 
                key={`weak-${topic}`} 
                className="profile-dark-bubble"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  '--progress': `${score}%`,
                  '--color': getBubbleColor(score)
                }}
                data-tooltip={`${topic}: ${score}%`}
              >
                <div className="profile-dark-bubble-inner">
                  <span className="profile-dark-bubble-text">
                    {topic.split('_').join(' ')}
                  </span>
                </div>
                <div className="profile-dark-bubble-meter">
                  <div 
                    className="profile-dark-bubble-meter-fill"
                    style={{ '--meter-progress': `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine bubble color based on score
function getBubbleColor(score) {
  if (score >= 70) return '#4CAF50'; // Green
  if (score >= 30) return '#FFC107'; // Yellow
  return '#F44336'; // Red
}

export default Profile;
