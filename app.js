"use strict";
/**
 * @author: <thtiheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @description: Main entry application for the geocode and weather
 * requests.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var axios = require("axios");
var build_dev_1 = require("./environments/build.dev");
var Main = /** @class */ (function () {
    function Main(_a) {
        var attr = __rest(_a, []);
        this.build_dev = new build_dev_1.BuildDev(__assign({}, attr));
    }
    Main.prototype.initApp = function () {
        var _this = this;
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
        var geocodeUrl = this.build_dev.apikeys.googleAPIURL + "json?address=" + encodedAddress + "&key=" + this.build_dev.apikeys.googleAPIKey;
        axios.get(geocodeUrl).then(function (response) {
            if (response.data.status === 'ZERO_RESULTS') {
                throw new Error('Unable to find that address.');
            }
            console.log('response', response);
            var lat = response.data.results[0].geometry.location.lat;
            var lng = response.data.results[0].geometry.location.lng;
            var weatherUrl = _this.build_dev.apikeys.forecastIOURL + "/" + _this.build_dev.apikeys.forecastIOKey + lat + "," + lng;
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
    };
    return Main;
}());
exports.Main = Main;
var main = new Main({});
main.initApp();
