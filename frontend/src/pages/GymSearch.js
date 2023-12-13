import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const GymSearch = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
      console.log("Switch to Occupancy Home page")
      navigate('/occupancy'); // Navigate to the new screen when Add Gym is clicked
    };

  return (
    <div className="container">
      <BasicHeader title="Your Gyms"/>
      <OccupancySearch onClick={handleBackClick}/>
    </div>
    )
};

export const OccupancySearch = ({onClick}) => {
  // this is occupancy search page



  return (
    <div className='inheret-container'>
        <div className='go_back' onClick={onClick}>&lt; <span className='underline'>Back</span></div>
        <SearchBar placeholder_text="Search for a gym"/>
        <div className='search_results'>
            {/* search results should be added here */}
            <OccupancyQuickView gym_name="Equinox 50th Street" open="True" hours="6:30AM-5PM" occ="20%"/>
            <OccupancyQuickView gym_name="Anytime Fitness" open="False" hours="6:30AM-5PM" occ="0%"/>
        </div>
    </div>


  )

}

export default GymSearch;
