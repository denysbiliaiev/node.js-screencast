// В Node часто используется наследование,
// Далеко не все методы, которые есть в модуле http.Server, описаны в модуле http,
// часть функционала в net, часть в events
// Это и в других ситуациях бывает, документация в родителях
var http = require('http');
var config = require('config');
var url = require('url');

var server = new http.Server(function(req, res) {
    console.log(req.method, req.url);
    var urlParsed = url.parse(req.url, true);
    console.log(urlParsed);
    res.write('Hello ');

    if (urlParsed.pathname == '/') {
      //res.setHeader('Cache-control', 'no-cache, no-store, must-revalidate');
        res.end("pathname: " + urlParsed.pathname + " query: " + urlParsed.query);
        server.close(()=>console.log('close'));
        return;
    }

    res.statusCode = 404;
    res.end('page not found');

}).listen(config.get('server.port'), config.get('server.host'), function() {
    console.log('server listen port:' + config.get('server.port'));
});

server.timeout = 5000;//для keep-Alive можно на уровне сервера, сокета

