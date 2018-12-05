/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @name: weather
 * @description: Forecast IO Service.
 * @exports: @function: getweather
 */

const request = require('request');
const buildDev = require('../environments/build-dev');

var getWeather = (lat, lng, callback) => {
  request({
    url: `${buildDev.forecastIOURL}/${buildDev.forecastIOKey}${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
