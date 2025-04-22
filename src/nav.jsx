import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "./api/axios.js";
import "./nav.css";


const Navbar = ({userData}) => {
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logout = () => {
        const logoutUser = async () => {
            const res = await axios.post('api/logout', {}, { withCredentials: true });
            console.log(res.data);
        }
        try {
            logoutUser();
            setDropdownOpen(false);
            window.location.href="/";
        }
        catch(err) {
            console.log(err);
        }
    };

    return (
        <>
            <nav className="nav-navbar">
                <div><NavLink className="nav-brand" to="/">Codeprep</NavLink></div>
                <div className="nav-container">
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                    <NavLink className="nav-link" to="problemset">Problemset</NavLink>
                    <NavLink className="nav-link" to="sheets">Sheets</NavLink>
                    <NavLink className="nav-link" to="recommended">Recommended</NavLink>
                    {userData && (
                        <div className="nav-dropdown-container" ref={dropdownRef}>
                            <div 
                                className="nav-trigger" 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img src="./logos/boy.png" alt="Profile" />
                                <span className="nav-name">{userData.username}</span>
                            </div>
                            {dropdownOpen && (
                                <div className="nav-dropdown">
                                    <NavLink 
                                        className="nav-dropdown-item" 
                                        to="profile"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="nav-dropdown-icon">📊</i> Stats
                                    </NavLink>
                                    <NavLink 
                                        className="nav-dropdown-item" 
                                        to="credentials"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <i className="nav-dropdown-icon">🔒</i> Credentials
                                    </NavLink>
                                    <div className="nav-divider"></div>
                                    <button 
                                        className="nav-dropdown-item nav-logout"
                                        onClick={logout}
                                    >
                                        <i className="nav-dropdown-icon">🚪</i> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!userData && (
                        <div>
                            <NavLink className="nav-login" to="/login">Login</NavLink>
                            <NavLink className="nav-signup" to="/signup">Signup</NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
