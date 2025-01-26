// Code for mongoose config in backend
// To connect with your mongoDB database

const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser'); // csv-parser to read the csv file
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://chzbrgrs:L2tMFEsDvF8SrLiU@flightdb.0adq5.mongodb.net/', {
          useNewUrlParser: true,
          //useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        try {
            await mongoose.connect('mongodb+srv://koi:c1BNM5nfxOP610l4@flightdb.0adq5.mongodb.net/', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
        } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        }
    };
}
// I am quite possible inserting infinite duplicates, so I be dropping (my sanity)
/*
const dropCollection = async () => {
    try {

      await mongoose.connection.dropCollection('routes');
      console.log('Collection dropped successfully');
    } catch (err) {
      console.error('Error:', err);
    } finally {
      mongoose.connection.close();
    }
  };
*/

connectToDatabase();
//dropCollection();

// Schema for users of app
const UserSchema = new mongoose.Schema({
    airline: { type: String, required: true,},
    airlineID: { type: String, required: true,},
    sourceAirport: { type: String, required: false,},
    sourceAirportID: {type: String, required: true,},
    destinationAirport: {type: String, required: false,},
    destinationAirportID: {type: String, required: true,},
    codeshare: {type: String, required: false,},
    stops: {type: String, required: false,},
    equipment: {type: String, required: false,},
});
const User = mongoose.model('routes', UserSchema);
//User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

    resp.send("App is Working");
    // You can check backend is working or not by 
    // entering http://localhost:5000
    
});

const importCSVData = () => {
    const results = []; // Array to hold parsed data
  
    // Read CSV file and parse it
    fs.createReadStream('routes.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Push each row into the results array
        // TODO: Nah cuz why is half the data NaN and/or missing??? I'm too tired
        results.push({
            airline: data.airline,
            airlineID: parseInt(data.airlineID),
            sourceAirport: data.sourceAirport,
            sourceAirportID: parseInt(data.sourceAirportID),
            destinationAirport: data.destinationAirport,
            destinationAirportID: parseInt(data.destinationAirportID),
            codeshare: data.codeshare,
            stops: parseInt(data.stops),
            equipment: data.equipment
        });
      })
      .on('end', () => {
        // Insert parsed data into MongoDB
        User.insertMany(results)
          .then(() => {
            console.log('Data imported successfully!');
          })
          .catch((err) => {
            console.error('Error inserting data:', err);
          });
      });
  };
  
  // Call the function to import data
  importCSVData();
app.listen(5000);
