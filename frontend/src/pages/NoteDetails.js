import React from 'react';
import '../style/notesstyles.css';
import BasicHeader from '../components/BasicHeader';
import {NotesButton, AddButton} from '../components/Buttons';
import { useParams } from 'react-router-dom'; 


const NoteDetails = () => {
  const {note_id} = useParams();
  let content;
  let title;
  
  // create a case swtich here that will fill in different content
  switch (parseInt(note_id)) {
    case 1:
      title = "Ab Workout"
      content = "Tried a new ab routine today. Focused on crunches and planks. Need to remember to keep the core engaged throughout. Felt challenging but good. Plan to increase the duration of planks next time.";
      break
    case 2: 
      title = "2024 Goals"
      content = "Goals for 2024: 1) Run a half marathon. 2) Improve upper body strength – aim for 20 pull-ups. 3) Incorporate more yoga and stretching for flexibility. Regular weekly check-ins to track progress!";
      break
    case 3: 
      title = "Feedback from trainer"
      content = "Feedback from last session: Work on squat form, especially keeping heels grounded. Trainer suggested adding more variety in cardio – maybe cycling or swimming. Also, got a compliment on improved endurance!";
      break
    default:
      content = "Default content for notes. Select a note to view details.";
      title = ""
  }

  
return (
  <div className="container">
      <BasicHeader title={title || "Notes"}/>
      <div className='note_content'>
        {content}
      </div>
  </div>

  )
};

export default NoteDetails;
