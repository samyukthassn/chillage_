import React, { useState } from 'react';
import './stylesheets/profile.css';
import pfp from './assets/profile-profile-pic.png';
import { motion } from 'framer-motion';

function Profile() {
  const [activeSection, setActiveSection] = useState(null);
  const [profileImage, setProfileImage] = useState(pfp);
  const [username, setUsername] = useState('John Doe');
  const [bio, setBio] = useState('Frontend developer passionate about UI/UX');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'picture':
        return (
          <motion.div 
            className="profile-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Change Profile Picture</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div className="form-buttons">
              <button onClick={() => setActiveSection(null)}>Cancel</button>
              <button onClick={() => setActiveSection(null)}>Save</button>
            </div>
          </motion.div>
        );
      case 'username':
        return (
          <motion.div 
            className="profile-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Change Username</h3>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter new username"
            />
            <div className="form-buttons">
              <button onClick={() => setActiveSection(null)}>Cancel</button>
              <button onClick={() => setActiveSection(null)}>Save</button>
            </div>
          </motion.div>
        );
      case 'bio':
        return (
          <motion.div 
            className="profile-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Change Bio</h3>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              placeholder="Enter new bio"
              rows="4"
            />
            <div className="form-buttons">
              <button onClick={() => setActiveSection(null)}>Cancel</button>
              <button onClick={() => setActiveSection(null)}>Save</button>
            </div>
          </motion.div>
        );
      case 'password':
        return (
          <motion.div 
            className="profile-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Change Password</h3>
            <input type="password" placeholder="Current password" />
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm new password" />
            <div className="form-buttons">
              <button onClick={() => setActiveSection(null)}>Cancel</button>
              <button onClick={() => setActiveSection(null)}>Save</button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="profile-container">
      <motion.h1 
        className="profile-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Profile
      </motion.h1>
      
      <motion.div 
        className="profile-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="profile-header">
          <motion.div 
            className="profile-picture-container" 
            whileHover={{ scale: 1.05 }}
          >
            <img className="profile-picture" src={profileImage} alt="profile" />
            <div className="profile-picture-overlay" onClick={() => setActiveSection('picture')}>
              <i className="fas fa-camera"></i>
            </div>
          </motion.div>
          
          <div className="profile-info">
            <h2>{username}</h2>
            <p>{bio}</p>
          </div>
        </div>
        
        {renderForm()}
        
        <motion.div className="button-container">
          <motion.button 
            className="profile-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('picture')}
          >
            Change Profile Picture
          </motion.button>
          
          <motion.button 
            className="profile-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('username')}
          >
            Change Username
          </motion.button>
          
          <motion.button 
            className="profile-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('bio')}
          >
            Change Bio
          </motion.button>
          
          <motion.button 
            className="profile-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection('password')}
          >
            Change Password
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;