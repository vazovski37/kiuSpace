import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';
import "./addpr.css";
import deleteIMG from "../../images/delete.png";

const ImageUpload = ({ setFilesToUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);


  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files); // Convert FileList to Array
    if (newFiles.length) {
      setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // Create image previews for new files
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prevPreviews => [...prevPreviews, e.target.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  useEffect(() => {
    setFilesToUpload(selectedFiles);
  }, [selectedFiles, setFilesToUpload]);

  return (
    <div className="wrapper ctn">
      <header>ADD IMAGE</header>
      <form>
        <input style={{display: 'none'}} className="file-input" type="file" multiple onChange={handleFileChange} />
        <p style={{padding: '0', margin: '0'}} onClick={() => document.querySelector('.file-input').click()}>
          Browse File to Upload
        </p>
      </form>
      <section className="uploaded-area">
      {imagePreviews.map((preview, index) => (
          <div className="row" key={index}>
            <div className="content">
              <div className="details">
                <span className="name">{`Image Preview ${index + 1}`}</span>
              </div>
              <img src={preview} alt={`Preview ${index + 1}`} style={{ width: '100px' }} />
            </div>
          </div>
        ))}
        {/* Displaying existing images (if needed) */}

      </section>
    </div>
  );
};

export default ImageUpload;
