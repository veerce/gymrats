import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddButton} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Occupancy = ({user}) => {
  const navigate = useNavigate();

  const handleAddGymClick = () => {
    console.log("Switch to GymSearch page")
    navigate('/gym-search'); // Navigate to the new screen when Add Gym is clicked
  };
  
  return (
    <div className="container">
      <BasicHeader title="Your Gyms" />
      <OccupancyHome user={user}/>
      <div id="add_button">
        <AddButton onClick={handleAddGymClick} />
      </div>
    </div>
  );
};

// this is the default occupancy home page
export const OccupancyHome = ({user}) => {
  const navigate = useNavigate();

  const goToOccupancyPage = () => {
    console.log("test");
    navigate("/occupancydetails", { state: { yourData: 123 } });
  };

  const [gymData, setGymData] = useState(null);
  const [occupancyRate, setOccupancyRate] = useState(null);
  const gym_id = 1
  console.log('gym_id', gym_id)

  useEffect(() => {
    if (gym_id) {
      fetch(`http://127.0.0.1:5000/gyms/${gym_id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Gym data received:', data); // Log the data
          console.log('Type of gym data:', typeof data); // Log the data type
          setGymData(data);
        })
        .catch(error => console.error('Error fetching gym data:', error));
  
      // Fetch occupancy rate
      fetch(`http://127.0.0.1:5000/gyms/${gym_id}/occupancy`)
        .then(response => response.json())
        .then(data => {
          console.log('Occupancy rate received:', data); // Log the data
          console.log('Type of occupancy data:', typeof data); // Log the data type
          setOccupancyRate(data.occupancyRate); // Assuming occupancy rate is in data.occupancyRate
        })
        .catch(error => console.error('Error fetching occupancy rate:', error));
    }
  }, [gym_id]);
  

  return (
    <div id="saved_gyms">
      <OccupancyQuickView 
          gym_name={"Dodge"}        
          open={"OPEN"} 
          hours={"6-7"} 
          occ={`${occupancyRate}%`}
          onClick={goToOccupancyPage}
        />
      {/* <Outlet /> */}
    </div>
  );
}

export default Occupancy;
