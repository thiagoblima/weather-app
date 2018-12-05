/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @name: geocode
 * @description: Google Geocode Service.
 * @exports: @function: geocodeAddress
 */

const request = require('request');
const buildDev = require('../environments/build-dev');

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `${buildDev.googleAPIURL}json?address=${encodedAddress}&key=${buildDev.googleAPIKey}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS' || body.status === 'OVER_QUERY_LIMIT') {
      callback('Unable to find that address. \n' + body.error_message);
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
        response: response
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
