import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddButton} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { faC } from '@fortawesome/free-solid-svg-icons';

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
  console.log(user)
  const gym_id = user.savedGyms;
  console.log('gym_id', gym_id)
  const [favGymData, setGymData] = useState({
    gymId: gym_id,
    gymName: "",
    gymHours: "",
    gymOpen: null,
    gymOccupancy: null,
  });

  useEffect(() => {
    const fetchGymDetails = async () => {

      try {
        const occupancyResponse = await fetch(`http://127.0.0.1:5000/gyms/${gym_id}/occupancy`);
        const occupancyData = await occupancyResponse.json();
        console.log('occupancy data', occupancyData)
        setGymData((prevData) => ({
          ...prevData,
          gymOccupancy: Math.ceil(occupancyData),
        }));

        const gymResponse = await fetch(`http://127.0.0.1:5000/gyms/${gym_id}`);
        const data = await gymResponse.json();
        console.log("setting data", data[0][5]);
        setGymData((prevData) => ({
          ...prevData,
          gymName: data[0][1],
          gymHours: data[0][2],
          gymOpen: data[0][5],
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

  return (
    <div id="saved_gyms">
      {favGymData.gymName && favGymData.gymOccupancy && (
        <OccupancyQuickView 
        gym_name={favGymData.gymName} 
        open={favGymData.gymOpen} 
        hours={favGymData.gymHours} 
        occ = {favGymData.gymOccupancy}
        onClick={goToOccupancyPage}
        />
      )}
    </div>
  );
}

export default Occupancy;
