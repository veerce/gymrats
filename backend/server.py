# code is from https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

from flask import Flask, jsonify, g
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
		
# Route for getting all user data 
@app.route('/users/<int:user_id>')
def get_user_data(user_id):
    try:
        db = get_db()
        data = db.get_user_data(user_id)
        if data:
            return jsonify(data)
        else:
            return jsonify({"get_user_data error"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Route for getting all user's previous workouts, with an optional limit 
@app.route('/workouts/<int:user_id>/', defaults={'limit': None})
@app.route('/workouts/<int:user_id>/<int:limit>')
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

# Return all the data regarding a specific gym
@app.route('/gyms/<int:gym_id>')
def get_gym_data(gym_id):
	try:
		db = get_db()
		data = db.get_gym_data(gym_id)
		print("Data:", data)
		if data:
			return jsonify(data)
		else:
			return jsonify({"message": "No gyms found"}), 404
	except Exception as e:
		print(f"Error fetching user data: {str(e)}")
		return jsonify({"error": str(e)}), 500
	
# Return the occupancy rate of a specific gym
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
	
# Running app
if __name__ == '__main__':
    app.run(debug=True)