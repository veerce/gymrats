import React from 'react';
import "../style/startstyles.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { StandardButton, OrangeButton } from '../components/Buttons.js';
import GradientHeader from '../components/GradientHeader';
import VectorImageSrc from '../images/phone_NFC.png';

const StartWorkout = ({ username }) => {
  let display_title = 'My Workout';

  return (
    <div className="container start_workout">
      <GradientHeader title={display_title} />
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
        <StandardButton text="Check Equipment Availability"/>
      </div>
    </div>
  );
}

const StartThisWorkout = ({StartThisWorkout}) => {
  return (
    <div id="StartThisWorkout" className="button-container">
      <div id="start_this_workout">
        <OrangeButton text="START WORKOUT"/>
      </div>
    </div>
  );
}

export default StartWorkout;