import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonalInfo from '../components/personalinfo/PersonalInfo';
import YourPosts from '../components/yourposts/YourPosts';
import ViewHistory from '../components/viewhistory/ViewHistory';
import ProfileImgUpload from '../components/profileimgupload/ProfileImgUpload';
import './page_css/profile.css';

export default function Profile() {
  const [nickname, setNickname] = useState(''); // State to store the nickname

  const url = window.location.href;

  const extractNicknameFromURL = (url) => {
    const parts = url.split('/profile/');
    if (parts.length === 2) {
      const extractedNickname = parts[1];
      return extractedNickname;
    }
    return null;
  };

  useEffect(() => {
    const extractedNickname = extractNicknameFromURL(url);
    if (extractedNickname) {
      setNickname(extractedNickname);
    }
  }, [url]);

  return (
    <div className="c3">
      <h1>Profile</h1>
      <div className="c1">
        <div className="ProfileImgUpload">
          <ProfileImgUpload />
          <div className="underLine"></div>
        </div>
        <div className="c2">
          <div className="personalInfo">
            {/* Render PersonalInfo only when nickname is set */}
            {nickname && <PersonalInfo nickname={nickname} />}
            <YourPosts />
          </div>
          <div className="viewHistory">
            <ViewHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
