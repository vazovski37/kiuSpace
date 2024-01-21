import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../env';
import ImageUpload from './ImageUpload';
import NotFound from '../../pages/NotFound';
import './addpr.css';

export default function EditProduct() {
//   const navigate = useNavigate(); // Access navigate object for redirection
  const [productId, setProductId] = useState(null);
  const [authToken, setAuthToken] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);

//     const checkOwnership = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/user/products/checkOwnership/${productId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setIsOwner(response.data.owner);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error checking ownership:', error);
//         window.location.href = '/not-found';
//         setLoading(false);
//       }
//     };

//     checkOwnership();
  }, []);

  const [productData, setProductData] = useState({
    product_name: '',
    category: '',
    price: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in productData) {
      if (productData.hasOwnProperty(key) && productData[key] === '') {
        alert(`Please fill in the ${key.replace('_', ' ')}`);
        return;
      }
    }
    try {
      // Create a new empty product
      const response = await axios.post(`${API_BASE_URL}/user/products/emptyHost`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      // Set the productId based on the response
      setProductId(response.data.product.id);
  
      // Log the productId to the console
      console.log(response.data.product.id);
  
      // Check if any required fields are empty
  
      // Update the product with the provided data
      const updateResponse = await axios.put(
        `${API_BASE_URL}/user/products/create/${productId}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
  
      // Clear the form data
      setProductData({
        product_name: '',
        category: '',
        price: '',
        description: '',
      });
  
      // Redirect to the desired page
      window.location.href = '/kiuHost';
  
    } catch (error) {
      console.error('Error creating or updating product:', error);
      // Handle errors or display error messages to the user
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
        <ImageUpload />
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
