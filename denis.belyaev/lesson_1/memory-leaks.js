'use strict'
var EventEmitter = require('events').EventEmitter;
var db = new EventEmitter();
//db.setMaxListeners(20);

function Request() {
    let self = this;

    this.bigData = new Array(1e6).join('*');

    this.send = function(data) {
        console.log(data);
    }

    this.onError = function(err) {
        self.send(err);
    }

    this.end = function() {
        db.removeListener('data', onData);
    }

    function onData(info) {
        self.send(info);
    }

    db.on('data', onData); //db._events (function handlers  "onData"...)
}

var timer = setInterval(function() {
    //heapDump - модуль для снимков памяти
    let request = new Request();
    //..
    //request.end();
    console.log(process.memoryUsage());
    console.log(db._events);
}, 300);

setTimeout(()=>{
    timer.unref()//очищает ссылку на таймер из событийного цыкла LibUV
    //process.exit(0);//прибить процес со всем содержимым
}, 10000);



