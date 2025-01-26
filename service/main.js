import express from "express";
import ViteExpress from "vite-express";
import { connectToDatabase, importCSVData, getRouteByID, getAirportByID } from "./db.js";

await connectToDatabase();
if (process.argv.length > 2 && process.argv[2] === "import") {
  importCSVData();
} else {
  const app = express();
  app.get("/api/get-route", async (req, res) => {
    // get route id from query params
    const routeId = req.query.routeId;

    // grab route
    const route = await getRouteByID(routeId)
    const sourceAirport = await getAirportByID(route.sourceAirportID)
    const endAirport = await getAirportByID(route.destinationAirportID)
    const respObj = {
      startLong: sourceAirport.longitude_deg,
      startLat: sourceAirport.latitude_deg,
      endLong: endAirport.longitude_deg,
      endLat: endAirport.latitude_deg
    }

    // send response
    res.json(respObj)
  });

  ViteExpress.listen(app, 3000, () => console.log("Server is listening at http://localhost:3000..."));
}