
// Usually served by Nginx
var favicon = require('koa-favicon');
var path = require('path');

//module.exports = favicon((path.join(config.root, '/public/favicon.ico')));

module.exports = favicon();
