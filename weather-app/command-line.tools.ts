
/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @class: Commandline
 * @interface: CommandLineModel
 * @instance: argv    @type: <object>
 * @instance: command @type: <string> 
 *
 */

import * as yargs from 'yargs';

export interface CommandLineModel {
  argv: object;
}

export class CommandLine implements CommandLineModel {
  public argv;
  constructor() {
    this.argv = yargs
    .options({
      a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
      }
    })
    .help()
    .alias('help', 'h')
    .argv;
  }

};