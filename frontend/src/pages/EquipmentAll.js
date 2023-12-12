import React from 'react';
import BasicHeader from '../components/BasicHeader';
import SearchBar from '../components/SearchBar'

const EquipmentAll = () => {
    return (
        <div className="container">
          <BasicHeader title="Equipments" />
          <SearchBar placeholder_text= "Find a machine, category, etc."/>  
        </div>
    )
};

export default EquipmentAll;