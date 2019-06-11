'use strict';

class ArrayChain {

    constructor(array) {
        this._promise = Promise.resolve(array);
    }

    then(fn) {
        return this._promise.then(fn);  // вернет промис
    }

    catch(fn) {
        return this._promise.catch(fn); // вернет промис
    }

    fetch(fn) {                         // говорит кому вернуть промис: catch или then
        return (this
                .then(data => fn(null, data))
                .catch(err => fn(err))
        );
    }

    _chain(performer, fn, initial) {      // вернет промис после выполнения
                                       // наших методов(map, reduce и т.п.)

        this._promise = this._promise.then(array => (
            new Promise((resolve, reject) => (
                performer(array, fn, (err, result) => (
                    (err ? reject(err) : resolve(result))
                ), initial)
            ))
        ));
    }

    map(fn) {
        this._chain(api.metasync.map, fn);     // вызов chain
        return this;    // объект с полем промис и со всеми методами
    }

    filter(fn) {
        this._chain(api.metasync.filter, fn);
        return this;
    }

    reduce(fn, initial) {
        this._chain(api.metasync.reduce, fn, initial);
        return this;
    }

    each(fn) {
        this._chain(api.metasync.each, fn);
        return this;
    }

    series(fn) {
        this._chain(api.metasync.series, fn);
        return this;
    }

    find(fn) {
        this._chain(api.metasync.find, fn);
        return this;
    }

}

module.exports = {
    for: array => new ArrayChain(array) // создаем объект с полем промис на основе массива
};