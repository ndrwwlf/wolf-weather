/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const axios = require('axios');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const apiKey = newFunction();

// const params = {
//   access_key: apiKey,
//   query: 'New York'
// }

exports.getWeather = onRequest((request, response) => {
    const params = {
      access_key: apiKey,
    //   access_key: 'd5a31d631ab03be46c51aafa60344265',
      query: 'New York'
    };
  
    axios.get('https://api.weatherstack.com/current', { params })
      .then(weatherResponse => {
        const apiResponse = weatherResponse.data;
        console.log(response.data);
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        response.send(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      }).catch(error => {
        console.log(error);
        response.status(500).send(error);
      });
  });
  
function newFunction() {
    require('dotenv').config();
    const apiKey = process.env.REACT_APP_API_KEY;
    return apiKey;
}

