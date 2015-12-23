'use strict';

if (process.env.TRACE) {
  require('./libs/trace');
}

var koa = require('koa');
var app = koa();

var config = require('config');

// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];

var path = require('path');
var fs = require('fs');
var middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

// ---------------------------------------

let Router = require('koa-router');

let router = new Router();

let clients = [];

router.get('/subscribe', function*() {

  this.set('Cache-Control', 'no-cache,must-revalidate');
  let promise = new Promise(function(resolve, reject) {
    clients.push(resolve);

    this.res.on('close', function() {
      clients.splice(clients.indexOf(resolve), 1);
      let error = new Error("Connection closed");
      error.code = "ECONNRESET";
      reject(error);
    });

  }.bind(this));

  let message;

  try {
    message = yield promise;
  } catch(err) {
    if (err.code == "ECONNRESET") return;
    throw err;
  }

  // console.log("DONE", message);
  this.body = message;

});

router.post('/publish', function*() {
  // console.log("HERE", this.request.body);
  let message = this.request.body.message;

  if (!message) {
    this.throw(400);
  }

  clients.forEach(function(resolve) {
    resolve(String(message));
  });

  clients.length = 0;

  this.body = 'ok';

});

app.use(router.routes());

app.listen(3000);
