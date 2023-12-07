import React from 'react';
import "../style/homestyles.css";
import BasicHeader from '../components/BasicHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

import {StandardButton, WorkoutLink} from '../components/Buttons.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFireFlameCurved, faTrophy, faMedal} from '@fortawesome/free-solid-svg-icons';


const Home = ({username}) => {
  let display_title = 'Welcome back, ' + username
  return (
    <div className="container g-0">
      <BasicHeader title={display_title} />
      <GetStarted />
      <Achievements />
      <RecentWorkouts />
    </div>
  )
};

const GetStarted = () => {
  return (
    <div id="get_started">
      <div id="text_box">Let's get started</div>
      <div id="start_workout">
        <StandardButton text="Start a Workout" />
      </div>
    </div> 
  )
}

const Achievements = () => {
  return (
    <div id="achievements">
      <div id="text_box">Achievements</div>
      <div id="badges">
        <Badge title="Gym Streak" icon="fire"/>
        <Badge title="Mile PR" icon="trophy"/>
      </div>
    </div>
  )
}

const Badge = ({ title, icon }) => {
  let iconElement; // Variable to store the FontAwesomeIcon component

  // Use switch statement for conditional logic
  switch (icon) {
    case 'fire':
      iconElement = <FontAwesomeIcon icon={faFireFlameCurved} style={{ color: '#FF8D75' }} size="6x"/>;
      break;
    case 'trophy':
      iconElement = <FontAwesomeIcon icon={faTrophy} style={{ color: '#F78CBD' }} size="6x"/>;
      break;
    default:
      // If no matching icon, set a default value or handle as needed
      iconElement = <FontAwesomeIcon icon={faMedal} style={{color: "#000000",}} size="6x"/>;
      break;
  }

  return (
    <div className="badge">
      <div className="icon">{iconElement}</div>
      <div className="badge_title">{title}</div>
    </div>
  );
};

const RecentWorkouts = () => {
  return (
    <div id="achievements">
      <div id="text_box">Recent Workouts</div>
      <div id="previous_workouts">
        <WorkoutLink datetime="Oct 29, 2023 2:10 PM" length="20:15 mins" />
      </div>
    </div>
  )
}


export default Home;