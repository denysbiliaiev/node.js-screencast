'use strict'
let http = require('http');
let path = require('path');
let url = require('url');
let checkFilePath = require('./checkFilePath');
let fileSend = require('./fileSend');
let fileWrite = require('./fileWrite');

http.createServer((req, res) => {

    if (req.method == 'GET') {
        let urlParsed = url.parse(req.url);

        urlParsed.pathname = (urlParsed.pathname == '/') ? '/main.html' : urlParsed.pathname;
        let filePath = checkFilePath(urlParsed.pathname, res);
        fileSend(filePath, res);
    }

    if (req.method == 'POST') {
        fileWrite(req, res);
    }

}).listen(3000, function() {
    console.log('server listen 3000');
});