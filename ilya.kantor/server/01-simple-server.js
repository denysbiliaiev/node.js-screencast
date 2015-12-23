// В Node часто используется наследование,
// Далеко не все методы, которые есть в модуле http.Server, описаны в модуле http,
// часть функционала в net, часть в events
// Это и в других ситуациях бывает, документация в родителях
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var config = require('config');
var server = new http.Server();

server.on('request', function(req, res) {
  // if /
    res.end("Hello");
  // else 404
});

console.log(config.get('server.port'), config.get('server.host'));

server.listen(config.get('server.port'), config.get('server.host'));


