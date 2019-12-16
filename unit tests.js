//Writing my functions here first. Its easier to test w/o having to go through the prompt and type in input each time.

require("dotenv").config();

const axios = require("axios");
const moment = require("moment");
const inquirer = require("inquirer");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);




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

/**
 * Tests for spotify
 */
//spotifyThis("the sign");         
//spotifyThis("");
//spotifyThis("bbbvhjgjhgjhgb")
//spotifyThis("frozen")
//spotifyThis("heartbreakwarfare")

//---------------------------------------------------------------------------------------------------------------------------------------


function movieThis(userInput){


    

}