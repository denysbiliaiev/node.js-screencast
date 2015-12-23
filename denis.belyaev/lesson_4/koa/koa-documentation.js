"use strict"

var app = require('koa')();
var router = require('koa-router')();
var crypto = require('crypto');

app.use(function* (next) {
    //context
        //this.state.user = {name: 'vasya'};
        //console.log(this.state);//namespace for passing information through middleware and to your frontend views
        //console.log(this.app);//Application instance reference.
        //this.respond;//use traditional fn(req, res) functions and middleware within Koa.
        //this.cookies.set('cook', 'test');//
        //this.cookies.get('cook');//
        //
        //try {
        //    //this.throw('not found', 404)
        //    this.assert(this.user, 401, 'User not found. Please login!');//similar to .throw() when !value.
        //} catch(e) {
        //    console.log(e);
        //}


    //this.request (is, type, get) - response, request
        //console.log(this.path);
        //console.log(this.query);//does not support nested parsing
        //console.log(this.querystring);
        //console.log(this.search);
        //console.log(this.charset);

        //console.log(this.request.is('text/html'));//'application/json' Check if the incoming request contains the "Content-Type" header field
        //console.log(this.request.type);//Get request Content-Type
        //console.log(this.request.get('Content-Type'))//Return request header

        //console.log(this.accepts('json', 'html'));// Accept: text/*, application/json
        //console.log(this.acceptsEncodings('gzip'));// Accept-Encoding: 'gzip', 'deflate', 'identity'
        //console.log(this.acceptsCharsets('iso-8859-1;q=0.2'));// Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5
        //console.log(this.acceptsLanguages('uk'));// Accept-Language: en;q=0.8, es, pt

        //console.log(this.length);
        //console.log(this.href);
        //console.log(this.method);
        //console.log(this.url);//request.originalUrl
        //console.log(this.protocol);
        //console.log(this.host);
        //console.log(this.hostname);
        //console.log(this.subdomains);//Return subdomains as an array.
        //console.log(this.ip);
        //console.log(this.ips);
        //console.log(this.fresh);//Check if a request cache is "freshs"
        //console.log(this.stale);//Inverse of request.fresh.
        //console.log(this.header);
        //console.log(this.headers)
        //console.log(this.idempotent);//Check if the request is idempotent.
        //console.log(this.socket);

    //this.response  (get, type, is, header)- has request and response.
        //this.type = 'json';//Set response Content-Type
        //console.log(this.type);//Get response Content-Type
        //console.log(this.response.is('json'));
        //this.attachment(__filename);//download file
        //this.status= 404;
        //console.log(this.message);//this.message = 'not found'; response status message
        //console.log(this.length);//this.length) = 'hello';
        //this.redirect('/test');
        //this.set({//Set response header
        //    'Cache-Control': 'no-cache',
        //    'Content-Type': 'test'
        //});
        //console.log(this.response.get('Content-Type'));
        //console.log(this.lastModified);//Last-Modified header as a Date, if it exists.
        //this.headerSent;//Check if a response header has already been sent.
        //console.log(this.response.header);//this.header it (this.request.header)
        //console.log(this.response.socket);//Request socket.
        //console.log(this.vary('Cache-Control'));
        //this.remove('Cache-Control');
        //this.response.etag = crypto.createHash('md5').update('test').digest('hex');//added Etag header.
        //this.respond = true//чтобы koa ниче не писало в ответ, для пользования нодовскими req, res.

    console.log(this.request.accepts('json', 'html'));// Accept: text/*, application/json
    console.log(this.request.is('multipart/*'));//'application/json' Check if the incoming request contains the "Content-Type" header field
    console.log(this.request.get('Content-Type'));//Get request Content-Type
    console.log(this.request.type);//Get request Content-Type
    this.response.type = 'application/json';
    console.log(this.response.is('json'));
    //this.response.set('Location', '/test');
    //this.status = 301;
    //this.redirect('/user');

    console.log(this.request.body);//post
    this.body = this.path;
});

app.listen(3000);
