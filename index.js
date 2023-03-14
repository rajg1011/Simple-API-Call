const express = require("express");
const https = require("https");  // require https
const bodyParse = require("body-parser");
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  var cityName = req.body.cityName;
  var URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=3dec6948d8db1567671c8de1af0ef9a4`;
  https.get(URL, (response) => {   // to get from external server
    response.on("data", (data) => {    //both data have same spelling.
      var fullData = JSON.parse(data);
      var latitudes = fullData[0].lat;
      var longs = fullData[0].lon;
      res.write(`<h1>The Latitude of ${cityName} ${latitudes}</h1>`);
      res.write(`<h1>The Longititude of ${cityName} ${longs}</h1>`);
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server Started");
});
