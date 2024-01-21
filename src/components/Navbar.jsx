import React from 'react';
import { Link } from 'react-router-dom';
import Search from './search/Search.jsx';
import './Navbar.css'; // Import CSS for styling

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nickname');
    // Redirect to the homepage or login page
    window.location.href = '/';
    // Add any additional logout logic here
  };

  const nickName = localStorage.getItem('nickname');
  const isLoggedIn = !!nickName;

  return (
    <header>
      <nav className="navbar">
        <Link to='/' className="navbar-logo">
          <h1 className="first-heading">KIU</h1>
          <h1 className="second-heading">SPACE</h1>
        </Link>

        <ul className="navbar-links">
          <li>
            <Search />
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to={`/profile/${nickName}`} className="navbar-link">
                  Account
                </Link>
              </li>
              <li>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/registration" className="navbar-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
