var request = require('co-request');
var co = require('co');

co(function* () {
    var res = yield request({
        method: 'POST',
        url: 'http://localhost:3000/users',
        json:true,
        body: {email: 'new@user.com'}
    });
    console.log(res.statusCode);
    console.log(res.statusMessage);
    console.log(res.body);

}).catch(console.log);