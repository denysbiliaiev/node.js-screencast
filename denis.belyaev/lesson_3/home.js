"use strict"

let fs = require('mz/fs');
let co = require('co')

fs.readdir(__dirname)
    .then(filesList => {
        return Promise.all(filesList.map((path) => fs.readFile(path).catch(err => err)))
    })
    .then(filesContent =>
        console.log(filesContent)
        //console.log(filesContent.reduce((sum, currentFile) => sum + currentFile))
    )
   .catch(console.log);

//co (function* () {
//    yield fs.readFile('__filename').then(console.log)//.catch(console.log)
//})
//
//process.on('unhandledRejection', (err, p) => {
//    console.log(p);
//});


function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            //if (err) throw err;//then не перехватит это, нужно через reject!
            if (err) reject(err);
            else resolve(data);
        });
    }).catch(err => err);
}

//readFile('__filename')
//    .then(
//        res => console.log(res)
//        //err => console.log(err)//разници с .catch() нет.
//    )
//    .catch(console.log);