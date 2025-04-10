import { Link } from "react-router-dom";
import "./nav.css";

const Navbar=(props)=>{
    const user=props.user;
    console.log(user);  
    return  (
  <>
    <nav className="navbar-app">
          <div><Link className="navbar-brand" to="/">Codeprep</Link></div>
          <div className="navbar-app-2">
          <span><Link className="nav-link active" aria-current="page" to="/">Home</Link></span>
          <span><Link className="nav-link" to="problemset">problemset</Link></span>
          {user&&<span><img src={user.profilePic}></img><Link className="nav-link " to="profile" style={{color:"black"}}>{user.name}</Link></span>}
          {!user&&<div><Link className="nav-link "  to="/login" id="login">login</Link> <Link className="nav-link " to="signup" id="signup">signup</Link> </div>}
          </div>
      </nav>
      </>
    )
};

export default Navbar;