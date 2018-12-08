/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @class: LoggerService
 * @interface: LoggerServiceModel
 * @instance: msg   - @type: <string>
 * @instance: data  - @type: <object>
 */

import { LoggerModel } from './models/logger.interface';

export class LoggerService implements LoggerModel {
    public msg;
    public data;
    constructor({ ...attr }) {
        this.msg = attr.msg;
        this.data = attr.data;
    }
    private log(msg: string, data: {}): void {
        console.log(msg, data);
    }

    private simpleLog(msg: String) {
        console.log(msg);
    }

    private error(msg: string, obj: {}): void {
        console.error(msg, obj);
    }

    public get getLogResultData() {
        return this.log;
    }

    public get getLogResult() {
        return this.simpleLog;
    }

    public get getError() {
        return this.error;
    }


}