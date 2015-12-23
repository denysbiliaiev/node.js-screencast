'use strict'
let winston = require('winston');

function init(module) {
    if (!module) {
        console.log('module not exists');
    }

    let errPath = module.filename.split('\\').slice(-2).join('/');

    let options = {
        levels: {
            error: 0,
            info: 1,
            debug: 2,
            test: 3
        },
        colors: {
            test: 'cyan',
            info: 'green',
            debug: 'blue',
            error: 'red'
        }
    };

    let logger = new winston.Logger({
        levels: options.levels,
        colors: options.colors,
        transports: [
            new winston.transports.Console({
                handleExceptions: false,
                colorize: true,
                level: process.env.NODE_ENV == 'development' ? 'test' : 'error',
                label: errPath,
            }),
            new winston.transports.File({
                handleExceptions: false,
                colorize: true,
                level: process.env.NODE_ENV == 'development' ? 'test' : 'error',
                label: errPath,
                timestamp: function() {
                    return new Date().toLocaleString();
                },
                //formatter: function(options) {
                //    // Return string will be passed to logger.
                //    return options.timestamp() +' '+ options.level.toUpperCase() +' '+ (undefined !== options.message ? options.message : '') +
                //        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                //},
                filename: 'error.log'
            })
        ]
    });

    return logger;
}

module.exports = init;