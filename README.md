# BetterHousingLottery

BetterHousing is a project for CS330/CS430 at Colby College, developed by Christine Roinou, Changling Li, and Benji Andrews.

The goal of this project is to create a student housing database and webapp that improves upon the current state of housing selection at Colby by increasing information access, ease-of-use, and adding features.

Current features include:

- Student login/registration
- Admin login/registration
- Student view: browse, add/delete rooms from personal queue
- Admin view: browse add/delete rooms from database
- Room sorting filters: building, area (sqft), recently added


# Requirements
To generate room database with provided scripts

- Python v3.8.5

To run the demo:

- NodeJS v14.18.1
- NPM v8.1.3
- Connection to a MongoDB server 

# Instructions to install / run demo 
Edit testing/.env to include your valid MongoDB connection string.

cd testing

npm install

cd client

npm install

cd ..

npm run dev
