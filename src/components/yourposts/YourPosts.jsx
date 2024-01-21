import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, IMG_BASE_URL } from '../../env';
import './yourPosts.css';

const YourPosts = () => {
  const [products, setProducts] = useState([]);
  
  const extractNicknameFromURL = (url) => {
    const parts = url.split('/profile/');
    if (parts.length === 2) {
      const nickname = parts[1];
      return nickname;
    }
    return null;
  };
  
  const currentURL = window.location.href;
  const nickName = extractNicknameFromURL(currentURL);

  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/myProducts/${nickName}`);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    if (nickName) {
      fetchUserProducts();
    }
  }, [nickName]);

  return (
    <div>
      <h2>Your Posts</h2>
      {products.map((product) => (
        <div key={product.product.id} style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
              <div>
                {
                product.images[0]?.image_url ? (
                  <img
                    src={`${IMG_BASE_URL}/uploads/${product.images[0].image_url}`}
                    alt="Product"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div>No Image Available</div>
                )
              }
                
              </div>
              <div style={{ marginLeft: '10px' }}>
                <div>Description: {product.product.description}</div>
                <div>Price: {product.product.price}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourPosts;
