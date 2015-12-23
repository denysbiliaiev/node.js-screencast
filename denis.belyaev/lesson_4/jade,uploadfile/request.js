var co = require('co');
var request = require('co-request');

co(function* () {
    var res = yield request({
        method: 'post',
        url: 'http://localhost:3000',
        json: true,
        body: {name: 'vasya'}
    });

    return res.body;
})
    .catch(console.log)
    .then(res => console.log(res));