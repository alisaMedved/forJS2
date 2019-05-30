'use strict';

const data = [
    ['mn', '212-04-26', 'rom'],
    ['com', '312-04-26', 'rom'],
    ['vik', '1923-08-24', 'kkk'],
    ['ibn', '1165-11-16', 'murcia'],
    ['mao zen', '1893-12-26', 'shaol'],
    ['rene dec', '1596-03-31', 'la hao to'],
];

class Person {
    get name() {
        return this[0];
    }
    get birth() {
        return this[1];
    }
    get city() {
        return this[2];
    }
    get age() {
        const difference = new Date() - new Date(this.birth);
        return Math.floor(difference/31536e6);
    }
    toString() {
        return this.name + '  age is  ' + this.age;
    }
}

const query = person => (
    person.name !== '' &&
        person.age > 18 &&
        person.city === 'rom'
);

console.log(data);

data.forEach(person => {
    Object.setPrototypeOf(person, Person.prototype);
    // person.__proto__ = Person.prototype;
});

console.log(data + '');

const res = data.filter(query);
console.dir(res + '');

console.log(Person.prototype);


