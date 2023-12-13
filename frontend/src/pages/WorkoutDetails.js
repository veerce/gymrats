
import React from 'react';
import "../style/workoutdetailsstyle.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import BasicHeader from '../components/BasicHeader';

const WorkoutDetails = ({ username }) => {
  let display_machine = 'My Workout';
  return (
    <div className="workout_details">
      <BasicHeader title={display_machine} />
      <TimeElapsed />
      <SpeedPace />
    </div>
  );
};

const TimeElapsed = () => {
  return (
    <div id="time-container">
        <div className="yellow-container">
        <CenteredContent>
          <div id="text_box_time">12:17</div>
          <div id="text_box_mins">MINS</div>
          </CenteredContent>
        </div>
    </div>
  )
}

const SpeedPace = () => {
  return (
    <div id="white-orange-container">
      <CenteredContent>
      <div id="badges">
        <Badge title="ENTER SPEED" icon="enterspeed"/>
        <Badge title="AVG PACE" icon="pace"/>
      </div>
      </CenteredContent>
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

const Badge = ({ title, icon }) => {
  let iconElement;
  switch (icon) {
    case 'enterspeed':
      iconElement = <div id="text_box_speed">00:00</div>;
      break;
    case 'pace':
      iconElement = <div id="text_box_pace">7:30</div>;
      break;
  }
}



export default WorkoutDetails;
