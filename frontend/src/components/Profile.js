import React, { useState, useEffect } from 'react';
import './profile.css';
import Navbar from './navbar';
import Modal from './modal';

import axiosInstance from "../utils/axiosInstance";
const logoImage = "/assets/logoo.png"; 

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState('');
  

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/api/profileupdate/${userId}`, {
          headers: {
            token: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError('Failed to load profile data.');
      } finally {
        setIsLoading(false); 
      }
    };

    fetchUserData();
  }, []); 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmEdit = () => {
    setIsEditModalOpen(false);
    window.location.href = '/edit-profile';
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="profile-page">
      <Navbar />
      <img src={logoImage} alt="Logo" className="pro-logo" />

      {userData && (
        <div className="profile-info">
          <div className="profile-item">
            <strong>Name:</strong> {userData.name}
          </div>
          <div className="profile-item">
            <strong>Email:</strong> {userData.email}
          </div>
          <div className="profile-item">
            <strong>Phone:</strong> {userData.phone}
          </div>
          <div className="profile-item">
            <strong>Address:</strong> {userData.address}
          </div>
        </div>
      )}

      <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>

      {isEditModalOpen && (
        <Modal 
          message="Do you want to edit your profile?" 
          onConfirm={handleConfirmEdit} 
          onCancel={handleCancelEdit} 
        />
      )}

      {/* Modal for Logout Confirmation */}
      {isLogoutModalOpen && (
        <Modal 
          message="Are you sure you want to log out?" 
          onConfirm={handleConfirmLogout} 
          onCancel={handleCancelLogout} 
        />
      )}
    </div>
  );
};

export default ProfilePage;
