// Code for mongoose config in backend
// To connect with your mongoDB database

import mongoose from 'mongoose';
import fs from 'fs';
import csv from 'csv-parser';

const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        //useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully - chzbrgrs');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    };
}

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

const importCSVData = () => {
  const results = []; // Array to hold parsed data

  // Read CSV file and parse it
  fs.createReadStream('./routes.csv')
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
      console.log(results[0])
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

export { connectToDatabase, importCSVData };

