import React from 'react';
import BasicHeader from '../components/BasicHeader';
import '../style/equipmenttypestyles.css';
import SearchBar from '../components/SearchBar';


const BackLink = () => (
    <div >
      <button className="equipment-all-back-link" onClick={() => window.history.back()}>{"< All Equipments"}</button>
    </div>
);

const EquipmentCardio = () => {
    return (
        <div className="equipment-type-container">
            <BasicHeader title="Equipments" />
            <BackLink/>
            <SearchBar placeholder_text= "Find a machine, category, etc."/>
            
        </div>
    );
};

export default EquipmentCardio;