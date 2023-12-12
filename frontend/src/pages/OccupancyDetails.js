import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddGym} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';
import {CurrentOccupancy} from '../components/Buttons';
import {ViewOccupancyButton, AddNote} from '../components/Buttons';
import DailyCapacityTrends from '../components/BarChart';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import EquipmentAll from './EquipmentAll';

const OccupancyDetails = () => {
    const navigate = useNavigate();

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
          {/* <div style={{ width: '200px', height: '200px' }}>
            <CircularProgressbar
              value={70}
              strokeWidth={5}
              text={'70%'}
              styles={buildStyles({
              textSize: "20px",
              textWeight: "50",
              textFont: "Bariol, sans-serif",
              textColor: "white",
              pathColor: "#BCFF31",
              trailColor: "#131738"
              })}
            />
          </div> */}
          
          <CurrentOccupancy occ="70" /> 
          <ViewOccupancyButton title="View Occupancy by Equipment" onClick={handleEquipmentClick}/>
          <div>
            <DailyCapacityTrends chartData={data} />
          </div>
          {/* <Routes>
            <Route path="equipmentall" element={<EquipmentAll />} />
          </Routes> */}
        </div>
        
    )
};

export default OccupancyDetails;
