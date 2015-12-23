var mongoose = require('mongoose');
var config = require('config');

mongoose.set('debug', true);

mongoose.connect(config.mongoDB.url, {
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    }
});

module.exports = mongoose;