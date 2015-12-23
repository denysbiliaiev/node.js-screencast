var koa = require('koa');
var app = koa();

//middleware - функция генератор через который проходит поток управления, каждый middleware является оберткой над последующим.
app.use(function *(next){
    var test = yield next;// генератор для вызова последующих middlewares  *{}  без 1
    //this.throw(403);
    this.body = test;
});

app.use(function *(next){
    var res = yield next;
    return res;
    // тоже что и
    return yield* next;//поток идет в след middleware после возврата код ниже не сработает, ответ пойдет выше.

    yield* next;//поток идет в след middleware после возврата сработает код ниже

    return Promise.resolve(2);;
});

app.use(function *(next){
    return Promise.resolve(1);
});

app.listen(3000);