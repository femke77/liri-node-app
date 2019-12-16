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
        choices: ["concert-this", "spotify-this", "movie-this", "do-what-it-says"],
    },
    {
        type: "input",
        name: "userInput",
        message: "Enter the artist, band name, song, or movie according to the LIRI command you chose previously."
        
    }
]).then(function (response) {
    console.log(`${response.method} and ${response.userInput}`)
});