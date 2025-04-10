import {React,useEffect,useState} from "react";
import { Link,NavLink,Outlet } from "react-router-dom";
import axios from "./api/axios.js";
import "./App.css";
const App = () => {

  const [user,setUser]=useState(null);
  useEffect(async ()=>{
    const response= await axios.get("/app");
    console.log(response);
    if(response){
      setUser(response.data);
    }
  },[]);
 
  return (
    <>
      <nav className="navbar">
          <div><Link className="navbar-brand" to="/">Codeprep</Link></div>
          <div className="navbar-2">
          <span><Link className="nav-link active" aria-current="page" to="/">Home</Link></span>
          <span><Link className="nav-link" to="problemset">problemset</Link></span>
          {user&&<span><img src={user.profilePic}></img><Link className="nav-link " to="profile" style={{color:"black"}}>{user.name}</Link></span>}
          {!user&& <div><a className="nav-link " href="../login.html" id="login">login</a> <a className="nav-link " href="../signup.html" id="signup">signup</a> </div>}
          </div>
      </nav>
       <Outlet></Outlet>
      <footer>
      <p>Contact Us:</p>
      <a href="https://github.com/yourusername" target="_blank">GitHub</a>
       <a href="mailto:youremail@example.com">Email</a>
      <a href="https://linkedin.com/in/yourprofile" target="_blank">LinkedIn</a>
     <p>Phone: (123) 456-7890</p>
     <p>Address: 123 Your Street, Your City, Your Country</p>
      </footer>
    </>
  ); 
};
export default App; 
