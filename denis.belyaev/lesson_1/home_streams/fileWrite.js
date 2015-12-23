'use strict'
let fs = require('fs');

let fileWrite = (req, res) => {
    let filePath = './public/file.zip';
//    let fileStream = new fs.WriteStream(filePath, {flags: 'wx'});
    let fileStream = new fs.WriteStream(filePath);

    // +error  +error
    // +close  ^close
    req.pipe(fileStream);

    fileStream.on('error', function(err) {
        if (err.code == 'EEXIST') {
            res.statusCode = 409;
            res.end("Exists already sorry o_O");
            return;
        }
        res.statusCode = 500;
        res.end("Internal error");
        // no destroy
    });

    req.on('close', () => {
       fs.unlink(filePath, err => { /* ignore */ });
       fileStream.destroy();
    })

}

module.exports = fileWrite;