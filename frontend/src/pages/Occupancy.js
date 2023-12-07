import React from 'react';
import '../style/occupancystyles.css';
import BasicHeader from '../components/BasicHeader';
import {OccupancyQuickView, AddGym} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Occupancy = () => {
  const [searchPage, setSearchPage] = useState(false);
  const handleAddGymClick = () => {
    setSearchPage(prevSearchPage => !prevSearchPage); // Toggle searchPage state
    console.log(`AddGym button clicked. Search page set to ${!searchPage}.`);
  };

  return (
    <div className="container">
      <BasicHeader title="Your Gyms"/>
      {searchPage ? <OccupancySearch /> : <OccupancyHome />}     
      <div id="add_button">
        <AddGym onClick={handleAddGymClick}/>
      </div>
    </div>
    )
};

export const OccupancyHome = () => {
  const navigate = useNavigate();

  // this is the default occupancy home page

  const goToOccupancyPage = () => {
    console.log("test");
    navigate("/occupancydetails", { state: { yourData: 123 } });
  };

  return (
    <div id="saved_gyms">
      <OccupancyQuickView gym_name="Dodge Fitness Center" open="True" hours="6AM-12AM" occ="70%" onClick={goToOccupancyPage}/>
        {/* <Outlet /> */}
      {/* </OccupancyQuickView> */}
      <OccupancyQuickView gym_name="Equinox 50th Street" open="True" hours="6:30AM-5PM" occ="20%" onClick={goToOccupancyPage}/>
      <OccupancyQuickView gym_name="Anytime Fitness" open="False" hours="6:30AM-5PM" occ="0%" onClick={goToOccupancyPage}/>
    </div>
  )
}

export const OccupancySearch = (props) => {
  // this is occupancy search page
  return (
      <div id="white_box">
        <SearchBar placeholder_text="Search for a gym"/>
      </div>
  )

}

export default Occupancy;
