import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import axiosInstance from "../utils/axiosInstance";

const logoImage = "/assets/logoo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosInstance.post("/auth/register", {
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });
  
      console.log("User registered:", response.data);
      navigate("/login");
    } catch (err) {
      if (err.response?.status === 400) {
        
        
        const backendErrors = {};
        err.response.data.errors.forEach((error) => {
          backendErrors[error.param] = error.msg;
        });
        setErrors(backendErrors);
      } else {
        setErrors({ apiError: "An unexpected error occurred." });
      }
    }
  };

  

  return (
    <div className="signup-container">
      <div className="signup-content">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full Name"
              className="signup-input"
              onChange={handleChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="E-mail"
              className="signup-input"
              onChange={handleChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              className="signup-input"
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              placeholder="Phone Number"
              className="signup-input"
              onChange={handleChange}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          {errors.apiError && <div className="error-message">{errors.apiError}</div>}

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
