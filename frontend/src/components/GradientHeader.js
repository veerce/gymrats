import React from 'react';
import "../style/gradient.css"

const GradientHeader = ({title, subheader}) => {
    return (
        <div id="header">
            <div id="top_bar"></div>
            <div id="gradient">
                <div className="overlay-text">
                    {title} 
                    <div className = "subheader-text">{subheader}</div>
                </div>
            </div>
        </div>
    )
};

export default GradientHeader;

