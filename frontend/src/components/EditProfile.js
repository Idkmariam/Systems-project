import React, { useState, useEffect } from 'react';
import './edit-profile.css';
import axiosInstance from "../utils/axiosInstance";

const logoImage = "/assets/logoo.png";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const authToken = localStorage.getItem('authToken');
        if (!userId || !authToken) {
          setErrorMessage('Unauthorized access. Please log in again.');
          return;
        }
        const response = await axiosInstance.get(`/users/find/${userId}`, {
          headers: {
            token: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
        setErrorMessage('Failed to fetch user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save changes to the user profile
  const handleSaveChanges = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const authToken = localStorage.getItem("authToken");

      // Send the updated user data to the backend
      const response = await axiosInstance.put(`/api/profileupdate/${userId}`, userData, {
        headers: {
          token: `Bearer ${authToken}`,
        },
      });

      // Update localStorage with the new data
      localStorage.setItem("userData", JSON.stringify(response.data));
      setUserData(response.data); 
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Close the modal and navigate to the profile page
  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/profile';
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

  return (
    <div className="edit-profile-page">
      <img src={logoImage} alt="Logo" className="edit-logo" />

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </div>

      <button onClick={handleSaveChanges} className="submit">Save Changes</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Profile updated successfully!</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
