import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance"; // Your axios instance

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !authToken) {
      navigate("/login"); // Redirect to login if user is not authenticated
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get(`/api/profileupdate/${userId}`, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUserData(response.data); // Populate form with user data
        } catch (error) {
          console.error("Error fetching user data:", error);
          setErrorMessage("Failed to load user data.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const authToken = localStorage.getItem("authToken");

      const response = await axiosInstance.put(`/api/profileupdate/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUserData(response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditProfile;
