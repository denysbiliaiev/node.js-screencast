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
    // jshint -W084
    while (part = yield parser) {
        //console.log(part);
        part.pipe(fs.createWriteStream('./download/template.jade'))
    }

    for (var key in parser.fields) {
        console.log(key);
        this.request.body[key] = parser.fields[key];
    }

    yield* next;
};
