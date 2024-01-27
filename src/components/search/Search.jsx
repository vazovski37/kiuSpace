import React, { useState, useEffect, useRef } from 'react';
import './Search.css'; // Import your CSS file for Search component styles
import searchImg from '../../images/search.png';
import { API_BASE_URL } from '../../env';
import axios from 'axios';

export default function Search({ handleMobileSearch, setToggleSearch, toggleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('kiuHost');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRRef = useRef(null);

  useEffect(() => {
    // Add event listener to handle clicks outside the search component
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Function to handle clicks outside the search component
  const handleClickOutside = (event) => {
    if (searchRRef.current && !searchRRef.current.contains(event.target)) {
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    // Call handleSearch when searchTerm/selectedSection changes
    handleSearch();
  }, [searchTerm, selectedSection]);

  const handleSearch = () => {
    if (selectedSection === 'kiuHost') {
      axios.get(`${API_BASE_URL}/search/kiuhost?searchTerm=${searchTerm}`)
        .then(response => {
          setSearchResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setSearchResults([]);
        });
    }else if (selectedSection === 'kiuHelp') {
        axios.get(`${API_BASE_URL}/search/kiuhelp?searchTerm=${searchTerm}`)
          .then(response => {
            setSearchResults(response.data.results);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setSearchResults([]);
          });
    }else if (selectedSection === 'account') {
      axios.get(`${API_BASE_URL}/search/account?searchTerm=${searchTerm}`)
        .then(response => {
          setSearchResults(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setSearchResults([]);
        });
    }
  };

  const handleButtonClick = (section) => {
    setSelectedSection(section);
    handleSearch();
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSearchResults(true); // Show search results when input changes
  };

  return (

    <>
    <div className='search-desktop' >
      <div className='searchBar'>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter search term..."
        />
        <img
          src={searchImg}
          className='searchButton'
          onClick={handleSearch}
          alt="Search"
        />
      </div>

      {showSearchResults && ( // Conditionally render search results based on showSearchResults state
        <div className='searchR' ref={searchRRef}>
            <div className="sectionButtonsContainer">
                <button
                    className={selectedSection === 'kiuHost' ? 'selected' : ''}
                    onClick={() => handleButtonClick('kiuHost')}
                >
                    KiuHost
                </button>
                <button
                    className={selectedSection === 'kiuHelp' ? 'selected' : ''}
                    onClick={() => handleButtonClick('kiuHelp')}
                >
                    KiuHelp
                </button>
                <button
                    className={selectedSection === 'account' ? 'selected' : ''}
                    onClick={() => handleButtonClick('account')}
                >
                    Account
                </button>
            </div>
            <div>
            <h2>Results for {selectedSection}</h2>
            <ul>
              {searchResults && searchResults.map((result) => (
                <li key={result.id}     onClick={() => {
                  if (selectedSection === 'kiuHost') {
                    window.location.href = `/products/${result.id}`;
                  } else if (selectedSection === 'account') {
                    window.location.href = `/profile/${result.nickname}`;
                  }
                }} style={{listStyleType: "none", marginTop: "5px", borderBottom: "2px solid black",  cursor: "pointer"}}>
                {result.product_name ? result.product_name : result.nickname}
              </li>
              
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    <div className='search-mobile' >
    <div className='searchBar' style={{ width: toggleSearch ? '100%' : '40px' }}>
        {
          toggleSearch ? ( 
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              placeholder="Enter search term..."
            />
          ) : null
        }

        <img
          src={searchImg}
          className='searchButton'
          onClick={handleMobileSearch}
          alt="Search"
        />
    </div>


      {showSearchResults && ( // Conditionally render search results based on showSearchResults state
        <div className='searchR' ref={searchRRef}>
            <div className="sectionButtonsContainer">
                <button
                    className={selectedSection === 'kiuHost' ? 'selected' : ''}
                    onClick={() => handleButtonClick('kiuHost')}
                >
                    KiuHost
                </button>
                <button
                    className={selectedSection === 'kiuHelp' ? 'selected' : ''}
                    onClick={() => handleButtonClick('kiuHelp')}
                >
                    KiuHelp
                </button>
                <button
                    className={selectedSection === 'account' ? 'selected' : ''}
                    onClick={() => handleButtonClick('account')}
                >
                    Account
                </button>
            </div>
            <div>
            <h2>Results for {selectedSection}</h2>
            <ul>
              {searchResults && searchResults.map((result) => (
                <li key={result.id}     onClick={() => {
                  if (selectedSection === 'kiuHost') {
                    window.location.href = `/products/${result.id}`;
                  } else if (selectedSection === 'account') {
                    window.location.href = `/profile/${result.nickname}`;
                  }
                }} style={{listStyleType: "none", marginTop: "5px", borderBottom: "2px solid black",  cursor: "pointer"}}>
                {result.product_name ? result.product_name : result.nickname}
              </li>
              
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
    </>

  );
}
