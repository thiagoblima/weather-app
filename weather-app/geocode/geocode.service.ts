/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @class: GeoCode
 * @version: 0.1.0
 * @description: Google Geocode API
 */

import { BuildDev } from '../environments/build.dev';
import { CommandLine } from '../command-line.tools';
import { LoggerService } from '../logger';
import * as axios from 'axios';

 export class GeoCode {
     public buildDev;
     public loggerService;
     public commandLine;
     constructor({ ... attr }){
        this.buildDev = new BuildDev({ ...attr });
        this.commandLine = new CommandLine({ ...attr });
        this.loggerService = new LoggerService({ ...attr });
     }

     async getGeoCodeAPI(): Promise<void> {
        const encodedAddress = encodeURIComponent(this.commandLine.argv.address);
        const geocodeUrl = `${this.buildDev.apikeys.googleAPIURL}json?address=${encodedAddress}&key=${this.buildDev.apikeys.googleAPIKey}`;
    
        try {
          await axios.get(geocodeUrl).then(async (response) => {
    
            if (response.data.status === 'ZERO_RESULTS') {
              throw new Error('Unable to find that address.');
            }
    
            this.loggerService.log('response', response);
            const lat = response.data.results[0].geometry.location.lat;
            const lng = response.data.results[0].geometry.location.lng;
            this.loggerService.log('Found address: ', response.data.results[0].formatted_address);
    
            return {
              lat: await lat,
              lng: await lng
            };
    
          }).catch((error) => {
            return this.loggerService.error('An error occured on the requested API', error);
          })
        } catch (error) {
          await this.loggerService.error('An error occured:', error);
        }
      }
   }
 