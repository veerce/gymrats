import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "../style/homestyles.css";
import GradientHeader from '../components/GradientHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/calendar.css'
import { Route, Routes } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WorkoutDetails from './WorkoutDetails.js';

import { StandardButton, WorkoutLink } from '../components/Buttons.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireFlameCurved, faTrophy, faMedal } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ username }) => {
  let display_title = 'Previous Workouts';
  return (
    <div className="container g-0">
      <GradientHeader title={display_title} />
      <SearchBar />
      <Routes>
        <Route path="/" element={<CalendarObj />} />
        <Route path="/workout-details/:date" element={<WorkoutDetails />} />
      </Routes>
    </div>
  );
};

const CalendarObj = () => {
  const [date, setDate] = useState(new Date());
  const [workoutDays, setWorkoutDays] = useState([
    'Tue Nov 21 2023', 
    'Fri Nov 24 2023', 
    'Sun Nov 26 2023', 
  ]);

  const handleDateClick = (clickedDate) => {
    const dateString = clickedDate.toDateString();

    if (workoutDays.includes(dateString)) {
      window.location.href = `/workout-details/${dateString}`;
    } else {
      setWorkoutDays([...workoutDays, dateString]);
    }
  };

  const isWorkoutDay = (day) => workoutDays.includes(day.toDateString());

  const tileClassName = ({ date }) => {
    return isWorkoutDay(date) ? 'workout-day' : '';
  };

  return (
    <div className="app">
      <h1 className="header">Workout Calendar</h1>
      <div className="calendar-container">
        <Calendar
            onChange={setDate}
            value={date}
            onClickDay={(value) => handleDateClick(value)}
            tileClassName={tileClassName}
          />
      </div>
      <div className="text-center">
        Selected date: {date.toDateString()}
      </div>
    </div>
  );
};

export default Profile;



