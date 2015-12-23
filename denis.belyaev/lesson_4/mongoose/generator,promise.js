'use strict'

var co = require('co');
var mongoose = require('./libs/mongoose');
var User = require('./models/user');

//var user = new User({email: 'test@mail.com'});

co(function* () {
    var res = yield [
        //User.create({email: '1@mail.com'}),
        User.find({}),
        User.findOne({email: '1@mail.com'})
    ]
    return res;
})
    .catch((err) => console.log(err))
    .then((res) => {
        console.log(res[1]);
        mongoose.disconnect();
    });

Promise.resolve()
    //.then(() => new User({email: 'testasdsad@mail.com'}))
    //.then(() => user.save())
    .then(() => User.find())
    .catch(console.log)
    .then((res) => {
        console.log(res);
        mongoose.disconnect()
    });
