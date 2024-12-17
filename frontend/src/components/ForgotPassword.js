import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Updated to use useNavigate
import "./ForgotPassword.css";
const logoImage = "/assets/logoo.png";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
    console.log("Password reset request sent for email:", email);
    // Optionally navigate back to the login page after the form submission
    navigate("/login");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-content">
      <img src={logoImage} alt="Logo" className="login-logo" />
        <h2 className="forgot">Forgot Your Password?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            className="forgot-password-input"
            onChange={handleChange}
          />
          <button type="submit" className="forgot-password-button">
            Submit
          </button>
        </form>
        <button
          type="button"
          className="back-to-login"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
