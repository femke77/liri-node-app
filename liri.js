require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

inquirer.prompt([

    {
        type: "list",
        name: "method",
        message: "Please tell LIRI what you want to do.",
        choices: ["concert-this", "spotify-this", "movie-this", "read-from-file"],
    },
    {
        type: "input",
        name: "userInput",
        message: "Enter the artist, band name, song, or movie title or hit enter if reading from file."
        
    }

]).then(function (response) {
    console.log(`${response.method} and ${response.userInput}`);
    concertThis(response.userInput);
});

function concertThis(userInput){
    //for each venue name, loc, date time w moment format
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
    .then(function(response){
        var format = "YYYY-MM-DD HH:mm:ss"
        response.data.forEach(element => {
            var dateTime = element.datetime;
            dateTime = dateTime.split('T').join(' ');
            var convertDateTime = moment(dateTime, format)
            
            console.log(`Venue: ${element.venue.name}
Location: ${element.venue.city}, ${element.venue.region}
Date: ${convertDateTime.format("MM/DD/YY hh:mm A")}
***************************`)
        });

    }) 
    .catch(function(error){
        console.log(`An error has occured: ${error}`);
    })
}