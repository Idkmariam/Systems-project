import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import axiosInstance from "../utils/axiosInstance";


const logoImage = "/assets/logoo.png";  

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      
  
      console.log(response.data);
      localStorage.setItem("token", response.data.accesstoken);
      console.log("Token saved, navigating to home...");
      navigate("/home");
  
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo */}
        <img src={logoImage} alt="Logo" className="login-logo" />
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            className="login-input"
            onChange={handleUsernameChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            className="login-input"
            onChange={handlePasswordChange}
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
