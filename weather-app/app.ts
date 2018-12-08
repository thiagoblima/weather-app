/**
 * @author: <thtiheguy@gmail.com> Thiago Lima
 * @version: 0.1.0
 * @description: Main entry application for the geocode and weather
 * requests. 
 */

import { MainModel } from './models/main.interface';
import { GeoCode } from './geocode/geocode.service';
import { Forecast } from './weather/forecast.service';
import { LoggerService } from './logger';

export class Main implements MainModel {
  public geocode;
  public forecast;
  public loggerService;
  constructor({ ...attr }) {
    this.loggerService = new LoggerService({ ...attr });
    this.geocode = new GeoCode({ ...attr });
    this.forecast = new Forecast({ ... attr });
  }

  async initApp() {
    this.geocode.getGeoCodeAPI().then(async (response) => {
      await this.forecast.getWeather(response);
    }).catch((error) => {
      return this.loggerService.error('An error occured on the servers:', error);
    });

  }

}

const main = new Main({});
main.initApp();
