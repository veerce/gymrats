import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Occupancy from './pages/Occupancy';
import StartWorkout from './pages/StartWorkout';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
import OccupancyDetails from './pages/OccupancyDetails';
import EquipmentAll from './pages/EquipmentAll';
import WorkoutDetails from './pages/WorkoutDetails';
import { useState, useEffect } from "react";

// react and flask connection code from 
  // https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

function App() {

  const [data, setdata] = useState({
    name: "",
    email: "",
    age: 0,
    account_number: "",
  });

  useEffect(() => {
      fetch("/data")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setdata({
            name: data.Name,
            email: data.Email,
            age: data.Age,
            account_number: data.AccountNumber,
          });
          console.log(data);
        } else {
          console.error('Empty response or invalid JSON format');
          // Handle empty or invalid response as needed
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle error conditions, like network issues or failed requests
      });  
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home username={data.name}/>} />
        <Route path="/home" element={<Home username={data.name}/>} />
        <Route path="/occupancy" element={<Occupancy />} />
        <Route path="/occupancydetails" element={<OccupancyDetails />}/>
        <Route path="/equipmentall" element={<EquipmentAll />}/>
        <Route path="/startworkout" element={<StartWorkout />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/workout-details" element={<WorkoutDetails />} />
      </Routes>
    </div>
  );
}

export default App;