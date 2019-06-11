'use strict';

module.exports = (chaining, done) => { // экспортируем из вышестоящего модуля
                                        // различные реализации абстракции
                                        // чейнинга и его колбека done
    let count = 0;
    const next = () => (++count === 3 && done ? done() : 0);  // это похоже count - индекс value
                                                                // итер-мом объекте JS
                                                        // и функция для расчета значения свойства done
    chaining
        .for([1, 2, 3, 4])   // применяем методы не к самому массиву
                                // а к массиву возвращенному из абстракции чейнинга chaining...4])
        .filter(item => item % 2 === 0)
        .map(item => item * 2)
        .reduce((a, b) => a + b)
        .fetch((err, result) => {
            if (err) throw err;
            if (!done) console.dir(result);   // если итерация все еще не закончилась
            next();                            // и выводим очередной результат
        });

    chaining                         // переходим к синтаксису колбеков для дальнейшего ухода в ассинхрон
        .for([1, 2, 3, 4])
        .filter((item, cb) => cb(null, item % 2 === 0))
        .map((item, cb) => cb(null, item * 2))
        .reduce((a, b, cb) => cb(null, a + b))
        .fetch((err, result) => {
            if (err) throw err;
            if (!done) console.dir(result);
            next();
        });

    chaining          // process.nextTick позволяет перекинуть часть ремени выполнения в event loop
                            // то есть пока это все будет считаться прога не будет заблокирована,
                            // а сможет взаймодествовать с клавой
                            // с сетью, с базой данных, с портами ввода/вывода

        .for([1, 2, 3, 4])
        .filter((item, cb) => process.nextTick(cb, null, item % 2 === 0))
        .map((item, cb) => process.nextTick(cb, null, item * 2))
        .reduce((a, b, cb) => process.nextTick(cb, null, a + b))
        .fetch((err, result) => {
            if (err) throw err;
            if (!done) console.dir(result);
            next();
        });

    chaining
        .for([1, 2, 3, 4])
        .map((item, cb) => cb(new Error('Something happened')))  // создаем ошибку
        .fetch((err, result) => {              // обработчик ошибок
            if (!done) {
                if (err) console.log(err.message);
                else console.dir(result);
            }
            next();
        });
};
