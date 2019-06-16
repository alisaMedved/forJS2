const async = op => {
    switch (op) {                                  // switch со ссылками на методы
        case 'map': return api.metasync.map;
        case 'filter': return api.metasync.filter;
        case 'reduce': return api.metasync.reduce;
        case 'each': return api.metasync.each;
        case 'series': return api.metasync.series;
        case 'find': return api.metasync.find;
    }
};

function ArrayChain(array) {             // конструктор прототипа
    this.array = array;                  // массив который обрабатывается
    this.chain = [];                     // массив операции, все методы что были вызваны для обработки
}           //this.array складываются сюда в порядке вызова

ArrayChain.prototype.execute = function(err) {
    const item = this.chain.shift() || {};
    if (err) {
        if (!item.op) throw err;
        if (item.op === 'catch') {
            item.fn(err);
            return this.execute();
        } else {
            return this.execute(err);
        }
    }
    if (!item.op) return;
    if (item.op === 'then') {
        item.fn(this.array);
        return this.execute();
    }
    const op = async(item.op);
    if (!op) return this.execute();
    op(this.array, item.fn, (err, data) => {
        if (err) return this.execute(err);
        this.array = data;
        this.execute();
    });
};

ArrayChain.prototype.then = function(fn) { // then и catch также лишь пушат себя в массив this.chain
    this.chain.push({ op: 'then', fn });
    return this;
};

ArrayChain.prototype.catch = function(fn) {
    this.chain.push({ op: 'catch', fn });
    return this;
};

ArrayChain.prototype.fetch = function(fn) {                   // все методы лишь складываются
    this.chain.push({ op: 'then', fn: res => fn(null, res) });  // в массив this.chain и начнут
    this.chain.push({ op: 'catch', fn });                 // выполнятся лишь когда начнет выполнятся fetch
    this.execute();
    return this;
};

ArrayChain.prototype.map = function(fn) {      // пушит в массив this.chain объект с двумя полями
    this.chain.push({ op: 'map', fn });     // op - имя метода,  и сам метод саму функцию
    return this;                             // возвращает экземпляр с обрабатываемым collection, массивом
};                     // операции и со всеми методами

ArrayChain.prototype.filter = function(fn) {
    this.chain.push({ op: 'filter', fn });
    return this;
};

ArrayChain.prototype.reduce = function(fn) {
    this.chain.push({ op: 'reduce', fn });
    return this;
};

ArrayChain.prototype.each = function(fn) {
    this.chain.push({ op: 'each', fn });
    return this;
};

ArrayChain.prototype.series = function(fn) {
    this.chain.push({ op: 'series', fn });
    return this;
};

ArrayChain.prototype.find = function(fn) {
    this.chain.push({ op: 'find', fn });
    return this;
};

module.exports = {
    for: array => new ArrayChain(array)  // создание экземпляра
};

/*
 возвращает экземпяляр прототипа со всеми методами -
  возможность для чейнинга. Особенность - методы по мере вызова лишь записываются в массив
  операции прототипа, но не выполняются. Начнут выполнятся вконце когда будет вызван fetch
  - специально для этого созданный динамический метод массива.
 */