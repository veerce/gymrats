import React from 'react';
import "../style/homestyles.css";
import BasicHeader from '../components/BasicHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

import {StandardButton, StandardYellowButton, WorkoutLink} from '../components/Buttons.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFireFlameCurved, faTrophy, faMedal} from '@fortawesome/free-solid-svg-icons';

import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = ({user}) => {
  console.log("User data:", user);
  let display_title = `Welcome back, ${user.firstName}`; // needs to be changed
  const percentage = 70; // this will need to be the occupancy of the top saved gym
  const gym_name = "Dodge Fitness Center";
  return (
    <div className="container g-0">
      <BasicHeader title={display_title}/>
      <OccupancyTracker percent={percentage} gym={gym_name}/>
      <GetStarted />
      <RecentWorkouts />
    </div>
  )
};

const OccupancyTracker = ({percent, gym}) => {
  return (
    <div id="occupancy_tracker">
      <div id="progress_bar">
        <CircularProgressbar
          value={percent}
          strokeWidth={8}
          text={`${percent}%`}
          styles={buildStyles({
            textSize: "25px",
            textWeight: "800",
            textFont: "Bariol, sans-serif",
            textColor: "white",
            pathColor: "#BCFF31",
            trailColor: "#131738"
          })}
        />
      </div>
      <div>
        <div id="gym_name_progressbar">
          {gym}
        </div>
        <div id="view_details" onClick={() => console.log("Viewing Details")}>
          View Details
        </div>
      </div>
    </div>
  )
}

const GetStarted = () => {
  return (
    <div className='centered_container padding_top_bottom'>
      <StandardYellowButton text="IT'S GO TIME" />
    </div> 
  )
}

const RecentWorkouts = () => {
  return (
    <div className='width_span_container centered-container'>
      <div id="recent_title" className='left_aligned_text width_span_container'>Recent Workouts</div>
      <div className='centered-container'>
        <WorkoutLink datetime="Oct 29, 2023 2:10 PM" length="20:15 mins" />
        <WorkoutLink datetime="Oct 29, 2023 2:10 PM" length="20:15 mins" />
      </div>
    </div>

  )
}


export default Home;