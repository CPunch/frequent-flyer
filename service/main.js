import express from "express";
import ViteExpress from "vite-express";
import { connectToDatabase, importCSVData } from "./db.js";

await connectToDatabase();
if (process.argv.length > 2 && process.argv[2] === "import") {
  importCSVData();
} else {
  const app = express();
  app.get("/api/get-path", (_, res) => {
    res.json({
      path: "/api/get-path",
    });
  });

  ViteExpress.listen(app, 3000, () => console.log("Server is listening at http://localhost:3000..."));
}