/**
 * @author: <thtiheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @description: Main entry application for the geocode and weather
 * requests. 
 */

import * as axios from 'axios';
import { BuildDev } from './environments/build.dev';
import { CommandLine } from './command-line.tools';
import { MainModel } from './models/main.interface';

export class Main implements MainModel {
  public build_dev;
  constructor({ ...attr }) {
    this.build_dev = new BuildDev({ ...attr });
  }

  async initApp() {

    const commandLine = new CommandLine();
    const encodedAddress = encodeURIComponent(commandLine.argv.address);
    const geocodeUrl = `${this.build_dev.apikeys.googleAPIURL}json?address=${encodedAddress}&key=${this.build_dev.apikeys.googleAPIKey}`;

    try {

      await axios.get(geocodeUrl).then(async (response) => {

        if (response.data.status === 'ZERO_RESULTS') {
          throw new Error('Unable to find that address.');
        }

        console.log('response', response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl = `${this.build_dev.apikeys.forecastIOURL} ${this.build_dev.apikeys.forecastIOKey}/${lat},${lng}`;
        console.log(response.data.results[0].formatted_address);

        return await axios.get(weatherUrl);

      }).then(async (response) => {
        let temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        return await console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
      }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
          console.log('Unable to connect to API servers.');
        } else {
          console.log(e.message);
        }
      });

    } catch (e) {

      await console.log(e);

    }
  }

}

const main = new Main({});
main.initApp();

