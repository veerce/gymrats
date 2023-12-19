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
import GymSearch from './pages/GymSearch';
import EquipmentCardio from './pages/EquipmentCardio';
import WorkoutSummary from './pages/WorkoutSummary';
import NoteDetails from './pages/NoteDetails';
import { useState, useEffect } from "react";

// react and flask connection code from 
  // https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

function App() {

  const [userData, setUserData] = useState({
    userId: null,
    firstName: "",
    lastName: "",
    savedGyms: []
  });

  const userId = 1
  useEffect(() => {
    console.log("client: Fetching user data...");
    fetch(`http://127.0.0.1:5000/users/${userId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setUserData({
          userId: data[0][0],
          firstName: data[0][1],
          lastName: data[0][2],
          savedGyms: data[0][3]
        });
      } else {
        console.error('Empty response or invalid JSON format');
      }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });  
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home user={userData}/>} />
        <Route path="/home" element={<Home user={userData}/>} />
        <Route path="/occupancy" element={<Occupancy user={userData}/>} />
        <Route path="/occupancydetails" element={<OccupancyDetails user={userData} />}/>
        <Route path="/equipmentall" element={<EquipmentAll />}/>
        <Route path="/startworkout" element={<StartWorkout />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile userid={userData.userId}/>} />
        <Route path="/workout-details/:workoutId" element={<WorkoutDetails />} />
        <Route path="/gym-search" element={<GymSearch />} />
        <Route path="/equipmentcardio" element={<EquipmentCardio />} />
        <Route path="/note-details/:note_id" element={<NoteDetails />} />
        <Route path="/workout-summary/:workoutId" element={<WorkoutSummary />} />
      </Routes>
    </div>
  );
}

export default App;