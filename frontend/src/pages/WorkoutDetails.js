
import React, { useEffect, useState }  from 'react';
import "../style/workoutdetailsstyle.css";
import "../style/buttonstyles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicHeader from '../components/BasicHeader';
import TreadmillIcon from '../images/treadmill-icon.png';
import SmithMachineIcon from '../images/smith-machine.png';
import LegPressIcon from '../images/leg-press.png';
import { CheckEquipmentButton, StandardButton, StartWorkoutButton } from '../components/Buttons.js';
import { useNavigate, useParams } from 'react-router-dom'; 

const WorkoutDetails = ({ username }) => {
  const { workoutId } = useParams();
  let display_machine = 'My Workout';
  console.log('GOT THE WORKOUT ID', workoutId)

  return (
    <div className="workout_details">
      <BasicHeader title={display_machine} />
        <TimeElapsed />
        <CurrentEquipment />
        <CheckEquipment />
        <EndButton />
    </div>
  );
};

const TimeElapsed = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Format the time in minutes and seconds
  const minutes = Math.floor(timeElapsed / 60);
  const seconds = timeElapsed % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div id="time-container">
      <div className="yellow-container">
        <CenteredContent>
          <div id="text_box_time">{formattedTime}</div>
          <div id="text_box_mins">MINS</div>
        </CenteredContent>
      </div>
    </div>
  );
};


const CurrentEquipment = () => {
  const [selectedWorkout, setSelectedWorkout] = useState('treadmill');
  const handleWorkoutChange = (workout) => {
    setSelectedWorkout(workout);
  };
  
  const getMachineName = () => {
    switch (selectedWorkout) {
      case 'treadmill':
        return 'Treadmill';
      case 'smith machine':
        return 'Smith Machine';
      case 'leg press':
        return 'Leg Press';
      default:
        return '';
    }
  };

  const [speed, setSpeed] = useState('');
  const [pace, setPace] = useState('');

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value;
    setSpeed(newSpeed);

    const newPace = calculatePace(newSpeed);
    setPace(newPace);
  };

  const calculatePace = (speed) => {
    return speed ? (60 / parseFloat(speed)).toFixed(2) : '';
  };

  return (
    <div id="equipment-container">
      <div className="white-container">
        <div className="side-by-side-containers">
          <div className="square-container">
            <CenteredContent>
              <div id="equipment_icon" className="icon-container">
                {selectedWorkout === 'treadmill' && (
                  <img className="icon-image" src={TreadmillIcon} alt="Treadmill Icon" />
                )}
                {selectedWorkout === 'smith machine' && (
                  <img className="icon-image" src={SmithMachineIcon} alt="Smith Machine Icon" />
                )}
                {selectedWorkout === 'leg press' && (
                  <img className="icon-image" src={LegPressIcon} alt="Leg Press Icon" />
                )}
              </div>
              <div id="text_box_mins">{getMachineName()}</div>
            </CenteredContent>
          </div>
          <div className="square-container">
              <div id="text_box_label">SPEED</div>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter Speed (MPH)"
                  value={speed}
                  onChange={handleSpeedChange}
                />
              </div>
              <div id="text_box_mins">PACE {pace ? `${pace} min/mile` : '---'}</div>
            </div>
      </div>
    </div>
    </div>
  );
};

const CenteredContent = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </div>
  );
};


const CheckEquipment = ({CheckEquipment}) => {
  const navigate = useNavigate();

  const handleEquipmentClick = () => {
    console.log(`Equipment clicked`);
    navigate('/equipmentall');
  };

  return (
    <CenteredContent>
    <div id="CheckAvailability" className="button-container">
      <div id="check_availability">
        <CheckEquipmentButton text="Check Equipment Availability" onClick={handleEquipmentClick}/>
      </div>
    </div>
    </CenteredContent>
  );
}

const EndButton = () => {
  const navigate = useNavigate();
  const handleEndWorkout = () => {
    navigate('/home');
  };

  return (
    <CenteredContent>
    <div id="StartThisWorkout" className="button-container">
      <div id="end_this_workout">
        <StartWorkoutButton text="END WORKOUT" onClick={handleEndWorkout} />
      </div>
    </div>
    </CenteredContent>
  );
}

export default WorkoutDetails;
