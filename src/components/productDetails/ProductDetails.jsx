import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';
import './productDetails.css';

export default function ProductDetails() {
  const { productId } = useParams(); // Retrieve productId from URL
  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Default selected image index
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        setProduct(response.data.product); // Assuming your API response contains product details
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className='product-details'>
      {product.images.length > 0 && (
        <div className='grey-bg'>
          <div className="main-image-container">
            <img
              className="main-image"
              src={`${IMG_BASE_URL}/uploads/${product.images[selectedImageIndex].image_url}`}
              alt="Product"
            />
          </div>
        </div>
      )}
      <div className='info'>
        <h2 className='product-name'>{product.product_name}</h2>
        <hr></hr>
        {product.user && (
          <div className="user-info">
            <p className='user-nickname'>{product.user.nickname}</p>
            <p className='user-mail'>{product.user.email}</p>
            <p className='user-mail'>{product.user.kiumail}</p>
            {product.user.facebook_profile_link && (
              <p>
                <a href={product.user.facebook_profile_link} target="_blank" rel="noopener noreferrer">
                  Facebook Profile
                </a>
              </p>
            )}
          </div>
        )}
        <hr></hr>
        <p className='product-data-type'>Category:</p>
        <p className='product-data'>{ product.category}</p>
        <p className='product-data-type' >Price:</p>
        <p className='product-data'>{product.price}</p>
        <p className='product-data-type' >Description:</p>
        <p className='product-data'>{product.description}</p>
        <br />
        <hr></hr>
        <br />
        <div className="thumbnails-container">
          {product.images.map((image, index) => (
            <div className='thumbnails-container-img'>
            <img
              key={image.id}
              className={`thumbnail-image ${selectedImageIndex === index ? 'selected' : ''}`}
              src={`${IMG_BASE_URL}/uploads/${image.image_url}`}
              alt="Product Thumbnail"
              onClick={() => handleThumbnailClick(index)}
            />
            </div>
          ))}
        </div>
      </div>
      {/* Additional product details can be displayed here */}
    </div>
  );
}
