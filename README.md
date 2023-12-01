**To test our prototype, follow these steps in order:**
 1. Enter the gymrats directory
	`cd gymrats`
 2. Start the backend
	`cd backend`
	`python3 server.py`
 3. Start the frontend
	 - Go back to the gymrats directory `cd ..`  	
	 - Enter the frontend directory: `cd frontend` 	
	 - Run the frontend: `npm start`
		 - If there are issues with packages not being installed, ensure that all of the packages are installed using: `npm install`
4. View the prototype 
	* The backend should automatically be running on `localhost:5000` and the frontend should start running on `localhost:3000`. If the frontend does not automatically start, go to your browser (Chrome or Firefox) and go to `http://localhost:3000/`. 
	* In your browser's quick settings, go to the 3 lines or dots in the top right corner. Click on More Tools and then Developer Tools. Ensure the dimensions are set to any iPhone, but preferably iPhone 12 Pro

* TO PUSH CHANGES *
  1. git add . --> adds all files to standby
  2. git commit -m "ADD MESSAGE HERE"
  3. git push --> actually push changes to the code
  4. This will commit to samcohn's branch
  5. Then we have to merge to main branch --> may create conflicts 
