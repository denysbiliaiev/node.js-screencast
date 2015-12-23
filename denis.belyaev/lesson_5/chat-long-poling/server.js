'use strict'

require('./libs/trace');

var koa = require('koa');
var app = koa();
var path = require('path');
var config = require('config');
var jade = require('jade');

app.keys = [config.secret];

var mongoose = require('./libs/mongoose');

//middlewares
app.use(require('koa-favicon')(path.join(config.root, '/public/favicon.ico')));
app.use(require('koa-static')('public'));
app.use(require('koa-logger')());
app.use(require('./middlewares/errors'));
app.use(require('./middlewares/session'));
app.use(require('koa-bodyparser')({
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
    }
}));
//app.use(require('./middlewares/multipartParser'));

var router = require('koa-router')();

router.get('/', function* (next) {
    var html = jade.renderFile(path.join(config.root, '/views/chat.jade'), {user: 'vasya'});
    this.body = html;
});

var EventEmitter  = require('events');
var events = new EventEmitter();

router.get('/subscribe', function* (next) {

    class ConnectionError extends Error {}

    //как правильно ответить через .then или присвоить промис в let message? какой во втором случае будет this? (в последней строке)

    //let message = yield new Promise((resolve, reject) => {
        //events.once('newMessage', resolve);

    yield new Promise((resolve, reject) => {

        //так не правильно.
        events.once('newMessage', (message) => resolve(message));

        this.req.on('close', function(err) {
            events.removeListener('newMessage', resolve);
            reject(new ConnectionError(err));
        })
    })
    //здесь this из замыкания?
    .then((message) => this.body = message)
    .catch((err) => {
        if (err instanceof ConnectionError) {
            return
        } else {
            console.log(err);
            this.throw(err)
        }
    });

    //здесь this текущего соединения?
    this.body = message;
});

let parse = require('co-busboy');
router.post('/publish', function* (next) {
    let parts = parse(this, {
        autoFields: true
    });
    let part;
    while (part = yield parts) { }

    let message = parts.field.message;

    if (!parts.field.message) {
        this.throw(400);
    }

    console.log(parts.field);
    events.emit('newMessage', parts.field.message);
    this.body = 'message sended';
});

app.use(router.routes());

app.listen(3000);