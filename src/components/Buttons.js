import 'bootstrap/dist/css/bootstrap.min.css';


const StandardButton = ({ text }) => { // Destructure text from props

    const startWorkoutButtonStyle = {
        backgroundColor: '#BFE9FF',
        border: 'none',
        width: '350px',
        height: '50px',
        fontWeight: 400,
        fontSize: '25px',
        color: 'black',
    };

    return (
        <div id="start_workout">
            <button type="button" style={startWorkoutButtonStyle} className="btn btn-secondary">{text}</button> {/* Use className instead of class */}
        </div>
    )
}

export default StandardButton;
