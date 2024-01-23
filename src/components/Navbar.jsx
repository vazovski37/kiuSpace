import React, { useState, useEffect, useRef  } from 'react';
import { Link } from 'react-router-dom';
import Search from './search/Search.jsx';
import './Navbar2.css'; // Import CSS for styling
import person from '../images/person.png';
import add from '../images/add.png';
import stack from '../images/stack.png';
import stack_help_unclicked from '../images/stack-help-unclicked.png';
import stack_host_unclicked from '../images/stack-host-unclicked.png';
import loginbtn from '../images/loginbtn.png'

export default function Navbar() {
  const [isStackClicked, setIsStackClicked] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nickname');
    // Redirect to the homepage or login page
    window.location.href = '/';
    // Add any additional logout logic here
  };

  const nickName = localStorage.getItem('nickname');
  const isLoggedIn = !!nickName;
  const currentUrl = window.location.href;

  const handleStackClick = () => {
    setIsStackClicked(!isStackClicked);
  };

  const stackRef = useRef(null);
  const b1Ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stackRef.current &&
        !stackRef.current.contains(event.target) &&
        b1Ref.current &&
        !b1Ref.current.contains(event.target)
      ) {
        setIsStackClicked(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isKiuHost = currentUrl.endsWith('/kiuHost');
  const isKiuHelp = currentUrl.endsWith('/kiuHelp');

  return (
    <header>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <h1 className="first-heading">KIU</h1>
          <h1 className="second-heading">SPACE</h1>
        </Link>

        <ul className="navbar-links">
          {isLoggedIn ? (
            <>
              <li style={{display:'flex', flexDirection: 'row', gap:'27px'}} >
                <li className={ `add ${isKiuHelp ? 'add-g' : 'add-b'}`}>
                  <Link>
                    <img src={add} alt="" />
                    <p>Add</p>
                  </Link>
                </li>

                <li className="profile">
                  <Link to={`/profile/${nickName}`}>
                    <img src={person} />
                  </Link>
                </li>
              </li>

              {!currentUrl.endsWith('/') ? (
                <li className={isStackClicked ? (isKiuHost ? 'stack-g' : 'stack-b') : 'stack'} ref={stackRef}>
                  <Link onClick={handleStackClick}>
                    <img
                      src={
                        isStackClicked
                          ? stack
                          : isKiuHost
                          ? stack_host_unclicked
                          : stack_help_unclicked
                      }
                    />
                  </Link>
                </li>
              ) : null}

              {isStackClicked && (
                <li className={`b1 ${isKiuHost ? 'sb' : 'sg'}`} ref={b1Ref}>
                  <div className="b1-content">
                    <Link to="/" onClick={handleStackClick} className='u1' >
                      <h1 className="first-heading">KIU</h1>
                      <h1 className="second-heading">SPACE</h1>
                    </Link>
                    <div className="d-f-r">
                      <Link to="/kiuHelp" onClick={handleStackClick} className={`${isKiuHelp ? 'current-page' : ''}`}>
                        <h1 className="f-h">KIU</h1>
                        <h1 className="s-h-help">HELP</h1>
                      </Link>
                      <Link to="/kiuHost" onClick={handleStackClick} className={` ${isKiuHost ? 'current-page' : ''}`}>
                        <h1 className="f-h">KIU</h1>
                        <h1 className="s-h-host">HOST</h1>
                      </Link>
                    </div>
                  </div>
                </li>
              )}
            </>
          ) : (
            <>
              <li className="login-btn">
                <Link to="/login">
                  <img src={loginbtn} />
                  <p>log in </p>
                </Link>
              </li>


            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
