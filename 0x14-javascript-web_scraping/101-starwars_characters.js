#!/usr/bin/node

const request = require('request');

// Check if the Movie ID is provided as an argument
if (process.argv.length !== 3) {
  console.error('Usage: ./101-starwars_characters.js <Movie-ID>');
  process.exit(1);
}

// Get the Movie ID from the command line argument
const movieID = process.argv[2];

// Create the URL for the Star Wars API request to retrieve movie details
const movieUrl = `https://swapi-api.alx-tools.com/api/films/${movieID}/`;

// Make a GET request to the specified movie URL
request(movieUrl, (error, response, body) => {
  if (error) {
    // If an error occurs during the request, print the error
    console.error(error);
  } else if (response.statusCode !== 200) {
    // If the response status code is not 200, print an error message
    console.error(`Error: Unable to retrieve movie details. Status code: ${response.statusCode}`);
  } else {
    // Parse the JSON response
    const movie = JSON.parse(body);

    // Create an array of character URLs in the same order as the "characters" list in the movie response
    const characterUrls = movie.characters;

    // Function to fetch and print character names in order
    const fetchAndPrintCharacter = (index) => {
      if (index < characterUrls.length) {
        const characterUrl = characterUrls[index];
        // Make a GET request to the character URL
        request(characterUrl, (charError, charResponse, charBody) => {
          if (charError) {
            // If an error occurs during the character request, print the error
            console.error(charError);
          } else if (charResponse.statusCode !== 200) {
            // If the character response status code is not 200, print an error message
            console.error(`Error: Unable to retrieve character details. Status code: ${charResponse.statusCode}`);
          } else {
            // Parse the JSON response for the character and print the character's name
            const character = JSON.parse(charBody);
            console.log(character.name);
            // Fetch and print the next character
            fetchAndPrintCharacter(index + 1);
          }
        });
      }
    };

    // Start fetching and printing characters from the first character URL
    fetchAndPrintCharacter(0);
  }
});
