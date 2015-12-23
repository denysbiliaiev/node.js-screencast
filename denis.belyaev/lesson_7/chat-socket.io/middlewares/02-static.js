
// Usually served by Nginx
var serve = require('koa-static');

this.respond = false;

module.exports = serve('public');

