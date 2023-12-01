import React from 'react';
import '../style/progressbarstyles.css';

const ProgressBar = ({ percentage }) => {
    return (
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    );
  };
  
export default ProgressBar;