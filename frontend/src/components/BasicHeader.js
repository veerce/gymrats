import React from 'react';
import '../style/header.css';

const BasicHeader = ({title, subheader}) => {
    return (
        <div id="header">
            <div id="top_bar"></div>
            <div id="navy-background">
                <div className="overlay-text">
                    {title} 
                    <div className = "subheader-text">{subheader}</div>
                </div>
            </div>
        </div>
    )
};

export default BasicHeader;