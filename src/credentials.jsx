import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from './api/axios';
import './credentials.css';

export default function Credentials() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    profilePhoto: '',
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/credentials', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        setUser({
          name: response.data.username,
          email: response.data.email,
          profilePhoto: response.data.profilePic
        });
        setNewEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage({ 
          text: 'Failed to load user data', 
          type: 'error' 
        });
      }
    };
    
    fetchUserData();
    window.scrollTo(0, 0);
  }, []);

  const handleEmailUpdate = async () => {
    if (!newEmail || newEmail === user.email) {
      setMessage({ text: 'Please enter a new email address', type: 'error' });
      return;
    }

    try {
      const response = await axios.put('/credentials/updateEmail', { newEmail }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUser({ ...user, email: newEmail });
      setMessage({ text: 'Email updated successfully', type: 'success' });
      setIsEditingEmail(false);
      window.location.reload();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to update email', 
        type: 'error' 
      });
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ text: 'Please fill all password fields', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      return;
    }

    try {
      await axios.put('/credentials/updatePass', 
        { currentPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setMessage({ text: 'Password updated successfully', type: 'success' });
      setIsEditingPassword(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      window.location.reload();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to update password', 
        type: 'error' 
      });
      console.error('Error updating password:', error);
    }
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.match('image.*')) {
      setMessage({ text: 'Only image files are allowed', type: 'error' });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage({ text: 'File size must be less than 2MB', type: 'error' });
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', file);
    console.log(formData);
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setMessage({ text: '', type: '' });

      const response = await axios.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setUser(prev => ({
        ...prev,
        profilePhoto: response.data.imageUrl
      }));
      
      setMessage({ text: 'Profile picture updated successfully', type: 'success' });
      window.location.reload();
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to upload profile picture', 
        type: 'error' 
      });
      console.error('Error uploading profile picture:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
     
    }
  };

  return (
    <div className="credentials-container">
      <h1 className="credentials-title">Account Settings</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-section">
        <div className="profile-photo-container">
          {
          user.profilePhoto&&
          <img 
            src={user.profilePhoto} 
            alt="Profile" 
            className="profile-photo"
          />
          }
          
          <form className="upload-form">
            <label className="photo-upload-btn">
              {isUploading ? `Uploading... ${uploadProgress}%` : 'Change Photo'}
              <input 
                type="file" 
                name="profilePicture"
                accept="image/*" 
                onChange={handleProfilePhotoUpload}
                disabled={isUploading}
                style={{ display: 'none' }}
              />
            </label>
            {isUploading && (
              <div className="upload-progress">
                <div 
                  className="progress-bar" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </form>
        </div>

        <div className="profile-info">
          <h2>{user.name || 'Loading...'}</h2>
          
          <div className="info-field">
            <label>Email:</label>
            {isEditingEmail ? (
              <div className="edit-field">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="edit-input"
                  disabled={isUploading}
                />
                <div className="form-actions">
                  <button 
                    onClick={handleEmailUpdate} 
                    className="save-btn"
                    disabled={isUploading}
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditingEmail(false)} 
                    className="cancel-btn"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="display-field">
                <span>{user.email || 'Loading...'}</span>
                <button 
                  onClick={() => setIsEditingEmail(true)} 
                  className="edit-btn"
                  disabled={isUploading}
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="info-field">
            <label style={{display:"flex",justifyContent:"space-between"}}>Password: <NavLink to="/forgotpassword" style={{textDecoration: 'none',fontWeight:"normal"}}>forgot password ?</NavLink></label>
            {isEditingPassword ? (
              <div className="edit-password-field">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="edit-input"
                  disabled={isUploading}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="edit-input"
                  disabled={isUploading}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="edit-input"
                  disabled={isUploading}
                />
                <div className="form-actions">
                  <button 
                    onClick={handlePasswordUpdate} 
                    className="save-btn"
                    disabled={isUploading}
                  >
                    Save
                  </button>
                  <button 
                    onClick={() => setIsEditingPassword(false)} 
                    className="cancel-btn"
                    disabled={isUploading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="display-field">
                <span>••••••••</span>
                <button 
                  onClick={() => setIsEditingPassword(true)} 
                  className="edit-btn"
                  disabled={isUploading}
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}