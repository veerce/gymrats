# code is from https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

from flask import Flask, jsonify, g, request
from flask_cors import CORS
import datetime
from dataservice import *

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)
CORS(app)

# Function to get the database connection    
def get_db():
	if 'db' not in g:
		g.db = Database('workout_app.db')
		print("Database connection")
	return g.db

# Function to close the database connection
def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close_connection()
		
# Route for getting 1 user's data
@app.route('/users/<int:user_id>')
def get_user_data(user_id):
    try:
        db = get_db()  # Get the database connection from g
        data = db.get_user_data(user_id)
        if data:
            return jsonify(data)
        else:
            return jsonify({"get_user_data error"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
	
# Route for getting all user's previous workouts, with an optional limit 
@app.route('/workouts/<int:user_id>/', defaults={'limit': None}, methods=['GET'])
@app.route('/workouts/<int:user_id>/<int:limit>', methods=['GET'])
def get_user_workouts(user_id, limit):
	# this route will get all of 1 specific user's previous workouts, with an optional limit
	try:
		db = get_db()
		data = db.get_prev_workouts(user_id, limit)
		if data:
			return jsonify(data)
		else: 
			return jsonify({"message": "No workouts found"}), 404
	except Exception as e:
		return jsonify({"error": str(e)}), 500
	
@app.route('/workout_date_time/<int:workout_id>', methods=['GET'])
def get_workout_date_time(workout_id):
	try:
		db = get_db()
		data = db.get_workout_date_time(workout_id)
		if data:
			return jsonify(data)
		else: 
			return jsonify({"message": "No workout data found"}), 404
	except Exception as e:
		return jsonify({"error": str(e)}), 500
	
@app.route('/workout_exercises/<int:workout_id>', methods=['GET'])
def get_exercises_for_workout(workout_id):
	# this route will get all of 1 specific user's previous workouts, with an optional limit
	try:
		db = get_db()
		data = db.get_workout_exercises(workout_id)
		if data:
			return jsonify(data)
		else: 
			return jsonify({"message": "No exercises found for workout"}), 404
	except Exception as e:
		return jsonify({"error": str(e)}), 500

# Route to create new workout in DB and to get a new workout_id
@app.route('/workouts/<int:user_id>', methods=['POST'])
def create_new_workout(user_id):
	try:
		db = get_db()
		workout_id = db.create_workout(user_id) # creates datetime within the dataservice
		return jsonify({"message": "Workout created successfully", "workout_id": workout_id}), 201
	except Exception as e:
		return jsonify({"error": str(e)}), 500	

# Route to update the duration of a given workout
@app.route('/workouts/<int:workout_id>', methods=['PUT'])
def update_workout(workout_id):
	data = request.json
	if 'duration' not in data:
			return jsonify({"error": "Duration field is missing"}), 400
	
	try:
		db = get_db()
		result = db.update_workout(workout_id, data['duration'])

		if result:
			return jsonify({"message": "Workout updated successfully"}), 200
		else:
			return jsonify({"error": "Workout not found or no update made"}), 404
	except Exception as e:
		return jsonify({"error": str(e)}), 500	
	
# Route to return all the data regarding a specific gym
@app.route('/gyms/<int:gym_id>')
def get_gym_data(gym_id):
	try:
		db = get_db() 
		data = db.get_gym_data(gym_id)
		if data:
			return jsonify(data)
		else:
			return jsonify({"message": "No gyms found"}), 404
	except Exception as e:
		print(f"Error fetching user data: {str(e)}")
		return jsonify({"error": str(e)}), 500
	
# Route to return the occupancy rate of a specific gym
@app.route('/gyms/<int:gym_id>/occupancy')
def get_gym_occupancy(gym_id):
	try:
		db = get_db()
		data = db.get_gym_occupancy(gym_id)
		if data:
			return jsonify(data)
		else:
			return jsonify({"message": "No data found"}), 404
	except Exception as e:
		return jsonify({"error: str(e)"}), 500

# Route to add a new exercise to the exercise table
@app.route('/exercise/<int:workout_id>', methods=['PUT'])
def add_exercise(workout_id):
	data = request.json

	equipment_id = data.get('equipment_id')
	exercise_name = data.get('exercise_name')
	sets = data.get('sets')
	reps = data.get('reps')
	weight = data.get('weight')
	speed = data.get('speed')
	pace = data.get('pace')
	incline = data.get('incline')
	
	try:
		db = get_db()
		exercise_id = db.add_exercise(workout_id, equipment_id, exercise_name, sets, reps, weight, speed, pace, incline)
		return jsonify({"message": "Exercise added successfully", "exercise_id": exercise_id}), 201
	except Exception as e:
		return jsonify({"error": str(e)}), 500
	
# Route to get all unique workout dates
@app.route('/unique_workout_dates', methods=['GET'])
def get_unique_workout_dates():
    try:
        db = get_db()
        unique_dates = db.get_unique_workout_dates()
        return jsonify(unique_dates)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route to get workouts for a specific date
@app.route('/workouts/date/<string:workout_date>', methods=['GET'])
def get_workouts_by_date(workout_date):
    try:
        db = get_db()
        data = db.get_workouts_by_date(workout_date)
        if data:
            return jsonify(data)
        else:
            return jsonify({"message": "No workouts found for the specified date"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Running app
if __name__ == '__main__':
    app.run(debug=True)