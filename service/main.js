import express from "express";
import ViteExpress from "vite-express";
import { connectToDatabase, importCSVData, getRouteByID, getAirportByID } from "./db.js";

await connectToDatabase();
if (process.argv.length > 2 && process.argv[2] === "import") {
  importCSVData();
} else {
  const app = express();
  app.get("/api/get-route", (req, res) => {
    // get route id from query params
    const routeId = req.query.routeId;

    // grab route
    const route = getRouteByID(routeId)
    const sourceAirport = getAirportByID(route.sourceAirportID)
    const endAirport = getAirportByID(route.destinationAirportID)
    res.json({
      startLong: sourceAirport.longitude,
      startLat: sourceAirport.latitude,
      endLong: endAirport.longitude,
      endLat: endAirport.latitude
    });
  });

  ViteExpress.listen(app, 3000, () => console.log("Server is listening at http://localhost:3000..."));
}