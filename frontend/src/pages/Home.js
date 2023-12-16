import React from 'react';
import "../style/homestyles.css";
import BasicHeader from '../components/BasicHeader';
import 'bootstrap/dist/css/bootstrap.min.css';

import {StandardButton, StandardYellowButton, WorkoutLink} from '../components/Buttons.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFireFlameCurved, faTrophy, faMedal} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Home = ({ user }) => {
  const gym_id = user.savedGyms;
  console.log(user);
  const [favGymData, setGymData] = useState({
    gymId: gym_id,
    gymName: "",
    gymOccupancy: 70,
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
        console.log("setting data", data[0][1]);
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
      {favGymData.gymName && favGymData.gymOccupancy && (
        <OccupancyTracker percent={favGymData.gymOccupancy} name={favGymData.gymName} />
      )}
      <GetStarted />
      <RecentWorkouts userId={user.userId}/>
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
  const navigate = useNavigate();

  const handleGoTime = () => {
    console.log("handling button go time");
    navigate('/startworkout');
  };

  return (
    <div className='centered_container padding_top_bottom'>
      <StandardYellowButton text="IT'S GO TIME" onClick={handleGoTime} />
    </div>
  );
};


const RecentWorkouts = ({ userId }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchUserWorkouts = async () => {
      try {
        // Fetch recent workouts for the user with a limit of 2
        const response = await fetch(`/workouts/${userId}/2`);
        const data = await response.json();
        console.log("workout data", data);
        if (data && data.length > 0) {
          setWorkouts(data);
        } else {
          console.log('No recent workouts found.');
        }
      } catch (error) {
        console.error('Error fetching user workouts:', error);
      }
    };

    fetchUserWorkouts();
  }, [userId]);

  return (
    <div className='width_span_container centered-container'>
      <div id='recent_title' className='left_aligned_text width_span_container'>
        Recent Workouts
      </div>
      <div className='centered-container'>
        {workouts.map((workout) => (
          <WorkoutLink
            key={workout[0]}
            datetime={`${workout[2]} ${workout[3]}`}
            length={`${workout[3]} mins`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;