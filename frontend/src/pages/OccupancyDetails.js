import React from 'react';
import '../style/occupancystyles.css';
import GradientHeader from '../components/GradientHeader';
import {OccupancyQuickView, AddGym} from '../components/Buttons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation } from 'react-router-dom';
import {CurrentOccupancy} from '../components/Buttons';

const OccupancyDetails = () => {
    console.log('stupid');
    const location = useLocation();
    const yourData = location.state;
    console.log("State: ", yourData);
    return (
        <div className="container">
          <GradientHeader title="Dodge Fitness Center" subheader="OPEN 6AM - 12AM"/>  
          <CurrentOccupancy occ="70" />
        </div>
    )
};

export default OccupancyDetails;
