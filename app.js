"use strict";
/**
 * @author: <thtiheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @description: Main entry application for the geocode and weather
 * requests.
 */
var yargs = require('yargs');
var axios = require('axios');
var buildDev = require('./environments/build-dev');
var argv = yargs
    .options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
    .help()
    .alias('help', 'h')
    .argv;
var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = buildDev.googleAPIURL + "json?address=" + encodedAddress + "&key=" + buildDev.googleAPIKey;
axios.get(geocodeUrl).then(function (response) {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    console.log('response', response);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = buildDev.forecastIOURL + "/" + buildDev.forecastIOKey + lat + "," + lng;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then(function (response) {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log("It's currently " + temperature + ". It feels like " + apparentTemperature + ".");
}).catch(function (e) {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    }
    else {
        console.log(e.message);
    }
});
