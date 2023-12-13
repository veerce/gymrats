import 'bootstrap/dist/css/bootstrap.min.css';
import "../style/cardstyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell, faPlus, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar, buildStyles} from 'react-circular-progressbar';

export const CurrentOccupancy = ({occ}) => {

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
      <div id="occ_curr">
        
        
          <div style={{ display: 'flex',  justifyContent: 'center', marginTop: '25px'
          }}>
            <div style={{ width: '200px', height: '200px'}}>
              <CircularProgressbar
                value={`${occ}`}
                strokeWidth={5}
                text={`${occ}%`}
                styles={buildStyles({
                textSize: "20px",
                textWeight: "50",
                textFont: "Bariol, sans-serif",
                textColor: "white",
                pathColor: "#BCFF31",
                trailColor: "#131738",
                })}
              />
            </div>
          </div>
          <div id="occ_curr_sub">{message}</div>
          
         
      </div>
      
      
  
  
      
    )
}

export const ViewOccupancyButton = ({title, onClick}) => { 
    return (
        <div id="equipment_button">
            <button type="button" id="view_equipment" className="btn btn-secondary" onClick={onClick}>
              <span>{title}</span>
              <FontAwesomeIcon icon={faChevronRight} style={{color: "#000000",}} />
            </button>
        </div>
    )
}