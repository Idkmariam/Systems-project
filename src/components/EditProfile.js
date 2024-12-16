import React, { useState,useEffect } from 'react';
import './edit-profile.css';

const logoImage = "/assets/logoo.png"; 

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [showModal, setShowModal] = useState(false);

  // Load user data from localStorage or set default values
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Save the changes to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.href = '/profile'; // Navigate back to the Profile page after closing the modal
  };
  return (
    <div className="edit-profile-page">
        <img src={logoImage} alt="Logo" className="edit-logo" />
      
        <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={userData.address}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSaveChanges} className='submit'>Save Changes</button>
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
