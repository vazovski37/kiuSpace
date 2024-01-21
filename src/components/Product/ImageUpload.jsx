import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';
import { useParams } from 'react-router-dom';
import "./addpr.css"
import deleteIMG from "../../images/delete.png" 

const ImageUpload = () => {
  const { productId } = useParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);

  const token = localStorage.getItem('authToken');

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/images/${productId}`);
      const imagesData = response.data.images;
  
      const imagesArray = imagesData.map((image, index) => ({
        imagetid: index + 1, // Assuming you want to start the index from 1
        id: image.id,
        url: `${IMG_BASE_URL}/uploads/${image.image_url}`,
      }));
  
      setImages(imagesArray);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setSelectedImagePreview(reader.result);

        const formData = new FormData();
        formData.append('image', file);

        try {
          await axios.post(`${API_BASE_URL}/upload/${productId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });

          // After successful upload, fetch images again to refresh the list
          fetchImages();
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImagePreview(null);
    }
  };

  const handleDeleteImage = async (productId, imageId) => {
    try {
      await axios.delete(`${API_BASE_URL}/images/${productId}/${imageId}`);

      // After successful deletion, fetch images again to refresh the list
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="wrapper ctn">
      <header>ADD IMAGE</header>
      <form>
        <input style={{display: 'none'}} className="file-input" type="file" onChange={handleFileChange} />
        <p style={{padding : '0', margin : '0'}} onClick={() => document.querySelector('.file-input').click()} >Browse File to Upload</p>
      </form>
      <section className="progress-area">
        {/* To display upload progress */}
      </section>
      <section className="uploaded-area">
        {selectedImagePreview && (
          <div className="row">
            <div className="content">
              <div className="details">
                <span className="name">Selected Image Preview</span>
              </div>
              <img src={selectedImagePreview} alt="Selected" style={{ width: '100px' }} />
            </div>
          </div>
        )}
        {Array.isArray(images) && images.length > 0 ? (
          images.map((image) => (
            <div className="row">
              <div className="content">
                  <div>
                    <img src={image.url} alt={`Image ${image.id}`} style={{ width: '46px', height: '69px' }} />
                    <div className="details">
                      <span className="name">{`Image ${image.imagetid}`}</span>
                    </div>
                  </div>
                  <img src={deleteIMG} alt="" onClick={() => handleDeleteImage(productId, image.id)} />
              </div>
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </section>
    </div>
  );
};
export default ImageUpload;
