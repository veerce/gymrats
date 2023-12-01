import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/buttonstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProgressBar from './ProgressBar';
import DailyCapacityTrends from '../components/BarChart';


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


export const CurrentOccupancy = ({occ, onClick}) => {

  const getStatusMessage = (occ) => {
    if (occ > 60) {
      return "Higher than average occupancy";
    } else if (occ > 40) {
      return "Average occupancy";
    } else {
      return "Lower than average occupancy";
    }
  };

  const message = getStatusMessage(occ);

  return (
    <button type="button" id="occ_curr" onClick={onClick}>
        <div id="occ_curr_title">Current Occupancy</div>
        <div id="occ_curr_number">
          {occ}%  
        </div>
        <ProgressBar percentage={occ} />
        <div id="occ_curr_sub">{message}</div>
    </button>
    
  )
}

// export const DailyCapacity= () => {
//   const data = {
//     labels: ['6a', '12p', '3p', '6p', '12a'],
//     datasets: [
//       {
//         label: 'Daily Capacity',
//         data: [65, 59, 80, 81, 56, 55, 40], 
//         backgroundColor: [
//           'rgba(75, 192, 192, 0.2)', 
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(255, 99, 132, 0.2)', 
//           'rgba(75, 192, 192, 0.2)'
//         ],
//         borderColor: [
//           'rgba(75, 192, 192, 1)', 
//           'rgba(75, 192, 192, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 99, 132, 1)', 
//           'rgba(75, 192, 192, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };
//   return (
//     <button type="button" id="occ_curr">
//         <DailyCapacityTrends chartData={data} />
//     </button>
    
//   )
// }


export const ViewOccupancyButton = ({title, onClick}) => { 
  return (
      <div id="note_button">
          <button type="button" id="view_equipment" className="btn btn-secondary" onClick={onClick}>
            <span>{title}</span>
            <FontAwesomeIcon icon={faChevronRight} style={{color: "#000000",}} />
          </button>
      </div>
  )
}