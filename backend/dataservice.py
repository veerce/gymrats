import sqlite3

class Database:
    def __init__(self, db_name):
        self.db_name = db_name
        self.conn = sqlite3.connect(self.db_name)
        self.cursor = self.conn.cursor()
    
    def close_connection(self):
        self.conn.close()

    def get_all_users(self):
        self.cursor.execute("SELECT * FROM Users")
        data = self.cursor.fetchall()
        return data

    def get_user_data(self, user_id):
        self.cursor.execute("SELECT * FROM Users WHERE user_id = ?", (user_id,))
        data = self.cursor.fetchall()
        return data
    
    def get_prev_workouts(self, user_id):
        self.cursor.execute("SELECT * FROM Workouts WHERE user_id = ? LIMIT 2", (user_id,))
        prev_workouts = self.cursor.fetchall()
        return prev_workouts
        #return [workout[0] for workout in prev_workouts]

    def get_workout_excercises(self, workout_id):
        query = """
            SELECT e.exercise_id, e.exercise_name, e.sets, e.reps, e.weight, e.duration_minutes, e.intensity
            FROM Exercises e
            WHERE e.workout_id = ?
            """
        self.cursor.execute(query, (workout_id,))
        exercise_info = self.cursor.fetchall()
        return exercise_info


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
    pretty_print(db.get_prev_workouts(1))

    print('----------------------------------------------------------------')
    pretty_print(db.get_workout_excercises(1))

    db.close_connection()

if __name__ == "__main__":
    main()  # Replace 'your_database.db' with your database file name
