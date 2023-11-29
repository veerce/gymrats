import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/buttonstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus } from '@fortawesome/free-solid-svg-icons';


export const StandardButton = ({ text }) => { // Destructure text from props

    return (
        <div id="start_workout">
            <button type="button" id="default_A" className="btn btn-secondary">{text}</button> {/* Use className instead of class */}
        </div>
    )
}

export const WorkoutLink = ({ datetime, length }) => {
    return (
      <button type="button" id="standard_workout_style" className="btn btn-secondary">
        <div id="inner-div">
            <div id="inner-div-left">
                <FontAwesomeIcon icon={faDumbbell} size="4x" style={{color: "#000000",}}/>
            </div>
          <div id="inner-div-right">
            <div className="inner_div_datetime">{datetime}</div>
            <div className="inner_div_datetime">{length}</div>
          </div>
        </div>
      </button>
    );
}

export const OccupancyQuickView = ({gym_name, open, hours, occ}) => {
  let open_status = "CLOSED";
  let status_style = "closed";
  if (open==="True") {
    open_status = "OPEN";
    status_style = "open";
  }

  return (
    <button type="button" id="occ_quick_view" className="btn btn-secondary">
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