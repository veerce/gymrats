import React, { useState, useEffect } from 'react';
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

const Profile = ({ userId }) => {
  return (
    <div className="container g-0">
      <BasicHeader title={'Previous Workouts'}/>
      <SearchBar/>
      <Routes>
        <Route path="/" element={<CalendarObj />} />
        <Route path="/workout-details/:date" element={<WorkoutDetails />} />
      </Routes>
      <PreviousWorkouts />
    </div>
  );

  
};

const GetWorkouts = ({ date }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const formattedDate = encodeURIComponent(date); // Ensure proper encoding
        const workoutsResponse = await fetch(`http://127.0.0.1:5000/workouts/date/${formattedDate}`);
        const workoutsData = await workoutsResponse.json();

        if (workoutsData && workoutsData.length > 0) {
          console.log('Fetching workouts for day', workoutsData);
          setWorkouts(workoutsData);
        } else {
          console.log('No workouts found for day.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false once the request is complete
      }
    };

    // Call the fetchWorkoutDetails function
    fetchWorkoutDetails();
  }, [date]); // Add date as a dependency to re-run the effect when date changes

  return { workouts, loading };
};



const CalendarObj = () => {
  const [date, setDate] = useState(new Date());

  var [workoutDays, setWorkouts] = useState([]);

  const fetchUserWorkouts = async () => {
    try {
      // Fetch recent workouts for the user with a limit of 2
      const response = await fetch(`http://127.0.0.1:5000/unique_workout_dates`);
      const data = await response.json();
      if (data && data.length > 0) {
        setWorkouts(data);
      } else {
        console.log('No recent workouts found.');
      }
    } catch (error) {
      console.error('Error fetching user workouts:', error);
    }
  };

  useEffect(() => {
    fetchUserWorkouts();
  }, []); 
  workoutDays = workoutDays.map(workout => workout[0]);

  const isWorkoutDay = (day) => workoutDays.includes(day);
  const tileClassName = ({ date }) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return isWorkoutDay(`${year}-${month}-${day}`) ? 'workout-day' : '';
  };

  return (
    <div className="app">
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileClassName={tileClassName}
        />
      </div>
      <div className="text-center" id="gym_name">
        Selected date: {date.toDateString()}
      </div>
      <PreviousWorkouts selectedDate={date.toISOString().split('T')[0]} />
    </div>
);
};

/*
const PreviousWorkouts = () => {
  return (
    <div id="achievements">
      <div id="previous_workouts" style={{ padding: 5 }}>
      <WorkoutLink
            key={61}
            workoutId={57}
            datetime={'2023-12-18'}
            length={'00:04:56'}
          />
      </div>
    </div>
  );
}
*/
const PreviousWorkouts = ({ selectedDate }) => {
  const { workouts, loading } = GetWorkouts({ date: selectedDate });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!workouts || workouts.length === 0) {
    return <p>No workouts found for the selected date.</p>;
  }

  return (
    <div id="achievements">
      <div id="previous_workouts" className='centered-container padding_top_bottom'>
        {workouts.map((workout) => (
          <div key={1} style={{ marginBottom: '10px' }}>
            <WorkoutLink
              workoutId={Object.values(workout)[0]}
              datetime={Object.values(workout)[2]}
              length={Object.values(workout)[3]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Profile;
