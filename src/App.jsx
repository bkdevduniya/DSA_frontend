import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "./api/axios.js";
import Nav from "./nav.jsx";
import "./App.css";


const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/app",{
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (response) {
          console.log(response.data);
          setUserData(response.data);
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoaded(true);
      }
    }
    getUser();
    
  }, []);

  if (!isLoaded) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Loading your content...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
    
    
       <Nav userData={userData} />
      
      <main className="app-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <div className="social-links">
              <a href="https://github.com/bkdevduniya" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i> GitHub
              </a>
              <a href="mailto:codeprep.com@gmail.com">
                <i className="fas fa-envelope"></i> Email
              </a>
              <a href="https://www.linkedin.com/feed/?trk=sem-ga_campid.14650114788_asid.150089839322_crid.656569072777_kw.www%20linkedin_d.c_tid.kwd-2246447582_n.g_mt.e_geo.9301027" 
                 target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="/about">About Us</a>
            <a href="/services">Services</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
          
          <div className="footer-section">
            <h3>Contact Info</h3>
            <p><i className="fas fa-map-marker-alt"></i> IIT ROORKEE, jawahar bhawan</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CodePrep. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;