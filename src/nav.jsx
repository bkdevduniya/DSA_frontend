import { NavLink } from "react-router-dom";  // Changed from Link to NavLink
import "./nav.css";

const Navbar = (props) => {
    const user = props.user;
    return (
        <>
            <nav className="navbar-app">
                <div><NavLink className="navbar-brand" to="/">Codeprep</NavLink></div>
                <div className="navbar-app-2">
                    <NavLink className="nav-link" to="/" end>Home</NavLink>
                    <NavLink className="nav-link" to="problemset">Problemset</NavLink>
                    <NavLink className="nav-link" to="sheets">Sheets</NavLink>
                    <NavLink className="nav-link" to="recomended">Recommended</NavLink>
                    {user&& <span>
                        <img src="./logos/boy.png" alt="Profile" />
                        <NavLink className="nav-link" to="profile">{user.name}</NavLink>
                    </span>}
                    {!user && <div>
                        <NavLink className="nav-link" to="/login" id="login">Login</NavLink>
                        <NavLink className="nav-link" to="signup" id="signup">Signup</NavLink>
                    </div>}
                </div>
            </nav>
        </>
    )
};

export default Navbar;
