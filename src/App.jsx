import { React, useEffect, useState } from "react";
import { Outlet ,NavLink} from "react-router-dom";
import axios from "./api/axios.js";
import Nav from "./nav.jsx";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get("/app");
        if (response) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    getUser();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <Nav user={user} />
      </header>
      
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
              <a href="https://www.linkedin.com/feed/?trk=sem-ga_campid.14650114788_asid.150089839322_crid.656569072777_kw.www%20linkedin_d.c_tid.kwd-2246447582_n.g_mt.e_geo.9301027" target="_blank" rel="noopener noreferrer">
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
            <p><i className="fas fa-phone"></i>+91 7878186751</p>
            <p><i className="fas fa-map-marker-alt"></i>IIT ROORKEE, jawahar bhawan</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          {/* <p>&copy; {new Date().getFullYear()} Your Co. All rights reserved.</p> */}
        </div>
      </footer>
    </div>
  );
};

export default App;