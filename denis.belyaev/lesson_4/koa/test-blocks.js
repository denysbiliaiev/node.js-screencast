describe("Тест", () => {
    describe("блок_1", function() {
        context("блок_1.1", function() {
            before(function() { console.log('начало блока'); });
            after(function() { console.log('конец блока'); });
            beforeEach(function() { console.log('вход в тест'); });
            afterEach(function() { console.log('выход из теста'); });
            it('тест1', () => { console.log('1') });
            it('тест2', () => { console.log(2); });
        });
        context("блок_1.2", function() {
            before(function() { console.log('начало блока'); });
            after(function() { console.log('конец блока'); });
            beforeEach(function() { console.log('вход в тест'); });
            afterEach(function() { console.log('выход из теста'); });
            it('тест1', () => { console.log('1') });
            it('тест2', () => { console.log(2); });
        })
    });
})