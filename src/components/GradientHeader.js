import React from 'react';
import "../style/gradient.css"

const GradientHeader = ({title}) => {
    return (
        <div id="header">
            <div id="top_bar"></div>
            <div id="gradient">
            <div className="overlay-text">{title}</div>
            </div>
        </div>
    )
};

export default GradientHeader;