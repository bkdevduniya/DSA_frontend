import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "./api/axios.js";
import "./nav.css";

// SVG Icons
const StatsIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24">
    <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z"/>
    <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z"/>
  </svg>
);

const CredentialsIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24">
    <path d="M12 2C9.243 2 7 4.243 7 7v3H5v11h14V10h-2V7c0-2.757-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3v3H9V7c0-1.654 1.346-3 3-3zm-5 9h10v7H7v-7z"/>
  </svg>
);

const AdminIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24">
    <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L18 9v6l-6 3.5-6-3.5V9l6-3.5z"/>
    <path d="M12 16l6-3.5V9l-6 3.5L6 9v3.5l6 3.5z"/>
  </svg>
);

const LogoutIcon = () => (
  <svg className="nav-icon" viewBox="0 0 24 24">
    <path d="M16 17v-3h-3v-2h3V9l4 3.5-4 3.5z"/>
    <path d="M14 5h-3V3h3V1h2v4h-2zm-4 0H3v14h7v-2H5V7h5V5z"/>
  </svg>
);

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
            setDropdownOpen(false);
            window.location.href="/";
        }
        try {
            logoutUser();
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
                    <NavLink className="nav-link" to="recommended">Recommended</NavLink>
                    <NavLink className="nav-link" to="problemset">Problemset</NavLink>
                    <NavLink className="nav-link" to="sheets">Sheets</NavLink>
                    
                    {userData && (
                        <div className="nav-dropdown-container" ref={dropdownRef}>
                            <div 
                                className="nav-trigger" 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <img src={userData.profilePic} alt="Profile" />
                                <span className="nav-name">{userData.name}</span>
                                <svg className="nav-chevron" viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5z"/>
                                </svg>
                            </div>
                            {dropdownOpen && (
                                <div className="nav-dropdown">
                                    <NavLink 
                                        className="nav-dropdown-item" 
                                        to="profile"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <StatsIcon />
                                        <span>Stats</span>
                                    </NavLink>
                                    <NavLink 
                                        className="nav-dropdown-item" 
                                        to="credentials"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        <CredentialsIcon />
                                        <span>Credentials</span>
                                    </NavLink>
                                    {userData.role === 'admin' && (
                                        <NavLink 
                                            className="nav-dropdown-item" 
                                            to="admin"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            <AdminIcon />
                                            <span>Admin</span>
                                        </NavLink>
                                    )}
                                    <div className="nav-divider"></div>
                                    <button 
                                        className="nav-dropdown-item nav-logout"
                                        onClick={logout}
                                    >
                                        <LogoutIcon />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    {!userData && (
                        <div className="nav-auth-buttons">
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