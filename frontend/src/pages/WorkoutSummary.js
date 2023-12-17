import { useLocation, useParams } from 'react-router-dom';
import React, { useState, useEffect }  from 'react';
import "../style/workoutsummarystyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TreadmillIcon from '../images/treadmill-icon.png';
import SmithMachineIcon from '../images/smith-machine.png';
import LegPressIcon from '../images/leg-press.png';
import BenchImage from '../images/bench-image.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LeftHeader from '../components/LeftHeader';



const WorkoutSummary = () => {
  // Use the location hook to access query parameters
  const currentUrl = window.location.href;
  const workout_id = currentUrl.split('/').pop();

  const [workoutData, setWorkoutData] = useState({
    workoutid: workout_id,
    date: "",
    time: "",
  });
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
        try {
          console.log("fetching workout data...")
          const workoutResponse = await fetch(`http://127.0.0.1:5000/workout_date_time/${workout_id}`);
          const workoutData = await workoutResponse.json();
          setWorkoutData((prevData) => ({
            ...prevData,
            date: workoutData.date,
            time: workoutData.time
          }));
          console.log("fetching workout exercises...")
          const exercisesResponse = await fetch(`http://127.0.0.1:5000/workout_exercises/${workout_id}`);
          const exercisesData = await exercisesResponse.json();
          if (exercisesData && exercisesData.length > 0) {
            console.log('fetching exercises', exercisesData)
            setExercises(exercisesData);
          } else {
            console.log('No exercises found for workout.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    if (!workoutData.date || !workoutData.time) {
        fetchWorkoutDetails();
      }
  }, []);

  return (
    <div className="container g-0">
      <LeftHeader title={"Workout Summary"} subheader={workoutData.date}/>
      <div className='centered-container padding_top_bottom'>
        {exercises.map((exercise) => (
            <ExerciseLabel exercise_details={exercise}/>
            ))}
      </div>
      <WorkoutLabel datetime={datetime} length={workoutLength} />
    </div>
  );
};

const workoutLabel = () => {
    return (
        <div id="instructions-container">
            <div className="white-container">
            <div id="inner-div">
                <div id="inner-div-left">
                    <FontAwesomeIcon icon={faDumbbell} size="4x" style={{ color: "#FFFFFF" }} />
                </div>
                <div id="inner-div-right">
                    <div className="inner_div_datetime">{}</div>
                    <div className="inner_div_datetime">{}</div>
                </div>
            </div>
            </div>
        </div>
      );
};

const LeftContent = ({ children }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        {children}
      </div>
    );
  };

const RightContent = ({ children }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
        {children}
      </div>
    );
  };
    
const ExerciseLabel = (exercise_details) => {

    var selectedWorkout = Object.values(exercise_details)[0][1];
    var workoutDetails = Object.values(exercise_details)[0];

    return (
    <div id="equipment-container">
        <div className = "workout-label">{selectedWorkout}</div>
        <div className="white-container-workout-label">
        <div className="side-by-side-containers">
            <div className="square-container">
                <LeftContent>
                    <div id="equipment_icon" className="icon-container">
                    {selectedWorkout === 'Run' && (
                        <img className="icon-image" src={TreadmillIcon} alt="Treadmill Icon" />
                    )}
                    {selectedWorkout === 'Squats' && (
                        <img className="icon-image" src={SmithMachineIcon} alt="Smith Machine Icon" />
                    )}
                    {selectedWorkout === 'Bench Press' && (
                        <img className="icon-image" src={BenchImage} alt="Bench Press Icon" />
                    )}
                    {selectedWorkout === 'Leg Press' && (
                        <img className="icon-image" src={LegPressIcon} alt="Leg Press Icon" />
                    )}
                    </div>
                </LeftContent>
            </div>
            <div className="square-container">
                <RightContent>
                    {selectedWorkout === 'Run' ? (
                        <>
                            <div id="text_box_label">Duration: {workoutDetails[5]}</div>
                            <div id="text_box_label">Intensity: {workoutDetails[6]}</div>
                        </>
                    ) : (
                        <>
                            <div id="text_box_label">Sets: {workoutDetails[2]}</div>
                            <div id="text_box_label">Reps: {workoutDetails[3]}</div>
                            <div id="text_box_label">Weights: {workoutDetails[4]}</div>
                        </>
                    )}
                </RightContent>
            </div>
        </div>
        </div>
    </div>
    );
};

export default WorkoutSummary;

