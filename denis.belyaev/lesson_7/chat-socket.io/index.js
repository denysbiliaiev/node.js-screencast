// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

var koa = require('koa');
var app = koa();

var config = require('config');
var mongoose = require('./libs/mongoose');

// keys for in-koa KeyGrip cookie signing (used in session, maybe other modules)
app.keys = [config.secret];

var path = require('path');
var fs = require('fs');
var middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function(middleware) {
  app.use(require('./middlewares/' + middleware));
});

// ---------------------------------------

// can be split into files too
var Router = require('koa-router');

var router = new Router();

router.get('/', require('./routes/frontpage').get);

router.get('/chat', require('./routes/chat').get);
router.post('/login', require('./routes/login').post);
router.post('/logout', require('./routes/logout').post);
// router.get('/', require('./routes/login').post);

app.use(router.routes());

var io = require('socket.io')(app.listen(3000));

io.set("authorization", function(data, accept) {
  if (this.isAuthenticated()) {
    accept(null, true);
  }
  return accept('No authenticated', false);
});

io.on('connection', function(socket) {
  socket.on('message', function (data) {
    io.emit('new_message', data);
  });
});
