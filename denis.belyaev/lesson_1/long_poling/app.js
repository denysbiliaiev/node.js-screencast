var http = require('http'),
    url = require('url'),
    fs = require('fs'),
    chat = require('./chat');

var server = new http.Server().listen(3000);

server.on('request', function(req, res) {
  switch(req.url){
      case '/':
          sendFile('index.html', res);
        break;
      case '/subscribe':
          chat.subscribe(req, res);
          break;
      case '/publish':
          var body = '';

          req.on('readable', function() {
              body += req.read();

              if (body.length > 1e4) {
                res.statusCode = 413;
                res.end('you message very big');
              }
          });

          req.on('end', function() {

              try {
                  body = JSON.parse(body);
              } catch(e) {
                  res.statusCode = 400;
                  res.end('bad request');
                  return;
              }
              chat.publish(body.message);
          });

          res.end('ok');
          break;
      default:
          res.statusCode = 404;
          res.end('page not found');

  }
});

function sendFile(file, res) {
    var stream = fs.ReadStream(file);

    stream.on('readable', write);

    function write() {
       var buffer = stream.read();

       if (buffer && !res.write(buffer)) {
           stream.removeListener('readable', write);

           res.once('drain', function() {
               stream.on('readable', write);
           });
       }
    }

    stream.on('close', function() {
       res.end();
    });

    res.on('close', function() {
        stream.destroy();
    });
}




