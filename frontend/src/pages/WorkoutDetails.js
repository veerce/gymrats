
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

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isNewSession, setIsNewSession] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isNewSession) {
        setTimeElapsed(prevTime => prevTime + 1);
        setTotalElapsedTime(prevTotal => prevTotal + 1);
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isNewSession]);

  const handleEndEquipment = () => {
    setIsNewSession(false);
    setTotalElapsedTime(totalElapsedTime);
    setTimeElapsed(0);
  };

  const handleStartNewEquipment = () => {
    setIsNewSession(true);
    setTimeElapsed(0);
  };

  return (
    <div className="workout_details">
      <BasicHeader title={display_machine} />
        <TimeElapsed timeElapsed={timeElapsed}/>
        <CurrentEquipment />
        {isNewSession ? (
        <EndEquipment onEnd={handleEndEquipment} />
      ) : (
        <StartNewEquipment onStart={handleStartNewEquipment} />
      )}
        <CheckEquipment />
        <EndButton workoutId={workoutId} timeElapsed={timeElapsed}/>
    </div>
  );
};

const TimeElapsed = ({timeElapsed}) => {
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
  const [incline, setIncline] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSpeedChange = (event) => {
    const newSpeed = event.target.value;
    setSpeed(newSpeed);

    const newPace = calculatePace(newSpeed);
    setPace(newPace);
  };

  const calculatePace = (speed) => {
    if (speed) {
      const paceInMinutes = 60/parseFloat(speed);
  
      const minutes = Math.floor(paceInMinutes);
      const seconds = Math.round((paceInMinutes % 1) * 60);
  
      return `   ${minutes}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return '';
    }
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
            {selectedWorkout === 'treadmill' && (
              <>
              <div className="horizontal-container">
                <div id="text_box_label">SPEED&nbsp;</div>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="MPH"
                    value={speed}
                    onChange={handleSpeedChange}
                  />
                </div>
                </div>
                <div id="text_box_mins">PACE{pace ? `${pace}` : ''}</div>
                <div className="horizontal-container">
                <div id="text_box_label">INCLINE&nbsp;</div>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="#"
                    value={incline}
                  />
                </div>
                </div>
              </>
              
            )}
            {selectedWorkout !== 'treadmill' && (
             <>
                <div className="input-set">
                <div className="horizontal-container">
                  <div id="text_box_label">SETS&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="#"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                    />
                  </div>
                  </div>
                </div>
                <div className="input-set">
                <div className="horizontal-container">
                  <div id="text_box_label">REPS&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="#"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                    />
                  </div>
                  </div>
                </div>
                <div className="input-set">
                <div className="horizontal-container">
                  <div id="text_box_label">WEIGHT</div>
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder="lbs/kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              </>
            )}
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

const EndEquipment = ({ onEnd }) => {

  const handleEndClick = () => {
    console.log(`End equipment clicked`);
    onEnd();
  };

  return (
    <CenteredContent>
    <div id="CheckAvailability" className="button-container">
      <div id="check_availability">
        <CheckEquipmentButton text="End Current Equipment" onClick={handleEndClick}/>
      </div>
    </div>
    </CenteredContent>
  );
}

const StartNewEquipment = ({ onStart }) => {
  const handleStartClick = () => {
    onStart(); // Call the provided callback to start a new equipment session
  };

  return (
    <CenteredContent>
      <div id="StartNewEquipment" className="button-container">
        <div id="start_new_equipment">
          <StartWorkoutButton text="START NEW EQUIPMENT" onClick={handleStartClick} />
        </div>
      </div>
    </CenteredContent>
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

const EndButton = ({workoutId, timeElapsed}) => {
  const navigate = useNavigate();

  const handleEndWorkout = async () => {
    console.log('Workout ended. Time elapsed: ' + (timeElapsed))
    try {
      const formattedTimeElapsed = formatTime(timeElapsed);
      const data = {duration: formattedTimeElapsed};
    
    const response = await fetch(`http://127.0.0.1:5000/workouts/${workoutId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Workout updated successfully.');
    navigate(`/workout-summary/${workoutId}`);
    }
    catch (error) {
      console.error('Error ending workout:', error);
    }    
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return [hours, minutes, seconds]
      .map(val => val.toString().padStart(2, '0'))
      .join(':');
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
