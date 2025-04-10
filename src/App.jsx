import {React,useEffect,useState} from "react";
import { Link,NavLink,Outlet } from "react-router-dom";
import axios from "./api/axios.js";
import Nav from "./nav.jsx";
import "./App.css";
const App = () => {

  const [user,setUser]=useState(null);
  useEffect(()=>{
    async function getUser(){
      const response= await axios.get("/app");
    console.log(response);
    if(response){
      setUser(response.data);
    }
    }
    getUser();
    // return () => {
    //   isMounted = false;
    //   controller.abort(); // Proper cleanup
    // };
  },[]);
 
  return (
    <>
      <Nav user={user}></Nav>
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
