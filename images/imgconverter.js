const fs = require('fs');

// function base64_encode(file) {
//     var bitmap = fs.readFileSync(file);
//     return new Buffer(bitmap).toString('base64');
// }

// var base64str = base64_encode('template-1.png');
// fs.writeFileSync('template-1.txt', 'data:image/png;base64,' + base64str);
// console.log(base64str, 'end');

const contents = fs.readFileSync('./template-1.png', {encoding: 'base64'});
fs.writeFileSync('template-1.txt', 'data:image/png;base64,' + contents);