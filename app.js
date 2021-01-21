const datastore = require("nedb");
const Database = new datastore("database.db");
Database.loadDatabase();

const { request, response } = require("express");
const express = require("express");
const app = express();
app.listen(3300, () => {
  console.log("welcome to my port 3300!!!");
});
app.use(express.static("PUBLIC"));
app.use(express.json({ limit: "1mb" }));

app.get("/api", (request, response) => {
  Database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log(request.body);
  const data = request.body;

  Database.insert(data);
  response.json({
    status: "SUCCESS!",
    latitude: data.latitude,
    longitude: data.longitude,
    accuracy: data.accuracy,
    timestamp: data.timestamp,
    hobby: data.hobbies,
  });
});
