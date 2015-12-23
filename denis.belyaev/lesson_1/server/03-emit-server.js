'use strict'

// Выводим события сервера
var http = require('http');

var server = new http.Server();

var emit = server.emit;
server.emit = function(event) {
  console.log(event);
  return emit.apply(this, arguments);
};

server.on('request', function(req, res) {
  if (req.url === '/') {
    res.end("Hello, world!");
  }
});

server.listen(8000);

console.log(server);
