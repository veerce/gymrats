import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddGym, ViewEquipmentDetails} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';
// import {CurrentOccupancy} from '../components/Buttons';
import {CurrentOccupancy, ViewOccupancyButton} from '../components/Cards';
import {StartWorkoutButton} from '../components/Buttons';

import DailyCapacityTrends from '../components/BarChart';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import EquipmentAll from './EquipmentAll';

const OccupancyDetails = ({user}) => {
    const navigate = useNavigate();

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
        console.log("fetching occupancy data...")
        const occupancyResponse = await fetch(`http://127.0.0.1:5000/gyms/${gym_id}/occupancy`);
        const occupancyData = await occupancyResponse.json();
        setGymData((prevData) => ({
          ...prevData,
          gymOccupancy: Math.ceil(occupancyData),
        }));
        console.log("fetching gym data...")
        const gymResponse = await fetch(`http://127.0.0.1:5000/gyms/${gym_id}`);
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

    const data = {
        labels: ['6a', ' ', ' ', '9a', ' ', ' ', '12p', ' ', ' ', '3p', ' ', ' ', '6p',' ',' ', '9p',' ',' ', '12a'],
        datasets: [
          {
            label: 'Daily Capacity',
            data: [65, 60, 62, 65, 40, 60, 59, 70, 76, 80, 90, 87, 81, 86, 87, 90, 85, 56, 40], 
            backgroundColor: [
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(188, 255, 49, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)', 
            ],
            borderColor: [
              'rgba(194, 172, 255, 1)', 
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(188, 255, 49, 1)', 
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
              'rgba(194, 172, 255, 1)',
            ],
            borderWidth: 0,
          },
        ],
      };
    const handleEquipmentClick = () => {
        console.log(`Equipment clicked`);
        navigate('/equipmentall');
    };
    const location = useLocation();
    const yourData = location.state;
    // console.log("State: ", yourData);
    return (
        <div className="container">
          <BasicHeader title="Dodge Fitness Center" subheader="OPEN 6AM - 12AM"/>  
          <CurrentOccupancy occ={favGymData.gymOccupancy} /> 
          <ViewEquipmentDetails text="View Occupancy by Equipment" onClick={handleEquipmentClick}/>
          <div>
            <DailyCapacityTrends chartData={data} />
          </div>
        </div>
        
    )
};

export default OccupancyDetails;
