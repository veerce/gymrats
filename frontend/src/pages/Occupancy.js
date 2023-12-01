import React from 'react';
import '../style/occupancystyles.css';
import GradientHeader from '../components/GradientHeader';
import {OccupancyQuickView, AddGym} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';

const Occupancy = () => {
  const [searchPage, setSearchPage] = useState(false);
  const handleAddGymClick = () => {
    setSearchPage(prevSearchPage => !prevSearchPage); // Toggle searchPage state
    console.log(`AddGym button clicked. Search page set to ${!searchPage}.`);
  };

  return (
    <div className="container">
      <GradientHeader title="Your Gyms"/>
      {searchPage ? <OccupancySearch /> : <OccupancyHome />}     
      <div id="add_button">
        <AddGym onClick={handleAddGymClick}/>
      </div>
    </div>
    )
};

export const OccupancyHome = () => {
  // this is the default occupancy home page
  return (
    <div id="saved_gyms">
      <OccupancyQuickView gym_name="Dodge Fitness Center" open="True" hours="6AM-12AM" occ="70%"/>
      <OccupancyQuickView gym_name="Equinox 50th Street" open="True" hours="6:30AM-5PM" occ="20%"/>
      <OccupancyQuickView gym_name="Anytime Fitness" open="False" hours="6:30AM-5PM" occ="0%"/>
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
