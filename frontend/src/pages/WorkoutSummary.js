import { useLocation, useParams } from 'react-router-dom';
import React, { useState }  from 'react';
import "../style/workoutsummarystyles.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TreadmillIcon from '../images/treadmill-icon.png';
import SmithMachineIcon from '../images/smith-machine.png';
import LegPressIcon from '../images/leg-press.png';
import { CheckEquipmentButton, StandardButton, StartWorkoutButton } from '../components/Buttons.js';
import { useNavigate } from 'react-router-dom'; 

const WorkoutSummary = () => {
  // Use the location hook to access query parameters
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const { workoutId } = useParams();

  // Get datetime and length from the query parameters
  const datetime = params.get('datetime');
  const length = params.get('length');
    
  return (
    <div className="container g-0">
      <LeftHeader title={"Workout Summary"} />
      <div id='date_and_time' className='left_aligned_text width_span_container padding_top_bottom'>
        {datetime}
      </div>
    </div>
  );
};



const LeftHeader = ({title, subheader}) => {
    return (
        <div id="header">
            <div id="top_bar"></div>
            <div id="navy-background">
                <div className="left_aligned_text width_span_container overlay-text">
                    {title} 
                    <div className = "subheader-text">{subheader}</div>
                </div>
            </div>
        </div>
    )
};

export default WorkoutSummary;

