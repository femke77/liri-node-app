require("dotenv").config();

const fs = require("fs");
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
        choices: ["concert-this", "spotify-this-song", "movie-this", "read-from-file"],
    },
    {
        type: "input",
        name: "userInput",
        message: "Enter the artist, band name, song, or movie title or hit enter if reading from file."

    }

]).then(function (response) {

    methods(response.method, response.userInput);

}).catch(function (error) {
    console.log(`An error has occured: ${error}`);
})

function methods(method, input) {
    switch (method) {
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThis(input);
            break;
        case "movie-this":
            movieThis(input);
            break;
        case "read-from-file":
            readFromFile();
            break;
    }
}

function concertThis(userInput) {

    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            if (response.data.length > 0) {
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
            } else {
                console.log("No upcoming events found for that artist or band.")
            }
        })
        .catch(function (error) {
            console.log(`${error}`);
            console.log(`Please enter a band or artist to search.`);
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
            console.log(`An error has occured: ${error}`);
        });
}

function movieThis(userInput) {

    if (userInput === "") {
        userInput = "Mr. Nobody";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&type=movie&plot=short&apikey=trilogy";
    axios.get(queryUrl)
        .then(function (response) {
            if (response.data.Response === "True") {
                console.log(`
Movie Title: ${response.data.Title}
Release Year: ${response.data.Year}
IMDB Rating: ${response.data.imdbRating}
Rotten Tomato Rating: ${response.data.Ratings[1].Value}
Production country: ${response.data.Country}
Plot: ${response.data.Plot}
Actors: ${response.data.Actors}`);
            } else {
                console.log("No movie found with that title. Try again?")
            }

        }).catch(function (error) {
            console.log(`An error has occured: ${error}`);
        })
}

function readFromFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(`An error has occured: ${error}`);
        }
        dataArray = data.split(",")
        var method = dataArray[0];
        var lookup = dataArray[1];
        methods(method, lookup);
    });
}