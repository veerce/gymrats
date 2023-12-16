import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import "../style/homestyles.css";
import BasicHeader from '../components/BasicHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/calendar.css'
import { Route, Routes } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import WorkoutDetails from './WorkoutDetails.js';
import { WorkoutLink } from '../components/Buttons.js';

const Profile = ({ username }) => {
  let display_title = 'Previous Workouts';
  return (
    <div className="container g-0">
      <BasicHeader title={display_title}/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<CalendarObj />} />
        <Route path="/workout-details/:date" element={<WorkoutDetails />} />
      </Routes>
      <PreviousWorkouts />
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

  // Add this function to exclude extra styling for the current date
  const excludeCurrentDate = ({ activeStartDate, date, view }) => {
    const currentDate = new Date();
    return view === 'month' && date.getMonth() === currentDate.getMonth() && date.getDate() === currentDate.getDate() ? 'current-date' : '';
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          onClickDay={(value) => handleDateClick(value)}
          tileClassName={tileClassName}
        />
      </div>
      <div className="text-center" style={{ padding: 10 }}>
        Selected date: {date.toDateString()}
      </div>
    </div>
  );
};

const PreviousWorkouts = () => {
  return (
    <div id="achievements">
      <div id="previous_workouts" style={{ padding: 5 }}>
        <WorkoutLink datetime="Oct 29, 2023 2:10 PM" length="20:15 mins" />
      </div>
    </div>
  );
}

export default Profile;
