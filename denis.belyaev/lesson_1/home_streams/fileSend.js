'use strict'
let fs = require('fs');
let mime = require('mime');

let fileSend = (filePath, res) => {

    mime.lookup(filePath);
    res.setHeader('Content-type', mime + "; charset=utf-8");

    let fileStream = fs.ReadStream(filePath);

    // +error       +error
    // ^обрыв       обрыв?
    fileStream.pipe(res);

    fileStream.on('error', function(err) {
        if (err.code == 'ENOENT' || err.code == 'EISDIR') {
            res.statusCode = 404;
            res.end('No such file');
            return;
        }

        res.statusCode = 500;
        res.end('Server error');
        console.log(err);
    });

    //обрыв соединения
    res.on('close', function() {
        fileStream.destroy();
        console.log('res: close');
    });
}

module.exports = fileSend;