'use strict';

let router = require('koa-router')();
let parse = require('co-busboy');
let EventEmitter = require('events');

let events = new EventEmitter();
events.setMaxListeners(0);

router
    .get('/subscribe', function* (next) {

        class ConnectionError extends Error {        }

        let message;

        try {

            message = yield new Promise((resolve, reject) => {
                events.once('message', resolve);

                this.req.on('close', function(e) {
                    events.removeListener('message', resolve);
                    reject(new ConnectionError(e));
                });

            });

        } catch(e) {
            if (e instanceof ConnectionError) {
                return;
            }  else {
                throw e;
            }
        }

        this.body = message;
    })
    .post('/publish', function* (next) {
        let parts = parse(this, {
            autoFields: true
        });
        let part;
        while (part = yield parts) {
            //
        }

        let message = parts.field.message;

        if (!parts.field.message) {
            this.throw(400);
        }

        events.emit('message', message);
        this.body = 'Your message successfully published';
    });

module.exports = router;