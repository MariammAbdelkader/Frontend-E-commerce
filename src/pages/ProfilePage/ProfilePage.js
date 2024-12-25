// ProfilePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfilePage.css';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/profile',{
            withCredentials: true,
        });
        setUserData(response.data); // Assuming response.data has the user data
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile data.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setUpdatedUserData(userData);
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:3000/profile', updatedUserData);
      setUserData(updatedUserData); // Update user data in state
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile.');
    }
  };

  const handleChange = (e) => {
    setUpdatedUserData({ ...updatedUserData, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      {error && <div className="error">{error}</div>}
      <h1>Profile</h1>

      <div className="profile-info">
        <div>
          <strong>First Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="firstname"
              value={updatedUserData.firstname}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.firstname}</p>
          )}
        </div>

        <div>
          <strong>Last Name:</strong>
          {isEditing ? (
            <input
              type="text"
              name="lastname"
              value={updatedUserData.lastname}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.lastname}</p>
          )}
        </div>

        <div>
          <strong>Email:</strong>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={updatedUserData.email}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>

        <div>
          <strong>Phone:</strong>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={updatedUserData.phone}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>

        <div>
          <strong>Address:</strong>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={updatedUserData.address}
              onChange={handleChange}
            />
          ) : (
            <p>{userData.address}</p>
          )}
        </div>

        <div>
          {isEditing ? (
            <button onClick={handleSave}>Save Changes</button>
          ) : (
            <button onClick={handleEdit}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
