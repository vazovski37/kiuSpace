import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';
import "./addpr.css";
import deleteIMG from "../../images/delete.png";
import Upload_Icon_Logo from "../../images/Upload-Icon-Logo.png"
import Upload_Icon_Logo_Small from "../../images/Upload-Icon-Logo-small.png"

const ImageUpload = ({ setFilesToUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    if (newFiles.length) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteClick = (index) => {
    // Remove the image and its preview at the specified index
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setImagePreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  useEffect(() => {
    setFilesToUpload(selectedFiles);
  }, [selectedFiles, setFilesToUpload]);

  return (
    <div className="wrapper ctn">
      <header>ADD IMAGE</header>
      <form onClick={() => document.querySelector('.file-input').click()}>
        <input
          style={{ display: 'none' }}
          className="file-input"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <img src={Upload_Icon_Logo} className='Upload_Icon_Logo' />
        <p style={{ padding: '0', margin: '0' }}>
          <img src={Upload_Icon_Logo_Small} className='Upload_Icon_Logo_Small' alt="" />
          Browse File to Upload
        </p>
      </form>
      <section className="uploaded-area">
        {imagePreviews.map((preview, index) => (
          <div className="row" key={index}>
            <div className="content">
              <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100px' }} />
              <div className="details">
                <span className="name">{`Image Preview ${index + 1}`}</span>
                <button onClick={() => handleDeleteClick(index)}>
                  <img src={deleteIMG} alt={`Delete ${index + 1}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ImageUpload;
