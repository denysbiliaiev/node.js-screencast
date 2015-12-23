// пример использования замыкания между запросами

// переменная будет через замыкание доступна всем функциям обработки запроса
var requestCounter = 0;

var http = require('http');
var server = new http.Server();

server.on('request', function(request) {
  if (request.url == '/count') { // браузер просит favicon тоже всегда, поэтому ограничим подсчёт этим урлом
    requestCounter++;
  }
});

// порядок срабатывания обработчиков гарантирован
server.on('request', function(request, response) {
  response.end('Ваш запрос - номер ' + requestCounter);
});

server.listen(3000, function() {
  console.log('Server running at http://127.0.0.1:3000/');
});
