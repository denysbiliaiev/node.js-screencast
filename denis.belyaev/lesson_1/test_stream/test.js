'use strict'

let fs = require('fs');

let req = fs.ReadStream('./file.txt', {encoding: 'utf-8'});
let file = fs.WriteStream('./file1.txt');

req.on('data', (chunk) => {
    console.log(chunk.length);

    if (!file.write(chunk)) {
        req.pause();//stop emitting data events
    }
});

file.on('drain', () => {
    req.resume();//resume emitting data events
});

req.on('end', () => {
    console.log('req: end');
});
