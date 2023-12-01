import React from 'react';
import '../style/occupancystyles.css';
import GradientHeader from '../components/GradientHeader';
import {OccupancyQuickView, AddGym} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';
import {CurrentOccupancy} from '../components/Buttons';
import {ViewOccupancyButton, AddNote} from '../components/Buttons';
import DailyCapacityTrends from '../components/BarChart';

const OccupancyDetails = () => {

    const data = {
        labels: ['6a', '12p', '3p', '6p', '12a'],
        datasets: [
          {
            label: 'Daily Capacity',
            data: [65, 59, 80, 81, 56, 55, 40], 
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)', 
              'rgba(75, 192, 192, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(255,165,0, 0.2)', 
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)', 
              'rgba(75, 192, 192, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)', 
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
    const handleEquipmentCLick = () => {
        console.log(`Equipment clicked`);
    };
    const location = useLocation();
    const yourData = location.state;
    console.log("State: ", yourData);
    return (
        <div className="container">
          <GradientHeader title="Dodge Fitness Center" subheader="OPEN 6AM - 12AM"/>  
          <CurrentOccupancy occ="70" />
          <ViewOccupancyButton title="View Occupancy by Equipment" onClick={handleEquipmentCLick}/>
          <div>
            <DailyCapacityTrends chartData={data} />
          </div>
        </div>
    )
};

export default OccupancyDetails;
