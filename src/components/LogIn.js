import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
const logoImage = "/assets/logoo.png";  // Make sure the path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Logging in with", email, password);
      navigate("/home");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {/* Logo */}
        <img src={logoImage} alt="Logo" className="login-logo" />
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            className="login-input"
            onChange={handleEmailChange}
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
