var mongoose = require('../libs/mongoose');
var mongooseStore = require('koa-session-mongoose');
var session = require('koa-generic-session');

module.exports = session({
    store: mongooseStore.create({
        collection: 'koaSessions',
        connection: mongoose,
        expires: 60 * 60 * 24 * 14, // 2 weeks is the default
        model: 'KoaSession'
    })
});