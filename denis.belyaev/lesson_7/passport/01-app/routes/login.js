
var passport = require('koa-passport');

exports.post = function*(next) {

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  });

};
