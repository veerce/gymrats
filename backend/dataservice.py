import sqlite3
from flask import g
import datetime

class Database:
    def __init__(self, db_name):
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
    
    def close_connection(self):
        self.conn.close()

    def execute_query(self, query, params=None):
        self.cursor.execute(query, params)
        self.conn.commit()
    
    def fetch_data(self, query, params=None):
        self.execute_query(query, params)
        data = self.cursor.fetchall()
        return data

    def get_all_users(self):
        query = "SELECT * FROM Users"
        return self.fetch_data(query)

    def get_user_data(self, user_id):
        try:
            query = "SELECT * FROM Users WHERE user_id = ?"
            return self.fetch_data(query, (user_id,))
        except Exception as e:
            print(f"Error in get_user_data: {str(e)}")
            raise  # Re-raise the exception to see the full traceback
    
    def get_prev_workouts(self, user_id, limit=None):
        # Base query with ORDER BY clause to sort by date and time in descending order
        query = "SELECT * FROM Workouts WHERE user_id = ? ORDER BY date DESC, time DESC"

        # Add LIMIT clause if a limit is provided
        if limit is not None:
            query += " LIMIT ?"
            params = (user_id, limit)
        else:
            params = (user_id,)

        # Execute the query
        self.cursor.execute(query, params)
        prev_workouts = self.cursor.fetchall()
        return prev_workouts
    
    def get_workout_date_time(self, workout_id):
        query = "SELECT date, time FROM Workouts WHERE workout_id = ?"
        result = self.fetch_data(query, (workout_id,))

        if result:
            workout_date, workout_time = result[0]
            return {'date': workout_date, 'time': workout_time}
        else:
            return None

    def get_workout_exercises(self, workout_id):
        query = """
            SELECT e.exercise_id, e.exercise_name, e.sets, e.reps, e.weight, e.duration_minutes, e.intensity
            FROM Exercises e
            WHERE e.workout_id = ?
            """
        self.cursor.execute(query, (workout_id,))
        exercise_info = self.cursor.fetchall()
        return exercise_info
    
    def get_gym_data(self, gym_id):
        self.cursor.execute("SELECT * FROM Gyms WHERE gym_id = ?", (gym_id,))
        gym_data = self.cursor.fetchall()
        return gym_data

    def get_gym_occupancy(self, gym_id):
        # get the maximum capacity value for the gym
        self.cursor.execute("SELECT maximum_capacity FROM Gyms WHERE gym_id = ?", (gym_id,))
        result = self.cursor.fetchone()
        if result is None:
            raise ValueError("Gym not found")
        
        max_capacity = result[0]

        # go into the equipment db and count how many pieces of equipment are being used
        self.cursor.execute("SELECT COUNT(*) FROM Equipment WHERE gym_id = ? AND is_used = 1", (gym_id,))
        used_equipment_count = self.cursor.fetchone()[0]
        print("Equipment count", used_equipment_count)

        # return the percentage (count / max_capacity)
        occupancy_rate = 0
        if max_capacity > 0:
            occupancy_rate = (used_equipment_count / max_capacity) * 100

        print("Occupancy Rate", occupancy_rate)

        return occupancy_rate
    
    def add_exercise(self, workout_id, equipment_id, exercise_name, sets=None, reps=None, weight=None, duration=None, intensity=None):
        query = """
            INSERT INTO Exercises (workout_id, equipment_id, exercise_name, sets, reps, weight, duration_minutes, intensity)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """ 
                    
        self.cursor.execute(query, (workout_id, equipment_id, exercise_name, sets, reps, weight, duration, intensity))
        self.conn.commit()
        return self.cursor.lastrowid

    def create_workout(self, user_id):
        # this function will create a new entry in this table with a user_id, date, duration time of 00:00:00
        workout_date = datetime.date.today().strftime("%Y-%m-%d")

        default_time = "00:00:00"

        query = """INSERT INTO Workouts (user_id, date, time)
        VALUES (?, ?, ?)
        """
        self.cursor.execute(query, (user_id, workout_date, default_time))
        self.conn.commit()
        return self.cursor.lastrowid 

    def update_workout(self, workout_id, duration):
        # this function will update the 'time' field of the workout
        query = """UPDATE Workouts SET time = ? WHERE workout_id = ?"""
        try:
            self.cursor.execute(query, (duration, workout_id))
            self.conn.commit()
            if self.cursor.rowcount == 0:
                return False
            return True

        except Exception as e:
            print(f"An error occurred: {e}")
            return False

def pretty_print(data):
    if not data:
        print("No data to display")
        return
    
    if isinstance(data[0], dict):
        headers = tuple(data[0].keys())
        column_widths = [max(len(str(row[col])) if row[col] is not None else 0 for row in data) for col in headers]
        header_format = ' '.join('{{:<{}}}'.format(width) for width in column_widths)
        print(header_format.format(*headers))
    else:
        for row in data:
            print(' '.join('{:<{}}'.format(value if value is not None else "--", len(str(value)) if value is not None else 0) for value in row))


# only for testing purposes
def main():
    db_name = 'workout_app.db' # change db_name here
    db = Database(db_name)

    print('----------------------------------------------------------------')
    pretty_print(db.get_user_data(1))

    print('----------------------------------------------------------------')
    pretty_print(db.get_prev_workouts(1, 2))

    print('----------------------------------------------------------------')
    pretty_print(db.get_workout_excercises(1))

    print('----------------------------------------------------------------')
    pretty_print(db.get_gym_data(1))

    print('----------------------------------------------------------------')
    print(db.get_gym_occupancy(1))

    # print('----------------------------------------------------------------')
    # print(db.add_exercise(1, 4, "Run", duration=30, intensity=6))

    # print('----------------------------------------------------------------')
    # print(db.create_workout(1))

    # print('----------------------------------------------------------------')
    # print(db.update_workout(14,"11:30:00"))

    db.close_connection()

if __name__ == "__main__":
    main()  # Replace 'your_database.db' with your database file name
