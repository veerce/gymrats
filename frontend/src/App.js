import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Occupancy from './pages/Occupancy';
import StartWorkout from './pages/StartWorkout';
import Notes from './pages/Notes';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';
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
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                name: data.Name,
                email: data.Email,
                age: data.Age,
                account_number: data.AccountNumber,
            });
            console.log(data)
        })
    );
  }, []);

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home username={data.name}/>} />
        <Route path="/home" element={<Home username={data.name}/>} />
        <Route path="/occupancy" element={<Occupancy />} />
        <Route path="/startworkout" element={<StartWorkout />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;