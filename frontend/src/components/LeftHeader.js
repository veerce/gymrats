import React from 'react';
import '../style/header.css';

const LeftHeader = ({title, subheader}) => {
    return (
        <div id="thicker-header">
            <div id="top_bar"></div>
            <div id="navy-background">
                <div className="overlay-text extra-padding-at-top">{title} </div>
                <div className = "subheader-text">{subheader}</div>
            </div>
        </div>
    )
};

export default LeftHeader;

