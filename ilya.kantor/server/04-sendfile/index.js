var http = require('http');

var server = new http.Server();

var path = require('path');
var url = require('url');
var fs = require('fs');

// @see https://github.com/lorenwest/node-config/wiki/Configuration-Files (defer!)
var config = require('config');

var publicDir = config.get('publicDir');
// localhost:3000/index.html  -> public/index.html
server.on('request', function(req, res) {

  var urlPath = url.parse(req.url).pathname;
  urlPath = decodeURI(urlPath); // %20

  var filePath = path.join(publicDir, urlPath);

  // ?  ../../../etc/passwd
  if (!filePath.startsWith(publicDir + path.sep)) {
    res.statusCode = 400;
    res.end("Bad request");
    return;
  }

  try {
    var content = fs.readFileSync(filePath);
    res.end(content);
  } catch (e) {
    if (e.code === 'ENOENT') {
      res.statusCode = 404;
      res.end("Not Found");
    } else {
      res.statusCode = 500;
      res.end("Server Error");
    }
  }



});


// http.Server > net.Server > events.EventEmitter
//console.log(server.__proto__.__proto__.__proto__);

server.listen(8080);
