"use strict"

var koa = require('koa');
var app = koa();
var Router = require('koa-router');

var userRouter = new Router( { prefix: '/users' } );//Router prefixes
var postRouter = new Router();//for Nested routers with prefixes not work

// /users/8/posts
postRouter.get('/',
    function* (next) {
        this.body = this.request.path;
    }
);

// /users/8/posts/22
postRouter.get('/:id',
    function* (next) {
        this.body = this.request.path;
    }
);

userRouter.use('/:id/posts', postRouter.routes(), postRouter.allowedMethods());//Nested routers  /users/:id/posts/:id

app.use(postRouter.routes());

app.listen(3000);
