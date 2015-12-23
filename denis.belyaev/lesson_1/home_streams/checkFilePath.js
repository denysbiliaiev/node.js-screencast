'use strict'
let fs = require('fs');
let path = require('path');

let checkFilePath = function(filePath, res) {
    let ROOT = path.normalize(__dirname + '/public/');

    try {
        filePath = decodeURI(filePath);
    } catch(e) {
        res.statusCode = 404;
        res.end('Bad request');
        return;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 404;
        res.end('Bad request');
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = 404;
        res.end('File not found');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }
    })

    return filePath;
}

module.exports = checkFilePath;