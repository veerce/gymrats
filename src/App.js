import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Occupancy from './pages/Occupancy';
import StartWorkout from './pages/StartWorkout';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';

function App() {
  let user = "Veer"
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home username={user}/>} />
          <Route path="/home" element={<Home username={user}/>} />
          <Route path="/occupancy" element={<Occupancy />} />
          <Route path="/startworkout" element={<StartWorkout />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;