import React from 'react';
import "../style/startstyles.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; 

import { CheckEquipmentButton, StandardButton, StartWorkoutButton } from '../components/Buttons.js';
import BasicHeader from '../components/BasicHeader';
import VectorImageSrc from '../images/phone_NFC.png';

const StartWorkout = ({ username }) => {
  let display_title = 'My Workout';

  return (
    <div className="container start_workout">
      <BasicHeader title={display_title} />
      <Instructions />
      <CheckAvailability />
      <StartThisWorkout />
    </div>
  );
};

const Instructions = () => {
  return (
    <div id="instructions-container">
        <div className="white-container">
        <CenteredContent>
          <VectorImage id="phone_nfc" />
          <div id="text_box_head">To Begin Workout:</div>
          <div id="text_box_1">1. Tap the NFC tag located on the equipment</div>
          <div id="text_box_2">2. Conduct your workout as usual</div>
          </CenteredContent>
        </div>
    </div>
  )
}

const CenteredContent = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  );
};

const VectorImage = () => {
  return (
    <img
      src={VectorImageSrc}
      alt="Vector"
      id="phone_nfc"
      style={{ width: '35%', height: 'auto', borderRadius: '10px' }}
    />
  );
};


const CheckAvailability = ({CheckAvailability}) => {
  return (
    <div id="CheckAvailability" className="button-container">
      <div id="check_availability">
        <CheckEquipmentButton text="Check Equipment Availability"/>
      </div>
    </div>
  );
}

const StartThisWorkout = () => {
  const navigate = useNavigate();

  const handleStartWorkout = () => {
    navigate('/workout-details');
  };

  return (
    <div id="StartThisWorkout" className="button-container">
      <div id="start_this_workout">
        <StartWorkoutButton text="START WORKOUT" onClick={handleStartWorkout} />
      </div>
    </div>
  );
}

export default StartWorkout;