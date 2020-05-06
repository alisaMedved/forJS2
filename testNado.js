// import * as R from 'ramda';
// // const data = [
// //     {sourceCode: "001", destinationCode: 1000, destinationName: '1000'},
// //     {sourceCode: "001", destinationCode: 1001, destinationName: '1001'},
// //     {sourceCode: "001", destinationCode: 1002, destinationName: '1002'},
// //     {sourceCode: "001", destinationCode: 1000, destinationName: '1000'},
// //     {sourceCode: "001", destinationCode: 1003, destinationName: '1003'},
// //     {sourceCode: "002", destinationCode: 1000, destinationName: '1000'}
// // ];
//
// let array = [...Array(6000).keys()].map(() => ({
//     sourceCode: "001",
//     destinationCode: 1000,
//     destinationName: '1000'
// }));
//
// console.log(array);
//
//
//
// const t0 = performance.now();
// R.pipe(
//     R.groupBy(R.prop('sourceCode')),
//     values,
//     R.map(R.converge(R.merge, [
//         R.pipe(R.head, R.pick(['sourceCode', 'destinationCode'])),
//         R.pipe(R.map(R.props(['destinationCode', 'destinationName'])), R.transpose, R.zipObj(['destinationCode', 'destinationName']))
//     ]))
// )(array);
// const t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:', result);


const array = [...Array(6000).keys()].map(() => ({
    sourceCode: '001',
    destinationCode: 1000,
    destinationName: '1000',
}));

console.log(array);
