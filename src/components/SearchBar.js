import React from 'react';
import '../style/searchbarstyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function SearchBar({placeholder_text}) {
    const handleInputChange = (event) => {
        if (event.key === 'Enter') {
          const searchText = event.target.value; // Get the input value
          console.log('Input:', searchText); // Log the input value to the console
        }
    };

    return (
        <div class="searchbox">
            <div class="search-container">
                <div id="magnifying_glass">
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#000000",}} size="1x"/>
                </div>
                <div class="search-input">
                    <input class="input-text" placeholder={placeholder_text} onKeyPress={handleInputChange}/>
                </div>
            </div>
        </div>

    );
}

export default SearchBar;