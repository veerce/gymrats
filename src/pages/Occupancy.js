import React from 'react';
import '../style/occupancystyles.css';
import GradientHeader from '../components/GradientHeader';
import {OccupancyQuickView} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Occupancy = (props) => {
  // this is the occupancy home page
  return (
    <div className="container">
      <GradientHeader title="Your Gyms"/>
      <div id="saved_gyms">
        <OccupancyQuickView gym_name="Dodge Fitness Center" open="True" hours="6AM-12AM" occ="70%"/>
        <OccupancyQuickView gym_name="Equinox 50th Street" open="True" hours="6:30AM-5AM" occ="20%"/>
        <OccupancyQuickView gym_name="Anytime Fitness" open="False" hours="6:30AM-5PM" occ="45%"/>
      </div>
    </div>  
    )
};


export default Occupancy;
