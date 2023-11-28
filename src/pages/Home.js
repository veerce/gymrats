import React from 'react';
import "../style/gradient.css";
import GradientHeader from '../components/GradientHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import StandardButton from '../components/Buttons.js';


const Home = () => {
  return (
    <div className="container">
      <GradientHeader />
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
    </div>
  )
}

const RecentWorkouts = () => {
  return (
    <div id="achievements">
      <div id="text_box">Recent Workouts</div>
    </div>
  )
}



export default Home;