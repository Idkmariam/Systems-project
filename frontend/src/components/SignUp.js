import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
const logoImage = "/assets/logoo.png";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({}); // State for error messages

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user types
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, phone } = formData;

    if (!name) newErrors.name = "Name is required.";
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) newErrors.password = "Password is required.";
    if (!phone) newErrors.phone = "Phone number is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors); // Set errors if validation fails
    } else {
      console.log("Form Submitted", formData);
      navigate("/login"); // Navigate on successful submission
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

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
