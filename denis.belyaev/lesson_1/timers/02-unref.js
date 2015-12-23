//LibUV(C) - кросс платфопменные операции ввода вывода, событийный цикл.
//процесс всего один (запросы на порт), работают внутренние обработчи (чтение файла итд)

var http = require('http');
var fs = require('fs');

process.nextTick(function() {//функция выполнится асинхронно после текущего js, но до любых событий ввода вывода, таймеров и.т.д.
  console.log('nextTick');
});

setImmediate(function() {//разбивает задачу на части.
  console.log('setImmediate');//одна часть может запуститься тут же, другая на след итерации после обработки текущих событий и т д
});

fs.readFile(__filename, 'utf-8', function() {
  console.log('I/O');
});


var server = new http.Server().listen('3000');

setTimeout(function(){server.close()}, 2000);

var timer = setInterval(function() {
  console.log(process.memoryUsage());
}, 1000);

timer.unref();//libUV не учитывает, при проверке внутренних вочеров на завершение процесса.
//timer.ref();//вернуть обратно