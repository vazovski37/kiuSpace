import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Search from './search/Search.jsx';
import './Navbar2.css'; // Import CSS for styling
import person from '../images/person.png';
import add from '../images/add.png';
import stack from '../images/stack.png';
import stack_help_unclicked from '../images/stack-help-unclicked.png';
import stack_host_unclicked from '../images/stack-host-unclicked.png';
import loginbtn from '../images/loginbtn.png';
import burgerMenu from '../images/burgerMenu.png';
import BottomBar from './BottomBar.jsx';
import exitImg from '../images/exit.png'

export default function Navbar() {
  const [isStackClicked, setIsStackClicked] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);

  const handleMobileSearch = (event) => {
    event.preventDefault();
    setToggleSearch(!toggleSearch);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nickname');
    window.location.href = '/'; // Redirect to the homepage or login page
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
    <>
      <header>
        <nav className="navbar">
          <Link to="/" className="navbar-logo">
            <h1 className="first-heading">KIU</h1>
            <h1 className="second-heading">SPACE</h1>
          </Link>
          <Search
            handleMobileSearch={handleMobileSearch}
            setToggleSearch={setToggleSearch}
            toggleSearch={toggleSearch}
          />
          <ul className="navbar-links">
            {isLoggedIn ? (
              <>
                <li className="d-f-r-g-27">
                  <li className={`add ${isKiuHelp ? 'add-g' : isKiuHost ? 'add-b' : 'd-n'}`}>
                    <Link to={isKiuHost ? "/addProduct" : "/addPost"}>
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
      <div className='top-bar' >
        {!toggleSearch ? (
          <Link to="/" className="navbar-logo">
            <h1 className="first-heading">KIU</h1>
            <h1 className="second-heading">SPACE</h1>
          </Link>
        ) : null}
        <div className='t-r-side' style={{ width: toggleSearch ? '100%' : '80px' }}>
          <Search
            handleMobileSearch={handleMobileSearch}
            setToggleSearch={setToggleSearch}
            toggleSearch={toggleSearch}
          />
          <div className='burgerMenu'>
            <img src={burgerMenu} onClick={() => setToggleMenu(!toggleMenu)} />
            {toggleMenu ? (
              <div className='toggledMenu'>
                <div className='toggleMenuExitImg' onClick={() => setToggleMenu(!toggleMenu)}>
                  <img src={exitImg} alt="" />
                </div>

                <div>
                  <p>menu</p>
                  <ul>
                  <li>
                    <Link to='/' >
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link to='/' >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to='/' >
                    Safety landing
                    </Link>
                  </li>
                  <li>
                    <Link to='/' >
                    Terms and Conditions
                    </Link>
                  </li>
                  </ul>
                </div>
                <br />
                <hr />
                <div>
                  <Link to='https://www.facebook.com/'>Facebook</Link>
                  <Link to='https://www.instagram.com/'>Instagram</Link>
                </div>            

              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className='bottom-bar'>
        <BottomBar />
      </div>
    </>
  );
}
