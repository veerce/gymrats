import React from 'react';
import BasicHeader from '../components/BasicHeader';
import SearchBar from '../components/SearchBar';
import '../style/equipmentstyles.css';
import TreadmillImage from '../images/solar_treadmill-round-bold.png';
import LegpressImage from '../images/leg-press-image.png';
import BenchImage from '../images/bench-image.png';
import { useNavigate } from 'react-router-dom';

const EquipmentCard = ({ name, status, timeStarted, avgTime, imageUrl }) => (
    <div className="card">
    <div className="equipment-info">
        <div className={`status-dot ${status ? 'green' : 'red'}`}></div>
        <div className="equipment-name">{name}</div>
    </div>
    
    
      <img src={imageUrl} alt={`${name}`} className="equipment-image" />
      {/* <div className="equipment-status">{status ? 'Available' : 'In use'}</div> */}
      {/* <div className="equipment-time">{`Started ${timeStarted} ago`}</div>
      <div className="equipment-avg-time">{`Avg: ${avgTime}`}</div> */}
      {!status && <div className="equipment-time">{`Started ${timeStarted} ago`}</div>}
      {!status && <div className="equipment-avg-time">{`Avg: ${avgTime}`}</div>}
    </div>
);
  
const EquipmentSectionHeader = ({ title, link }) => (
    <div className="section-header">
      <h2>{title}</h2>
      {/* <Link to={link} className="see-all-link">see all &gt; </Link> */}
    </div>
);

const EquipmentSection = ({ title, equipments, link }) => (
    <section>
      <EquipmentSectionHeader title={title} link={link} />
      <div className="equipment-grid">
        {equipments.map(equipment => (
          <EquipmentCard key={equipment.name} {...equipment} />
        ))}
      </div>
    </section>
);

const EquipmentAll = () => {
    const navigate = useNavigate();

    const cardioEquipment = [
        { name: 'Treadmill 1', status: true, timeStarted: '5 mins', avgTime: '10 mins', imageUrl: TreadmillImage },
        { name: 'Treadmill 2', status: false, timeStarted: '34 mins', avgTime: '30 mins', imageUrl: TreadmillImage},
        { name: 'Treadmill 3', status: false, timeStarted: '5 mins', avgTime: '30 mins', imageUrl: TreadmillImage},
    ];
    
    const weightMachines = [
        { name: 'Leg Press 1', status: true, timeStarted: '5 mins', avgTime: '10 mins', imageUrl: LegpressImage },
        { name: 'Leg Press 2', status: true, timeStarted: '5 mins', avgTime: '10 mins', imageUrl: LegpressImage },
        { name: 'Leg Press 3', status: false, timeStarted: '5 mins', avgTime: '10 mins', imageUrl: LegpressImage },
    ];
    
    const freeWeights = [
        { name: 'Bench 1', status: false, timeStarted: '9 mins', avgTime: '10 mins', imageUrl: BenchImage },
        { name: 'Bench 2', status: false, timeStarted: '5 mins', avgTime: '10 mins', imageUrl: BenchImage },
        { name: 'Bench 3', status: false, timeStarted: '2 mins', avgTime: '10 mins', imageUrl: BenchImage },
    ];
    
    return (
        <div className="container">
            <BasicHeader title="Equipments" />
            <div className="equipment-all-search-bar">
                <div onClick={() => navigate(-1)} className="back-button">Back</div>
                <SearchBar placeholder_text= "Find a machine, category, etc."/> 
            </div> 

            <EquipmentSection title="Cardio" equipments={cardioEquipment} link='/equipmentcardio' />
            <EquipmentSection title="Weight Machines" equipments={weightMachines} />
            <EquipmentSection title="Free Weights" equipments={freeWeights} /> 
        </div>
    )
};

export default EquipmentAll;