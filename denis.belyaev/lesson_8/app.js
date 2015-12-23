'use strict'

var http = require('http');

var server = new http.Server(function(req, res) {
    res.send('asd');
});

module.exports = server.listen(3000);