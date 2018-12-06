/**
 * @author: Thiago Lima
 * @version: 0.1.0
 * @description: env file with sensitive info.
 * @exports: object
 */
import { BuildDevEntity } from '../entities/build.interface';
export declare class BuildDev implements BuildDevEntity {
    apikeys: any;
    constructor({ ...apikeys }: {
        [x: string]: any;
    });
}
