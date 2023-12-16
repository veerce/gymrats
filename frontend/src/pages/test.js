import React from 'react';
import "../style/homestyles.css";
import BasicHeader from '../components/BasicHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

import {StandardButton, StandardYellowButton, WorkoutLink} from '../components/Buttons.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFireFlameCurved, faTrophy, faMedal} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = ({ user }) => {
    const gym_id = user.savedGyms[0];
    const [favGymData, setGymData] = useState({
      gymId: gym_id,
      gymName: "",
      gymOccupancy: null,
    });
  
    useEffect(() => {
      const fetchGymDetails = async () => {
        try {
          const occupancyResponse = await fetch(`/gyms/${gym_id}/occupancy`);
          const occupancyData = await occupancyResponse.json();
          setGymData((prevData) => ({
            ...prevData,
            gymOccupancy: Math.ceil(occupancyData),
          }));
  
          const gymResponse = await fetch(`/gyms/${gym_id}`);
          const data = await gymResponse.json();
          setGymData((prevData) => ({
            ...prevData,
            gymName: data[0][1],
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      if (gym_id !== undefined) {
        fetchGymDetails();
      }
    }, [gym_id]);
  
    console.log("Gym data:", favGymData.gymId, favGymData.gymOccupancy);
    let display_title = `Welcome back, ${user.firstName}`;
  
    return (
      <div className="container g-0">
        <BasicHeader title={display_title} />
        {/* Conditional rendering based on data availability */}
        {favGymData.gymName && favGymData.gymOccupancy && (
          <OccupancyTracker percent={favGymData.gymOccupancy} name={favGymData.gymName} />
        )}
        <GetStarted />
        <RecentWorkouts />
      </div>
    );
  };
  

const OccupancyTracker = ({percent, name}) => {

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
          {name}
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