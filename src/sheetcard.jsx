import "./sheetcard.css";
import axios from "./api/axios.js";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sheetcard = ({ sheetId, sheetName, description, followers, questions, followStatus }) => {
    const [isFollowed, setIsFollowed] = useState(followStatus);
    const [newFollowers, setNewFollowers] = useState(followers);
    const [isHovered, setIsHovered] = useState(false);

    const changeFollowStatus = async () => {
        try {
            const res = await axios.patch(`api/updateSheetStatus`, { sheetId }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PATCH'
            });
            const curStatus = isFollowed;
            let curFollowers = newFollowers;
            setIsFollowed(!curStatus);
            if (!curStatus) curFollowers += 1;
            else curFollowers -= 1;
            setNewFollowers(curFollowers);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div 
            className={`sheet-card ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="sheet-header">
                <NavLink to={`/sheets?id=${sheetId}`} className="sheet-link">
                    <h2 className="sheet-name">{sheetName}</h2>
                </NavLink>
                <button 
                    className={`follow-btn ${isFollowed ? 'followed' : ''}`} 
                    onClick={changeFollowStatus}
                >
                    {isFollowed ? (
                        <span className="btn-text">Following</span>
                    ) : (
                        <span className="btn-text">Follow</span>
                    )}
                    <span className="btn-icon">{isFollowed ? '✓' : '+'}</span>
                </button>
            </div>

            <div className="sheet-description">
                <p className="description-text">
                    {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                </p>
            </div>

            <div className="sheet-stats">
                <div className="stat">
                    <span className="stat-icon">👥</span>
                    <span className="stat-value">{newFollowers}</span>
                </div>
                <div className="stat">
                    <span className="stat-icon">❓</span>
                    <span className="stat-value">{questions}</span>
                </div>
            </div>

            <div className="card-hover-effect"></div>
        </div>
    );
};

export default Sheetcard;