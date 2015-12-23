var koa = require('koa');
var app = koa();

app.use(function *(next){
    var test = yield next;//  yield* вернет {},  yield  1
    this.body = test;
});

app.use(function *(next){
    return Promise.resolve(1);
});

app.listen(3000);



stream.on('error', (err) => {this.throw(err)})
stream.on('finish', () => 'send')