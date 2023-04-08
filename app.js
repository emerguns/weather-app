const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = "APIkey";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "&lang=es"

  axios.get(url)
    .then(response => {
      const weatherData = response.data;
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@4x.png";

      res.render("response", { city: query, temp: temp, description: weatherDescription, imageURL: imageURL });
    });

   /* .catch(error => {
      console.error(error);
      res.sendFile(__dirname + "/failure.html");
    });*/
});

/*app.post("/views/response", function(req, res){
  res.redirect("/");
});*/

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000.")
});
