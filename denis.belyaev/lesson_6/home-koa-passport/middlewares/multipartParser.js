var busboy = require('co-busboy');
var fs = require('fs');
var path = require('path');

module.exports = function* (next) {
    if (!this.request.is('multipart/*')) {
        return yield* next;
    }

    var parser = busboy(this, {
        autoFields: true
    });

    var part;
    while (part = yield parts ) {
        this.throw(400, "Files are not allowed here");
    }

    for (var key in parts .fields) {
        console.log(key);
        this.request.body[key] = parts.fields[key];
    }

    yield* next;
};
