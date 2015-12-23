"use strict"

var app = require('koa')();
var router = require('koa-router')();
var co = require('co');
var wait = require('co-wait');

//co(function* () {
//    console.log('start');
//    console.time('sequence');
//
//    //последовательно
//    yield wait(1000);
//    yield wait(2000);
//    yield wait(1000);
//
//    console.timeEnd('sequence');
//    console.log('completed');
//}).then(res => console.log(res));

co(function* () {
    console.log('start');
    console.time('sequence');

    //паралельно
    var a = wait(1000);
    var b = wait(2000);
    var c = wait(1000);

    var res = [a, b, c];

    console.timeEnd('sequence');
    console.log('completed');
}).then(res => console.log(res));
