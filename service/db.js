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
    equipment: {type: String, required: false,}
});
const routesTbl = mongoose.model('routes', routesSchema);

// schema for airports
const airportSchema = new mongoose.Schema({
  id: { type: String, required: false },
  ident: { type: String, required: false },
  type: { type: String, required: false },
  name: { type: String, required: false },
  latitude_deg: { type: Number, required: false },
  longitude_deg: { type: Number, required: false },
  elevation_ft: { type: String, required: false },
  continent: { type: String, required: false },
  iso_country: { type: String, required: false },
  iso_region: { type: String, required: false },
  municipality: { type: String, required: false },
  scheduled_service: { type: String, required: false },
  gps_code: { type: String, required: false },
  iata_code: { type: String, required: false },
  local_code: { type: String, required: false },
  home_link: { type: String, required: false },
  wikipedia_link: { type: String, required: false },
  keywords: { type: String, required: false }
});
const airportsTbl = mongoose.model('airports', airportSchema);

const importCSVData = () => {
  const routes = []
  const airports = []

  // Read CSV file and parse it
  fs.createReadStream('./routes.csv')
    .pipe(csv())
    .on('data', (data) => {
      // Push each row into the results array
      routes.push({
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
      await routesTbl.insertMany(routes)
      console.log('routes imported successfully!');
    });

  // Read CSV file and parse it
  fs.createReadStream('./airports.csv')
    .pipe(csv())
    .on('data', (data) => {
      // Push each row into the results array
      airports.push({
        id: parseInt(data.id),
        ident: data.ident,
        type: data.type,
        name: data.name,
        latitude_deg: parseFloat(data.latitude_deg),
        longitude_deg: parseFloat(data.longitude_deg),
        elevation_ft: data.elevation_ft,
        continent: data.continent,
        iso_country: data.iso_country,
        iso_region: data.iso_region,
        municipality: data.municipality,
        scheduled_service: data.scheduled_service,
        gps_code: data.gps_code,
        iata_code: data.iata_code,
        local_code: data.local_code,
        home_link: data.home_link,
        wikipedia_link: data.wikipedia_link,
        keywords: data.keywords
      });
    })
    .on('end', async () => {
      // clear table
      await airportsTbl.deleteMany({})

      // Insert parsed data into MongoDB
      await airportsTbl.insertMany(airports)
      console.log('airport imported successfully!');
    });
};

const getAirportByID = (id) => {
  return airportsTbl.findOne({ id: id });
}

const getRouteByID = (id) => {
  return routesTbl.findOne({ id: id });
}

export { connectToDatabase, importCSVData, getAirportByID, getRouteByID };

