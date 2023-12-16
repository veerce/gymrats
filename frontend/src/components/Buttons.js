import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/buttonstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 




export const StandardButton = ({ text }) => {
    return (
        <div>
            <button type="button" id="default_A" className="std_button default_A">{text}</button> 
        </div>
    )
}

export const StandardYellowButton = ({ text, onClick }) => {
  return (
    <button type="button" className="startworkout-button" onClick={onClick}>
      {text}
    </button>
  );
};

export const WorkoutLink = ({ datetime, length }) => {
  const navigate = useNavigate();

  const handleWorkoutLinkClick = () => {
    // Construct the URL with datetime and length as parameters
    const url = `/workout-summary?datetime=${encodeURIComponent(datetime)}&length=${encodeURIComponent(length)}`;

    // Navigate to the new page
    navigate(url);
  };

  return (
    <button type="button" id="standard_workout_style" className="btn btn-secondary" onClick={handleWorkoutLinkClick}>
      <div id="inner-div">
        <div id="inner-div-left">
          <FontAwesomeIcon icon={faDumbbell} size="4x" style={{ color: "#FFFFFF" }} />
        </div>
        <div id="inner-div-right">
          <div className="inner_div_datetime">{datetime}</div>
          <div className="inner_div_datetime">{length}</div>
        </div>
      </div>
    </button>
  );
}

export const OccupancyQuickView = ({gym_name, open, hours, occ, onClick}) => {
  let open_status = "CLOSED";
  let status_style = "closed";
  console.log('open', open)
  if (open===1) {
    open_status = "OPEN";
    status_style = "open";
  }

  return (
    <button type="button" className="occ_quick_view" onClick={onClick}>
      <div id="gym_info">
        <div id="gym_name" className="subsection">{gym_name}</div>
        <div className="subsection">
          <div id={`${status_style}`}>{open_status}</div>
          <div id="hours">{hours}</div>
        </div>
      </div>
      <div id="percentage">
        <div className="circle">{`${occ}%`}</div>
      </div>
    </button>
    
  )
}

export const AddButton = ({onClick}) => {
  return (
    <button type="button" className="circle_plus_button" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} style={{color: "#000000",}} size="2x" />
    </button>
  )
}


export const NotesButton = ({title, onClick}) => { 
  return (
    <button type="button" className="see_note" onClick={onClick}>
      <span className="button-text">{title}</span>
      <FontAwesomeIcon icon={faChevronRight} style={{ color: "#FFFFFF " }} />
    </button>
  )
}

export const StartWorkoutButton = ({ text, onClick }) => {
  return (
    <button className="startworkout-button" onClick={onClick}>
      {text}
    </button>
  );
}

export const ViewEquipmentDetails = ({ text, onClick }) => {
  return (
    <button className="view-equipment-details-button" onClick={onClick}>
      {text}
    </button>
  );
}


export const CheckEquipmentButton = ({ text, onClick }) => {
  return (
    <button className="checkequipment-button" onClick={onClick}>
      {text}
    </button>
  );
}

;