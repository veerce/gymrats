import React from 'react';
import '../style/notesstyles.css';
import BasicHeader from '../components/BasicHeader';
import {NotesButton, AddButton} from '../components/Buttons';
import { useNavigate } from 'react-router-dom'; 


const Notes = () => {
  const navigate = useNavigate();

  const handleAddNoteClick = () => {
    console.log("Add notes button clicked");
  };

  const handleNoteCLick = (note_id) => {
    console.log(`Note clicked with ID: ${note_id}`);
    navigate(`/note-details/${note_id}`);
  };


return (
  <div className="container">
      <BasicHeader title="Notes"/>
      <div className='content'>
        <NotesButton title="Ab Workout" onClick={() => handleNoteCLick(1)}/>
        <NotesButton title="2024 Goals" onClick={() => handleNoteCLick(2)}/>
        <NotesButton title="Feedback from trainer" onClick={() => handleNoteCLick(3)}/>
        <div id="add_button">
          <AddButton onClick={handleAddNoteClick}/>
        </div>  
      </div>

  </div>

  )
};

export default Notes;
