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
const routesSchema = new mongoose.Schema({
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
const routesTbl = mongoose.model('routes', routesSchema);

const importCSVData = () => {
  const results = []; // Array to hold parsed data

  // Read CSV file and parse it
  fs.createReadStream('./routes.csv')
    .pipe(csv())
    .on('data', (data) => {
      // Push each row into the results array
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
    .on('end', async () => {
      // clear table
      await routesTbl.deleteMany({})

      // Insert parsed data into MongoDB
      await routesTbl.insertMany(results)
      console.log('Data imported successfully!');
    });
};

export { connectToDatabase, importCSVData };

