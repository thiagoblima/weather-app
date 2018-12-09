/**
 * @author: <thitheguy@gmail.com> Thiago Lima
 * @class: TestCommandLine
 * @version: 0.1.0
 */

import { GeoCode } from '../geocode/geocode.service';
import { LoggerService } from '../logger';
import { BuildDev } from '../environments/build.dev';
import { expect } from 'chai';

if (!global.Promise) {
    global.Promise = require('q');
}
const chai = require('chai');
chai.use(require('chai-http'));

export class TestGeoCode {
    public loggerService;
    public buildDev;
    constructor({ ...attr }){
        this.loggerService = new LoggerService({ ... attr });
        this.buildDev = new BuildDev({ ...attr });
    }

async geoCodeAPI(): Promise<Object> {

    beforeEach('Setting up the userList', async () => { 
        await this.loggerService.getLogResultData('Staring GeoCode Tests', { buildDev: this.buildDev });
    });

    describe('GeoCode', async() => {  
       it('it should GET a JSON with status code 200', (done) => {
            chai.request(`${this.buildDev.apikeys.googleAPIURL}`)
                .get(`json?address=${'683 Inverness Street Oviedo, FL 32765'}&key=${this.buildDev.apikeys.googleAPIKey}`)
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

    return { GeoCode: await GeoCode };
 }
}

const testGeoCode = new TestGeoCode({});
testGeoCode.geoCodeAPI();