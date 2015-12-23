var EventEmitter = require('events').EventEmitter;
var server = new EventEmitter();

server.on('request', function(request) {
    request.approved = true;
});

console.log(NODE_CONFIG_DIR);

server.on('request', function(request) {
    console.log(request);
});

server.on('error', function(err) {
   console.log(err);
});

server.emit('request', {from: "client1"});
server.emit('request', {from: "client2"});
server.emit('error', new Error('server error'));


console.log(EventEmitter.listenerCount(server, 'request'));
console.log(server.listenerCount('request'));
console.log(server.listeners('request'));