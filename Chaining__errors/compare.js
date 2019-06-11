'use strict';

global.api = {
    metasync: require('metasync')
};

const implementations = (
    ['6-promise', '7-functor', '8-prototype', '9-build']
        .map(name => './' + name + '.js')
        .map(require)
); // implementations - массив загруженных через require
 // реализации  чейнинга: на промисахб, на функторах, прототипах, на фабрике

const test = require('./a-test.js'); // подгрузили файл с тестами для реализаций чейнинга

implementations.map((chaining, i) => {
    console.log('Implementation: #' + i);
    test(chaining);  // запускаем тест с реализациями чейнинга
});

