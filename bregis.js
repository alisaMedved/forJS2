
import * as R from 'ramda';

const data = [
    {
        name: "jjj",
        code: "123",
        count: 1,
    },
    {
        name: "jjj",
        code: "123",
        count: 2,

    },
    {
        name: "jjj",
        code: "1238",
        count: 17,

    },
    {
        name: "jjjAAAA",
        code: "",
        count: 13,

    },
    {
        name: "jjj371",
        code: "",
        count: 5,

    },
    {
        name: "jjj88",
        code: "",
        count: 6,

    },
    {
        name: "jjj88",
        code: "",
        count: 1,

    },
];
// const gotov = [];
// let masPust = [];
// const masPoln = [];
// data.map(el => {
//     el.code === "" ? masPust.push(el) : masPoln.push(el);
// });
// // console.log(masPust);
// // console.log(masPoln);
//
// masPust.indexOf()

const t = R.difference([1,2,3,4], [7,6,5,4,3]);
console.log(t);
