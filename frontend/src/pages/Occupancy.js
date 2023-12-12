import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddButton} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Occupancy = () => {
  const navigate = useNavigate();

  const handleAddGymClick = () => {
    console.log("Switch to GymSearch page")
    navigate('/gym-search'); // Navigate to the new screen when Add Gym is clicked
  };
  
  return (
    <div className="container">
      <BasicHeader title="Your Gyms" />
      <OccupancyHome />
      <div id="add_button">
        <AddButton onClick={handleAddGymClick} />
      </div>
    </div>
  );
};

export const OccupancyHome = () => {
  const navigate = useNavigate();

  // this is the default occupancy home page

  const goToOccupancyPage = () => {
    console.log("test");
    navigate("./pages/GymSearch", { state: { yourData: 123 } });
  };

  return (
    <div id="saved_gyms">
      <OccupancyQuickView gym_name="Dodge Fitness Center" open="True" hours="6AM-12AM" occ="70%" onClick={goToOccupancyPage}/>
        {/* <Outlet /> */}
    </div>
  )
}

export default Occupancy;
