var mongoose = require('../libs/mongoose');
var session = require('koa-generic-session');
var mongooseStore = require('koa-session-mongoose');

module.exports = session({
    store: mongooseStore.create({
        model: 'Session'
        //collection: 'sessions',
        //connection: mongoose,
        //expires: 60 * 60 * 24 * 14, // 2 weeks is the default
    })
});