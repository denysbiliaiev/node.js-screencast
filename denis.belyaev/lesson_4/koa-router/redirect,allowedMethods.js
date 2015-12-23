"use strict"

var koa = require('koa');
var app = koa();
var router = require('koa-router')();
var Boom = require('boom');

router.redirect('/', '/login');//Redirect source to destination URL with optional 30x status code.

router.get('/login', function* () {
    this.body = this.pathname;
});


app.use(router.routes());//Returns router middleware which dispatches a route matching the request.
app.use(router.allowedMethods({
    throw: true,//throw error instead of setting status and header
    notImplemented: () => new Boom.notImplemented(),//throw throw the returned value in place of the default NotImplemented error
    methodNotAllowed: () => new Boom.methodNotAllowed()//throw the returned value in place of the default MethodNotAllowed error
}));

app.listen(3000);
