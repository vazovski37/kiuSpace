import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../env';
import ImageUpload from './ImageUpload';
import './addpr.css';

export default function AddProduct() {
  const [productData, setProductData] = useState({
    product_name: '',
    category: '',
    price: '',
    description: '',
  });
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation
    for (const key in productData) {
      if (productData.hasOwnProperty(key) && productData[key] === '') {
        alert(`Please fill in the ${key.replace('_', ' ')}`);
        return;
      }
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/user/products/emptyHost`, {}, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const newProductId = response.data.product.id;

      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('image', file);

        await axios.post(`${API_BASE_URL}/upload/${newProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        });
      }

      await axios.put(`${API_BASE_URL}/user/products/create/${newProductId}`, productData, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Resetting form and redirecting
      setProductData({ product_name: '', category: '', price: '', description: '' });
      window.location.href = '/kiuHost';
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const deleteProduct = async () => {
  //   try {
  //     await axios.delete(`${API_BASE_URL}/user/products/delete/${productId}`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     console.log('Product deleted successfully.');
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

  // const handleDelete = async () => {
  //   if (window.confirm('Are you sure you want to delete this product?')) {
  //     try {
  //       await deleteProduct();
  //       // window.location.href = '/kiuHost';
  //     } catch (error) {
  //       console.error('Error deleting product:', error);
  //     }
  //   }
  // };

  // const deleteProductOnUnload = async () => {
  //   try {
  //     await axios.delete(`${API_BASE_URL}/user/products/delete/${productId}`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     console.log('Product deleted successfully.');
  //   } catch (error) {
  //     console.error('Error deleting product:', error);
  //   }
  // };

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
      // deleteProductOnUnload();
    // };

  //   const cleanupBeforeUnload = () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return cleanupBeforeUnload;
  // }, [productId, authToken]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!isOwner) {
//     return <NotFound />;
//   }

  return (
    <div className='addproduct_main_ctn'>
      <h1>ADD PRODUCT</h1>
      <div className='addproduct_cont'>
      <ImageUpload setFilesToUpload={setFilesToUpload} />
        <div className='ctn'>
          <form onSubmit={handleSubmit}>
            <label>
              Product Name:
              <input
                className='linput'
                type="text"
                name="product_name"
                value={productData.product_name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Category:
              <input
                className='linput'
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                className='linput'
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                className='binput'
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <br />
            <button type="submit">Submit</button>
            {/* <button onClick={handleDelete}>Delete Product</button> */}
          </form>
        </div>
      </div>
    </div>
  );
}
