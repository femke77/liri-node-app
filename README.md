# LIRI

LIRI is a Language Interpretation and Recognition Interface. More specifically, LIRI is a CLI node app which allows users to enter artists, band names, song or movie titles and get relavent information about the input according to one of several methods presented at startup. The user can chose to get upcoming concert information for an artist/band or detailed information regarding songs and movies. The user can enter the method choice and search value from the CLI prompts or tell LIRI to read their command and search value from a text file. 

## Tech/framework

LIRI is written in JavaScript and uses Node.js runtime environment to function as a command line application. Packages that help LIRI run include inquirer, axios, moment, node-spotify-api, and dotenv. 

## Installation

Since this is a CLI app there is no link to a deployed project. You will need to install this on your computer. 

First clone the github repository to your computer. Then in the terminal of the root directory type:
>npm i

That will grab the information on the libraries required from the package.json and install them. Please provide a spotify api client and secret key in your own .env file if you want to use "spotify-this-song". Once that is included, you can run in terminal: 
>node liri.js

## How to use

**High Level**\

LIRI will prompt the user at runtime to enter one of four choices for the type of information desired. Then it will prompt the user to enter the specific search term. The requested information will appear on the command line screen if the search term was viable. If there is a problem with the search term, LIRI will let the user know. 

**Detailed Instructions with Screenshots**\

The menu will appear in list form and the user must choose 1 option.

![init-menu](https://user-images.githubusercontent.com/23327932/71131855-c4e94400-21aa-11ea-8eff-e8e9c8df9451.png)

To get information about upcoming music concerts, chose "concert-this" and at the next prompt, enter a band or artist name to see what they have coming up using the Bands In Town API.

![concert-this](https://user-images.githubusercontent.com/23327932/71132057-55278900-21ab-11ea-8a6a-f52cc07c18b6.png)

To get information about a specific song, chose "spotify-this-song" and at the next prompt, enter the song. Since many songs have the same or similar names, the output will contain the top 10 matching song titles. The code is already in place to maximize the spotify api's search method, so all you have to do is enter the song title. 

![spotify-this](https://user-images.githubusercontent.com/23327932/71132351-09c1aa80-21ac-11ea-9510-5c6fc22d6c4c.png)

To get detailed information about a movie, chose "movie-this" from the main menu, and enter the movie title you are looking for. This will generate information using the OMDBapi. 

![movie-this](https://user-images.githubusercontent.com/23327932/71132467-64f39d00-21ac-11ea-80c6-9c9e7afca99b.png)

If you want LIRI to read your choices from a file rather than inputting the via the prompts, include a .txt file written in this format:

name-of-method,title\
examples:\
spotify-this-song,The Sign\
movie-this,Limitless\
concert-this,Taylor Swift   

Do not include a space after the comma. Case is irrelavent. 

Put the .txt file in the root directory of the LIRI project and chose "read-from-file" at the main prompt. Hit enter to bypass entering the search term on the command line. 

This screenshot was generated with the following command in a .txt file:

movie-this,the matrix

![read-from-file](https://user-images.githubusercontent.com/23327932/71132730-34f8c980-21ad-11ea-8a97-f94f72b9a8c9.png)

**ERRORS**\
Errors are handled when the user enters bad input, if nothing is found for a search term, or if the user fails to input any search term.
The default song is The Sign by Ace of Base. The default movie is Mr. Nobody. 

![error](https://user-images.githubusercontent.com/23327932/71133475-91f57f00-21af-11ea-99e4-c2c7a94df689.png)

![error2](https://user-images.githubusercontent.com/23327932/71139526-4056ef80-21c3-11ea-94c9-f13b3f2670c5.png)

## Motivation

My role in the development of this app was to code it and write the readme.md. I did this to learn and grow my Node and NPM skills and to improve my writing of readme files. 

## Credits and References for Libraries and APIs included

NPM libraries: Axios, Inquirer, Dotenv, Node-Spotify-API, MomentJS.\
APIs accessed via Axios: (click to see docs)\
[OMDBapi](http://omdbapi.com)\
[Bands in Town API](https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0)

