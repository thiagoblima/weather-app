/**
 * @author: Thiago Lima
 * @version: 0.1.0
 * @description: env file with sensitive info.
 * @exports: object
 */

import { BuildDevModel } from '../entities/build.interface';
 
export class BuildDev implements BuildDevModel {
    public apikeys;
    constructor({...apikeys}) {
        this.apikeys = {
            googleAPIURL: 'https://maps.googleapis.com/maps/api/geocode/',
            googleAPIKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            forecastIOURL: 'https://api.darksky.net/forecast/',
            forecastIOKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
        } || apikeys;
    }
}