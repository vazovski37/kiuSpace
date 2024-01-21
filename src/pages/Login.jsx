import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../env';
import loginIMG from '../images/login.png';
import './page_css/auth.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, formData);

      if (response.status === 200) {
        localStorage.removeItem('authToken');
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('nickname', response.data.user.nickname);
        // Handle successful login
        console.log(response)
        setLoginError(false); // Reset login error state
        window.location.href = '/'
      } else if (response.status === 422) {
        setLoginError(true); // Set login error state to trigger error styles
        // Handle unsuccessful login
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError(true); // Set login error state to trigger error styles
      // Handle unsuccessful login
      console.error('Login failed');
      
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
          <h2>Login</h2>
          <span className={loginError ? 'span_error-input' : 'display_none'}>incorrect nickname or password</span>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Nickname:"
                className={loginError ? 'error-input' : ''}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password:"
                className={loginError ? 'error-input' : ''}
              />
            </div>
            <button type="submit">LOG IN</button>
          </form>
          <p>
            Don’t have an account? | <Link to="/registration">Sign up here </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
