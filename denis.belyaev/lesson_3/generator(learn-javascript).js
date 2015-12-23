"use strict"
let co = require('co');

//function* generateSequence() {//(генерировать последовательность) «функция-генератор» (generator function)
//    yield '1';
//    yield new Promise((resolve, reject) => resolve('2'));
//    return 3;//следущие вызовы игнорируются, возвращает {"done":true}
//    yield 4;//игнорируется, возвращает {"done":true}
//}
//
//console.log('//перебор через next()');
////воспринимать генератор как «замороженный вызов функции», код находится в начале своего выполнения.
//let generator = generateSequence();// generator function создаёт generator
//
//let one = generator.next();
//console.log(JSON.stringify(one));
//
//let two = generator.next();
//console.log(JSON.stringify(two));
//
//let three = generator.next();
//console.log(JSON.stringify(three));
//
//let four = generator.next();//игнорируется, возвращает {"done":true}
//console.log(JSON.stringify(four));
//
//
//console.log('//композиция генераторов'); //При композиции значения из вложенного генератора выдаются «по мере готовности».
//function* generateSequence2(start, end) {
//    for(let i = start; i <= end; i++) {
//        yield i;
//    }
//}
//console.log('//для преобразования итерируемого объекта в массив [...generateSequence2(0, 5)]')
//let sequence = [...generateSequence2(0, 5)];
//console.log(sequence);
//
////Делегирование
//function* generate1() {
//    //переходит внутрь генератора-аргумента, generate2, выполняет его, и все yield, которые он делает, выходят из внешнего генератора.
//    //Получается — как будто мы вставили код внутреннего генератора во внешний напрямую.
//    //переменные вложенного генератора не попадают во внешний, «делегирование» только выводит результаты yield во внешний поток.
//    //yield* generateSequence2(2,7);//применима только к другому генератору и делегирует ему выполнение.
//    yield* generateSequence2(2, 4);
//    yield* generateSequence2(7, 9);
//
//    //yield* вместо
//    //let gen2 = generateSequence2(2, 7);
//    //yield gen2.next().value;
//
//    yield '22';
//}
//
//let gen1 = generate1();
//console.log('//перебор генератора (композиции) вручную gen1.next()');
//console.log(gen1.next().value);
//console.log(gen1.next().value);
//console.log('//перебор генератора через for .. of');
//for(let value of gen1) {//перебирает с того на котором остановился ручной
//    console.log(value);
//}
//
//
//console.log('//yield — дорога в обе стороны «пинг-понг». Обработка ошибок');
//
////Получается «пинг-понг»: каждый next(value) передаёт в генератор значение, которое становится результатом текущего yield,
////возобновляет выполнение и получает выражение из следующего yield. Исключением является первый вызов next
//function* generateSequence5() {
//    try {//если здесь не указан, споймает снаружи
//        let res = yield 2;//Возвращает value во внешний код, приостанавливая выполнение генератора.
//        yield res + 3;
//        yield err;
//    } catch (e) {
//        console.log(e);
//        throw e;//передаем во внешний try .. catch
//    }
//}
//
//let generator5 = generateSequence5();
//
//generator5.next()// вернет 2
//generator5.next(4)//присвоит res = 4, вернет следущий yield 7
//try {//ловить ошибку или снаружи или внутри
//    generator5.throw(new Error('server error'));
//} catch (e) {
//    console.log(e.message);
//}


//console.log('Плоский асинхронный код');
//
//function* gen6(){
//    let res1 = yield new Promise((resolve, reject) => {
//        resolve(1);
//    });
//    let res2 = yield Promise.resolve(res1 + 1);
//
//    return res2 + 1;
//}
//
//execute(gen6());
//
//function execute (generator, yieldValue) {
//    let next = generator.next(yieldValue);
//
//    if (!next.done) {
//        next.value.then(
//            result => execute(generator, result),
//            err => generator.throw(err)
//        )
//    } else {
//        console.log(next.value);
//    }
//}

console.log('Библиотека «co»');

co(function* () {//co(…) возвращает промис с результатом генератора. можно будет получить через .then
    let result1 = yield* function*() { // генератор
        return Promise.resolve(1);
    }();

    let result17 = yield generate17();

    return result17;
}).then(res => console.log(res)).catch(console.log);

function* generate16() {
    yield* generate17()//generate17() попадает напрямую в библиотеку co
}

function* generate17() {
   let result = yield Promise.resolve(17);
   return result;
}




