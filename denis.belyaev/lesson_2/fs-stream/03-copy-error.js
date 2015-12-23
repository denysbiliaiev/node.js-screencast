'use strict'
// Что здесь не так? Как поправить?
var fs = require('fs');

var fileIn = fs.createReadStream(__filename, {highWaterMark: 100});
var fileOut = fs.createWriteStream(__filename + ".out", {highWaterMark: 100});

fileIn.pipe(fileOut);

fileIn.on('error', function(err) {
    if (err.code == 'ENOENT' || err.code == 'EISDIR') {
        console.log('no such file');
    }

    if (err.code == 'EACCES') {
        console.log('permission denied');
    }
    conole.log(err);
});

fileOut.on('error', function(err) {
    if (err.code == 'ENOENT' || err.code == 'EISDIR') {
        console.log('no such file');
    }

    if (err.code == 'EACCES') {
        console.log('permission denied');
    }

    if (err.code == 'EPIPE') {//??net and http
        console.log('Broken pipe');
    }
    conole.log(err);
});
