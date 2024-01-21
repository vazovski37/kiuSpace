import React, { useState } from 'react';
import './profileImgUpload.css';

export default function ProfileImgUpload() {
  const [selectedImage, setSelectedImage] = useState('https://picsum.photos/900');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleClickButton = () => {
    // Trigger the file input's click event
    document.getElementById('file-upload').click();
  };

  return (
    <div className="profile-upload-container">
      <div className="image-container">
        {selectedImage ? (
          <img src={selectedImage} alt="Profile" className="profile-image" />
        ) : (
          <img src="default-profile-image.jpg" alt="Default Profile" className="profile-image" />
        )}
      </div>
      <div className="upload-button-container">
        <button
          className='uploader-button'
          onClick={handleClickButton}
        >
          Upload New Photo
        </button>
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageChange}
          id="file-upload"
          className="upload-input"
        />
        <p className="upload-info">
          At Least 800x800 px are recommended. JPG or PNG is allowed.
        </p>
      </div>
    </div>
  );
}
