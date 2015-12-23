var koa = require('koa');
var app = koa();
var path = require('path');
var config = require('config');
var jade = require('jade');

//This file must be required at least ONCE.
//After it's done, one can use require('mongoose')
var mongoose = require('./libs/mongoose');
var User = require('./models/user');
app.keys = [config.secret];

//middlewares
app.use(require('koa-favicon')(path.join(config.root, '/public/favicon.ico')));
app.use(require('koa-static')('public'));
app.use(require('koa-logger')());
app.use(require('./middlewares/errors'));
app.use(require('./middlewares/session'));
app.use(require('koa-bodyparser')({
    onerror: function (err, ctx) {
        this.throw('body parse error', 422);
    }
}));

var passport = require('koa-passport')

passport.serializeUser(function(user, done) {
    console.log('serializeUser');
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    console.log('deserializeUser');
    User.findById(id, done);
})

console.log(this.session);

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            return done(null, user);
        });
    }
));

app.use(passport.initialize())
app.use(passport.session())

var Router = require('koa-router')

var public = new Router()

public.get('/', function*() {
    this.body = jade.renderFile(path.join(config.root, '/views/login.jade'));
})

public.post('/login',
    passport.authenticate('local', {
        successRedirect: '/app',
        failureRedirect: '/'
    })
)

public.get('/logout', function*(next) {
    this.logout()
    this.redirect('/')
})

public.post('/custom', function*(next) {
  var ctx = this
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      yield ctx.login(user)
      ctx.body = { success: true }
    }
  }).call(this, next)
})

app.use(public.middleware())

// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
    yield next
  } else {
    this.redirect('/')
  }
})

var secured = new Router()

secured.get('/app', function*() {
  this.body = jade.renderFile(path.join(config.root, '/views/app.jade'));
})

app.use(secured.middleware());

app.listen(3000);
