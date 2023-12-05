
import React from 'react';
import "../style/workoutdetailsstyle.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import GradientHeader from '../components/GradientHeader';

const WorkoutDetails = ({ username }) => {
  let display_machine = 'Treadmill 3';
  return (
    <div className="workout_details">
      <GradientHeader subheader={display_machine} />
      <TimeElapsed />
      <SpeedPace />
    </div>
  );
};

const TimeElapsed = () => {
  return (
    <div id="time-container">
        <div className="white-container">
        <CenteredContent>
          <div id="text_box_time">12:17</div>
          <div id="text_box_mins">MINS</div>
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

const SpeedPace = () => {
  return (
    <div id="white-container">
      <div id="badges">
        <Badge title="ENTER SPEED" icon="enterspeed"/>
        <Badge title="AVG PACE" icon="pace"/>
      </div>
    </div>
  )
}

const Badge = ({ title, icon }) => {
  let iconElement; // Variable to store the FontAwesomeIcon component
  // Use switch statement for conditional logic
  switch (icon) {
    case 'enterspeed':
      iconElement = <div id="text_box_speed">00:00</div>;
      break;
    case 'pace':
      iconElement = <div id="text_box_pace">7:30</div>;
      break;
  }
}

// const VectorImage = () => {
//   return (
//     <img
//       src={VectorImageSrc}
//       alt="Vector"
//       id="phone_nfc"
//       style={{ width: '35%', height: 'auto', borderRadius: '10px' }}
//     />
//   );
// };

export default WorkoutDetails;
