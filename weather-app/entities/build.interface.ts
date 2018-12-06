/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @class: BuildDevEntiry
 * @version: 0.1.0
 * @description: env file with sensitive info.
 * @exports: object
 */


export interface BuildDevEntity {
    apikeys: {
       googleAPIURL: string;
       googleAPIKey: string;
       forecastIOURL: string;
       forecastIOKey: string;
    }
}
