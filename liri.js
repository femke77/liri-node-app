require("dotenv").config();

const axios = require("axios");
const moment = require("moment");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

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
    
    switch (response.method) {
        case "concert-this":
            concertThis(response.userInput);
            break;
        case "spotify-this":
            spotifyThis(response.userInput);
            break;
        case "movie-this":
            movieThis(response.userInput);
            break;
        case "read-from-file":

            break;
        default:
        // code ?
    }

}).catch(function (error) {
    console.log(`An error has occured: ${error}`);
})

function concertThis(userInput){
    
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
    .then(function(response){
        var format = "YYYY-MM-DD HH:mm:ss"
        response.data.forEach(element => {
            var dateTime = element.datetime;
            dateTime = dateTime.split('T').join(' ');
            var convertDateTime = moment(dateTime, format);
            
            console.log(`***************************
Venue: ${element.venue.name}
Location: ${element.venue.city}, ${element.venue.region}
Date: ${convertDateTime.format("MM/DD/YY hh:mm A")}`)
        });
    }) 
    .catch(function(error){
        console.log(`An error has occured: ${error}`);
    });
}


function spotifyThis(userInput) {  
    if (userInput === "") {
        userInput = '"the sign"year:1993'
    }
    spotify
        .search({ type: 'track', query: '"' + userInput + '"', limit: 10 })
        .then(function (response) {
            if (response.tracks.items.length > 0) {
                response.tracks.items.forEach(element => {
                    var artists = [];
                    element.artists.forEach(e => {
                        artists.push(e.name)

                    });
                    console.log("____________________________________");
                    console.log(`
Artist(s): ${artists.join(', ')}
Song name: ${element.name}
Album name: ${element.album.name}
Preview link: ${element.preview_url}`)
                });
            } else {
                console.log("Nothing found with that search input. Try again?")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}