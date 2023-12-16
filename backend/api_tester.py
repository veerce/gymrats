import json
import unittest
from server import app

class FlaskTestCase(unittest.TestCase):

    def test_add_exercise(self):
        # Create a test client
        tester = app.test_client(self)

        # Data to be sent to the endpoint
        data = {
            "gym_id": "1", "workout_id": "2", "name": "Squats",
            "sets": 3, "reps": 10, "weight": 50, "duration": None,
            "speed": None, "pace": None, "incline": None
        }

        # Send a POST request to the endpoint
        response = tester.post('/workouts/1/5',
                               data=json.dumps(data),
                               content_type='application/json')

        # Check if the response is as expected
        self.assertEqual(response.status_code, 201)
        self.assertTrue(b'exercise_id' in response.data)  # Check if exercise_id is in response

if __name__ == '__main__':
    unittest.main()
