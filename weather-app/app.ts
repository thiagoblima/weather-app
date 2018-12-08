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
import { LoggerService } from './logger';

export class Main implements MainModel {
  public buildDev;
  public loggerService;
  constructor({ ...attr }) {
    this.buildDev = new BuildDev({ ...attr });
    this.loggerService = new LoggerService({ ...attr });
  }

  async initApp() {

    const commandLine = new CommandLine();
    const encodedAddress = encodeURIComponent(commandLine.argv.address);
    const geocodeUrl = `${this.buildDev.apikeys.googleAPIURL}json?address=${encodedAddress}&key=${this.buildDev.apikeys.googleAPIKey}`;

    try {

      await axios.get(geocodeUrl).then(async (response) => {

        if (response.data.status === 'ZERO_RESULTS') {
          throw new Error('Unable to find that address.');
        }

        this.loggerService.log('response', response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl = `${this.buildDev.apikeys.forecastIOURL} ${this.buildDev.apikeys.forecastIOKey}/${lat},${lng}`;
        this.loggerService.log('Found address: ', response.data.results[0].formatted_address);

        return await axios.get(weatherUrl);

      }).then(async (response) => {
        let temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        return await this.loggerService.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
      }).catch((e) => {
        if (e.code === 'ENOTFOUND') {
          this.loggerService.error('Unable to connect to API servers.', e);
        } else {
          this.loggerService.error(e.message);
        }
      });

    } catch (e) {

      await this.loggerService.error('An error occured:', e);

    }
  }

}

const main = new Main({});
main.initApp();

