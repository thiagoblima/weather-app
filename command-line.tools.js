"use strict";
/**
 * @author: <thiagolimasp@live.com> Thiago Lima
 * @class: Commandline
 * @interface: CommandLineModel
 * @instance: argv    @type: <object>
 * @instance: command @type: <string>
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var yargs = require("yargs");
var CommandLine = /** @class */ (function () {
    function CommandLine() {
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
    return CommandLine;
}());
exports.CommandLine = CommandLine;
;
