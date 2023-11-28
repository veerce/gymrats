import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/buttonstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


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
            <div id="inner_div_datetime">{datetime}</div>
            <div id="inner_div_length">{length}</div>
          </div>
        </div>
      </button>
    );
}

