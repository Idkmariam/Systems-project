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

    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }
  
    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      navigate("/home");
      
      //console.log(response.data);

     
      //localStorage.setItem("token", response.data.accesstoken);

      
     
  
    } catch (err) {
      const errorMessage =
        err.response?.status === 401
          ? "Invalid username or password."
          : "An error occurred. Please try again later.";
      setError(errorMessage);
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
