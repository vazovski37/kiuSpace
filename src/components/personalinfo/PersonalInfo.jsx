import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../env';
import './personalInfo.css';

const PersonalInfo = ({ nickname }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [viewerInfo, setViewerInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const authToken = localStorage.getItem('authToken');

  const fetchUserData = async (nickname) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/getInfo/${nickname}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUserInfo(response.data.user);
      setViewerInfo(response.data.viewer_nickname);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData(nickname);
  }, [nickname]); // Re-fetch data whenever the nickname changes

  const handleChange = (e) => {
    setViewerInfo({ ...viewerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/user/edit`, viewerInfo, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      await fetchUserData(nickname); // Fetch updated user data after edit using the stored nickname
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const viewerMatchesNickname = () => {
    return userInfo && userInfo.nickname === nickname;
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="personalinfo-cont">
      {userInfo && (
        <div>
          <div className='space_between'>
            <span>Personal Info</span>
            {viewerMatchesNickname() &&
              (!isEditing ? (
                <button onClick={toggleEditMode}>Edit</button>
              ) : (
                <div>
                  <button onClick={handleSubmit}>Save</button>
                  <button onClick={toggleEditMode}>Cancel</button>
                </div>
              ))}
          </div>

          <div className='space_between'>
            {/* Display user details */}
            <div className='pib'>
              <p>NickName</p>
              <span>{userInfo.nickname}</span>
            </div>
            <div className='pib'>
              <p>Email</p>
              <span>{userInfo.email}</span>
            </div>
            <div className='pib'>
              <p>Kiumail</p>
              <span>{userInfo.kiumail}</span>
            </div>
            <div className='pib'>
              <p>Facebook Profile Link</p>
              <a href={userInfo.facebook_profile_link}>
                <span>{userInfo.facebook_profile_link}</span>
              </a>
            </div>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="edit-form">
                <div className="form-group">
                  <label htmlFor="nickname">Nickname:</label>
                  <input
                    type="text"
                    name="nickname"
                    value={viewerInfo.nickname}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    value={viewerInfo.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kiumail">Kiumail:</label>
                  <input
                    type="text"
                    name="kiumail"
                    value={viewerInfo.kiumail}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="facebook_profile_link">Facebook Profile Link:</label>
                  <input
                    type="text"
                    name="facebook_profile_link"
                    value={viewerInfo.facebook_profile_link}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={viewerInfo.password || ''}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </form>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
