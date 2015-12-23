// Пример использования unref для вспомогательного таймера
var http = require('http');

var server = http.createServer(function(req, res) {
  switch (req.url) {

  case '/shutdown':
    res.end("shutting down");
    console.log("closing, waiting for keep-alive connections to finish");
    this.close(function() {
      console.log("closed");
      process.exit(0);
    });

    break;

  default:
    res.end("up and running!");
  }

});

server.timeout = 6000; // 6s timeout for inactive connections (120s default)
server.listen(3000);

server.unref();

// каждые 5 сек смотрим - нет ли утечек?
// было много версий ноды с утечками, они ещё есть
var timer = setInterval(function() {
  console.log(process.memoryUsage());
}, 5000);

timer.unref();


