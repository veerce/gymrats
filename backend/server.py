# code is from https://www.geeksforgeeks.org/how-to-connect-reactjs-with-flask-api/

from flask import Flask
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data')
def get_time():
	# Returning an api for showing in reactjs
	return {
		"Name":"Veer",
		"Email": "veermc@gmail.com",
		"Age":"22",
		"AccountNumber": "1234"
		}

	
# Running app
if __name__ == '__main__':
	app.run(debug=True)
