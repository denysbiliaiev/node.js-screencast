
var passport = require('koa-passport');

exports.post = function*(next) {
  this.redirect('chat');
  //passport.authenticate('local', {
  //  successRedirect: '/',
  //  failureRedirect: '/'
  //});
};
