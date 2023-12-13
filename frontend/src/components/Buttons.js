import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/buttonstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';




export const StandardButton = ({ text }) => {
    return (
        <div>
            <button type="button" id="default_A" className="std_button default_A">{text}</button> 
        </div>
    )
}

export const StandardYellowButton = ({ text }) => {
  return (
    <button type="button" className="btn btn-secondary startworkout-button">{text}</button> 
  )
}


export const WorkoutLink = ({ datetime, length }) => {
    return (
      <button type="button" id="standard_workout_style" className="btn btn-secondary">
        <div id="inner-div">
            <div id="inner-div-left">
                <FontAwesomeIcon icon={faDumbbell} size="4x" style={{color: "#FFFFFF",}}/>
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
  if (open==="True") {
    open_status = "OPEN";
    status_style = "open";
  }

  return (
    <button type="button" id="occ_quick_view" className="btn btn-secondary" onClick={onClick}>
      <div id="gym_info">
        <div id="gym_name" className="subsection">{gym_name}</div>
        <div className="subsection">
          <div id={`${status_style}`}>{open_status}</div>
          <div id="hours">{hours}</div>
        </div>
      </div>
      <div id="percentage">
        <div className="circle">{occ}</div>
      </div>
    </button>
    
  )
}

export const AddGym = ({onClick}) => {
  return (
    <button type="button" className="btn btn-default" id="add_gym_button" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} style={{color: "#FF6B2B",}} size="2x" />
    </button>
  )
}


export const NotesButton = ({title, onClick}) => { 
  return (
      <div id="note_button">
          <button type="button" id="default_B" className="btn btn-secondary" onClick={onClick}>
            <span>{title}</span>
            <FontAwesomeIcon icon={faChevronRight} style={{color: "#000000",}} />
          </button>
      </div>
  )
}

export const AddNote = ({onClick}) => {
  return (
    <button type="button" className="btn btn-default" id="add_note_button" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} style={{color: "#FF6B2B",}} size="2x" />
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

export const CheckEquipmentButton = ({ text, onClick }) => {
  return (
    <button className="checkequipment-button" onClick={onClick}>
      {text}
    </button>
  );
}

;