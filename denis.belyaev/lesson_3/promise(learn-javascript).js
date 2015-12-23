"use strict"
//промисы лежат в основе более продвинутых способов асинхронной разработки.

//получить длинный trace?
require('trace');
require('clarify');
// промисификация
let promise = () => {
//Аргумент resolve/reject (только первый, остальные игнорируются) передаётся обработчикам на этом промисе. Обработчики назначаются вызовом .then/catch
    return new Promise((resolve, reject) => {
        blabla;
        //resolve({name: 'vasya'});
        //reject(new Error('server error'));
        //throw Error('server error');//сработает синхронно. catch перезхватит, асинхронный throw нет.
    });
}

//Если PromiseState == "pending" то обработчики добавляются в соответствующие списки (PromiseFulfillReactions[], PromiseRejectReactions[])
//Иначе обработчики сразу помещаются в очередь на выполнение (PromiseJobs[]).

promise()//чейнинг (асинхронные цепочки промисов)
    .then(
        user => user,
        //err => err//по-умолчанию, управление переходит в ближайший .then(onFulfilled). дальше передается ошибка.
        err => {
            console.log('onRejected: throw err, ошибка переходит в следующий ближайший then(onRejected) или .catch(onRejected).');
            throw err//ошибка переходит в следующий ближайший then(onRejected) или .catch(onRejected).
        }
    )
    .then(
        user => {
            console.log(user);// получит err, если ретурнит ошибку с предыдущего промиса
            return new Promise((resolve, reject) => {resolve(user.name)})//возвращает результат, после выполнения промиса. во время выполнения цепочка в ожидании.
        },
        err => {
            console.log('onRejected: return, управление переходит в ближайший .then(onFulfilled)');
            return err;//управление переходит в ближайший .then(onFulfilled)
        }
    )
    .then(
        name => console.log("ответ ${name}")
    )
    .then(null, err => console.log(err))//или такой перехват ошибки
    .catch((err) => console.log(err));//или такой перехват ошибки


   //Параллельное выполнение,  если мы хотим осуществить несколько асинхронных процессов одновременно.
   //если какой-то из промисов завершился с ошибкой, то результатом Promise.all будет эта ошибка.
   Promise
       .all([
            new Promise((resolve, reject) => blabla).catch(err => err),//обрабатываем ошибку, не повалит выполнение, идет результат вместе с остальными результатами.
            Promise.resolve('ok'),//аналогичен конструкции: new Promise((resolve) => resolve(value))
            //Promise.reject('error')//аналогичен конструкции: new Promise((null, reject) => reject(Error))
        ])
        .then(result => console.log(result))
        .catch(console.log);




