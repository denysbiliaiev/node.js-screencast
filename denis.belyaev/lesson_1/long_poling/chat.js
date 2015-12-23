var clients = [];

exports.subscribe = function(req, res) {
  console.log('-------------- subscribe -----------------');
  console.log('subscribed: ' + res.connection._idleStart);
  clients.push(res);
  res.on('close', function(){
      clients.splice(clients.indexOf(res), 1);
  });

  console.log('count subscribers: ' + clients.length);

}

exports.publish = function(message) {
    console.log('-------------- publish -----------------');
    clients.forEach(function(res) {
        console.log('send to subscriber: ' + res.connection._idleStart);
        res.end(message);
    });

    console.log('send message: ' + message);
    console.log('send subscribers: ' + clients.length);

    clients = [];

}
