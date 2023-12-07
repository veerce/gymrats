import React from 'react';
import '../style/notesstyles.css';
import BasicHeader from '../components/BasicHeader';
import {NotesButton, AddNote} from '../components/Buttons';

const Notes = () => {
  const handleAddNoteClick = () => {
    console.log("Add notes button clicked");
  };

  const handleNoteCLick = () => {
    console.log(`Note clicked`);
  };


return (
  <div className="container">
    <BasicHeader title="Notes"/>
    <NotesButton title="Ab Workout" onClick={handleNoteCLick}/>
    <NotesButton title="2024 Goals" onClick={handleNoteCLick}/>
    <NotesButton title="Feedback from trainer" onClick={handleNoteCLick}/>
    <NotesButton title="Push Day Workout" onClick={handleNoteCLick}/>
    <NotesButton title="Pull Day Workout" onClick={handleNoteCLick}/>
    <NotesButton title="Leg Day Workout" onClick={handleNoteCLick}/>
    <div id="add_button">
        <AddNote onClick={handleAddNoteClick}/>
    </div>
  </div>
  )
};



export const NotesHome = () => {
  return (
    <div id="notes_home">

    </div>
  )
}

export default Notes;
