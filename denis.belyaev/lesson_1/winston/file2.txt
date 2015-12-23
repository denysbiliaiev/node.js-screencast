'use strict'

let fs = require('fs');
let log = require('./winston')(module);

fs.readFile(__filename, (err, data) => {
    if(err) {
        log.error(err);
    }

    fs.statSync('./file2.txt', (err, stats) => {
        if(err) {
            log.error(err);
        }
        log.info(stats.isFile());
    });

    fs.writeFile('./file2.txt', data, 'utf8', (err) => {
        if(err) {
            log.error(err);
        }
        log.test('The "data to append" was appended to file!');
    });

})


