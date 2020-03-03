const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { urlencoded } = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
// app.get("/", function(req, res) {
//     res.render("index", { title: "day" })
// })
app.get('/', function(req, res) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=baku&appid=4863ecb8a7bcd9a86f6d9c17a70ce904&units=metric';
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on("data", function(data) {
            const weatherdata = JSON.parse(data);
            console.log(weatherdata);
            const temprature = weatherdata.main.temp;
            const description = weatherdata.weather[0].description;
            const presure = weatherdata.main.pressure;
            const humidity = weatherdata.main.humidity;
            console.log(temprature, humidity, description, presure);
            res.render('index', { temprature: temprature, presure: presure, humidity: humidity, description: description });
        })
    })

})


app.listen(process.env.PORT || 3000, function() {
    console.log("Succes")
})


// key : 4863ecb8a7bcd9a86f6d9c17a70ce904