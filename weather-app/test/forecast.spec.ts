/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @class: TestCommandLine
 * @version: 0.1.0
 */

import { Forecast } from '../weather/forecast.service';
import { LoggerService } from '../logger';
import { BuildDev } from '../environments/build.dev';
import { expect } from 'chai';

if (!global.Promise) {
    global.Promise = require('q');
}
const chai = require('chai');
chai.use(require('chai-http'));

export class TestForecast {
    public loggerService;
    public buildDev;
    constructor({ ...attr }) {
        this.loggerService = new LoggerService({ ...attr });
        this.buildDev = new BuildDev({ ...attr });
    }

    async forecastAPI(): Promise<Object> {

        beforeEach('Initializing building process', async () => {
            await this.loggerService.getLogResultData('Staring Forecast Tests, building env:', { buildDev: this.buildDev });
        });

        describe('Forecast IO Tests', async () => {
            it('it should GET a JSON with status code 200', (done) => {
                const responseMock = {
                    lat: -23,
                    lng: -23
                };
                chai.request(`${this.buildDev.apikeys.forecastIOURL}`)
                    .get(`${this.buildDev.apikeys.forecastIOKey}/${responseMock.lat},${responseMock.lng}`)
                    .then((res) => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res).to.not.redirect;
                        done();
                    }).catch((err) => {
                        throw err;
                    });
            });
        });

        return { Forecast: await Forecast };
    }
}

const testForecast = new TestForecast({});
testForecast.forecastAPI();