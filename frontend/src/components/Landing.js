import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const logoImage = "/assets/logoo.png";

const Landing = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        
        <img src={logoImage} alt="Logo" className="logo" />
       
      </header>
      <div className="link-container">
        <Link to="/signup" className="landing-link">
          CREATE NEW ACCOUNT
        </Link>
        <Link to="/login" className="landing-link">
          LOGIN
        </Link>
      </div>
    </div>
  );
};

export default Landing;
