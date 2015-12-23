'use strict';

let request = require('co-request');
let mocha = require('co-mocha');
let should = require('should');
let app = require('../app');

function getUrl(url) {
    return `http://localhost:3000${url}`;
}


describe('Test long-pooling-chat', function() {

    before(function() {
        app.listen(3000);
    });

    it('Test publish', function* () {
        let res = yield request({
            method: 'post',
            url: getUrl('/publish'),
            formData: {message: 'message'}
        });
        res.statusCode.should.equal(200);
    });

    it('Test subscribe', function* () {
        let subscribePromise = request(getUrl('/subscribe'));

        let publishResult = yield new Promise((resolve, reject) => {
            setTimeout(() => {
                request({
                    method: 'post',
                    url: getUrl('/publish'),
                    formData: {message: 'message'}
                }).then(resolve, reject);
            }, 50);
        });

        publishResult.statusCode.should.equal(200);

        let subscribeResult = yield subscribePromise;
        subscribeResult.statusCode.should.equal(200);
        subscribeResult.body.should.be.equal('message')

    });



});