import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../env';
import axios from 'axios';
import hostImg from '../../images/header_illustration.png';
import helpImg from '../../images/header_illustration_help.png';
import './hostHeaderStyles.css';
import './helpHeaderStyles.css';

import hostLayer from '../../images/hostLayer.png'
import helpLayer from '../../images/helpLayer.png'


export default function KiuHHeader({ header_data }) {
  const [productId, setProductId] = useState(null);

  const imageSrc = header_data.img === 'host' ? hostImg : helpImg;
  const authToken = localStorage.getItem('authToken');
  const hostClass = header_data.for === 'host' ? 'host-style' : '';
  const helpClass = header_data.for !== 'host' ? 'help-style' : '';

  const createProduct = () => {
    
    if (header_data.for === 'help') {
      createEmptyHelpProduct();
    } else if (header_data.for === 'host') {
      createEmptyHostProduct();
    }
  };

  // const createEmptyHelpProduct = async () => {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}/user/products/empty-help`, {}, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     setProductId(response.data.product.id);
  //     window.location.href = `${header_data.href}/${response.data.product.id}`;
  //   } catch (error) {
  //     console.error('Error creating empty help product:', error);
  //     // Handle errors or display error messages to the user
  //   }
  // };

  const createEmptyHostProduct = () =>{
    window.location.href = "/addProduct"
  }
  const createEmptyHelpProduct = () =>{
    window.location.href = "/addPost"
  }

  const createEmptyHostProduct1 = async () => {
    // event.preventDefault();
    console.log('sdc')
    try {
      const response = await axios.post(`${API_BASE_URL}/user/products/emptyHost`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setProductId(response.data.product.id);

      console.log(response.data.product.id)
      
      // Redirect to the new page after product creation
      window.location.href = `${header_data.href}/${response.data.product.id}`;
    } catch (error) {
      console.error('Error creating empty product:', error);
      // Handle errors or display error messages to the user
    }
    // console.log('sdca')

  };

  return (
    <>
      {/* <div className={`header-container ${hostClass}${helpClass}`}>
        <div className={`left-box ${hostClass}${helpClass}`}></div>
        <div className={`text-box ${hostClass}${helpClass}`}>
          <h1>{header_data.h1}</h1>
          <p>{header_data.p}</p>
          <div>
            <button style={{cursor:'pointer'}} onClick={()=>{createEmptyHostProduct()}}>{header_data.buttonText}</button>
          </div>
        </div>
        <div className={`right-box ${hostClass} ${helpClass}`}></div>
      </div>
      <div className={`box ${hostClass} ${helpClass}`}>
        <img className={`image ${hostClass} ${helpClass}`} src={imageSrc} alt="Header Image" />
        <div className={`bottom-box ${hostClass} ${helpClass}`}></div>
      </div> */}

      { header_data.for === 'host' ?
        (
          <div className="kiu-ecosystem">
              <img src={hostLayer} alt="" />
              <button className="add-product-button" onClick={()=>{createProduct()}} >ADD UR PRODUCT</button>
          </div>
        ) : (
          <div className="kiu-ecosystem">
              <img src={helpLayer} alt="" />
              <button className="add-product-button" style={{backgroundColor : "#7CD27F"}} onClick={()=>{createProduct()}} >ADD UR PRODUCT</button>
          </div>
        )
      }

    </>
  );
}
