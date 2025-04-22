import "./sheetcard.css";
import axios from  "./api/axios.js";
import {useState} from "react";
import {NavLink} from "react-router-dom";

const Sheetcard = ({sheetId, sheetName, description, followers, questions, followStatus}) => {
    const [isFollowed, setIsFollowed] = useState(followStatus);
    const [newFollowers, setNewFollowers] = useState(followers);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const changeFollowStatus = async () => {
        try {
            const res = await axios.patch(`api/updateSheetStatus`, {sheetId}, { 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                method: 'PATCH' 
            });
            const curStatus = isFollowed;
            let curFollowers = newFollowers;
            setIsFollowed(!curStatus);
            if(!curStatus) curFollowers += 1;
            else curFollowers -= 1;
            setNewFollowers(curFollowers);
        } catch (err) {
            console.log(err);
        }
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="sheet-card">
            <div className="sheet-header">
                <NavLink to={`/sheets?id=${sheetId}`} className="sheet-link" style={{ textDecoration: 'none' }}>
                    <h2 className="sheet-name">{sheetName}</h2>
                </NavLink>
                <button className={`follow-btn ${isFollowed ? 'followed' : ''}`} onClick={changeFollowStatus}>
                    {isFollowed ? 'Following' : 'Follow'}
                </button>
            </div>
            
            <div className="sheet-description">
                {description && (
                    <>
                        <p className={`description-text ${showFullDescription ? '' : 'truncated'}`}>
                            {description}
                        </p>
                        {description.length > 100 && (
                            <button className="toggle-description" onClick={toggleDescription}>
                                {showFullDescription ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </>
                )}
            </div>
            
            <div className="sheet-stats">
                <div className="stat">
                    <span className="stat-value">{newFollowers}</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat">
                    <span className="stat-value">{questions}</span>
                    <span className="stat-label">Questions</span>
                </div>
            </div>
        </div>
    );
};

export default Sheetcard;