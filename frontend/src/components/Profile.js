import React,{useState, useEffect} from 'react';
import './profile.css';
import Navbar from './navbar';
import Modal from './modal';
const logoImage = "/assets/logoo.png"; 


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1234567890',
    address: '123 Main Street, Anytown, USA',
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true); // Open the edit profile modal
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true); // Open the logout modal
  };

  const handleConfirmEdit = () => {
    setIsEditModalOpen(false); // Close the modal
    window.location.href = '/edit-profile'; // Proceed to the edit profile page
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false); // Close the modal
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false); // Close the modal
    localStorage.removeItem('authToken'); // Log out logic
    window.location.href = '/login'; // Redirect to login page
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false); // Close the modal
  };
  
  
  

  return (
    <div className="profile-page">
        <Navbar />
        <img src={logoImage} alt="Logo" className="pro-logo" />
     
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
      <button className="edit-profile-button" onClick={handleEditProfile}>Edit Profile</button>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>

      {/* Modal for Edit Profile Confirmation */}
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
