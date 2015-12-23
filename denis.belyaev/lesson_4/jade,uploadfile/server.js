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
app.use(require('koa-bodyparser')());
app.use(require('./middlewares/multipartParser'));


var frontRouter = require('koa-router')();

frontRouter.get('/', function* (next) {
    //var fn = jade.compileFile(path.join(config.root, '/views/chat.jade'));
    //var html = fn({user: 'vasya'});
    var html = jade.renderFile(path.join(config.root, '/views/chat.jade'), {user: 'vasya'});
    this.body = html;
});

frontRouter.post('/', function* (next) {
    console.log(this.request.body);
    var html = jade.renderFile(path.join(config.root, '/views/chat.jade'), {user: 'vasya'});
    this.body = html;
});

frontRouter.get('/upload', function* (next) {
    this.body = jade.renderFile(path.join(config.root, '/views/download.jade'));
})

frontRouter.post('/upload', function* (next) {
    this.body = jade.renderFile(path.join(config.root, '/download/template.jade'));
});

app.use(frontRouter.routes());

app.listen(3000);