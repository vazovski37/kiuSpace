import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../env';
import loginIMG from '../images/registration.png';
import './page_css/auth.css';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    password_confirmation: ''
  });

  const [registrationError, setRegistrationError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, formData);
  
      if (response.status === 201) {
        console.log('User registered successfully');
        // Handle successful registration, e.g., redirect to login page
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : 'Unknown error');
      setRegistrationError(true); // Set registration error state to trigger error styles
      // Handle unsuccessful registration
    }
  };
  

  return (
    <div className="login_page">
      <div className="login_page_left_side">
        <img src={loginIMG} alt="Login" />
      </div>
      <div className="login_page_right_side">
        <h1>
          <Link to="/">KIUSPACE</Link>
        </h1>
        <div className="login_form_cont">
          <h2>CREATE AN ACCOUNT</h2>
          <span className={registrationError ? 'span_error-input' : 'display_none'}>
            Error in registration. Please check the details and try again.
          </span>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email:"
                className={registrationError ? 'error-input' : ''}
              />
            </div>
            <div>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Nickname:"
                className={registrationError ? 'error-input' : ''}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password:"
                className={registrationError ? 'error-input' : ''}
              />
            </div>
            <div>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm Password:"
                className={registrationError ? 'error-input' : ''}
              />
            </div>
            <button type="submit">SIGN UP</button>
          </form>
          <p>
            Already Have An Account? | <Link to="/login">Log in here </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
