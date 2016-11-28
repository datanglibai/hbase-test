var Writable = require('stream').Writable;

// var ws = Writable();
// ws._write = function (chunk, enc, next) {
//     console.dir(chunk);
//     next();
// };

// process.stdin.pipe(ws);

var fs = require('fs');
var ws = fs.createWriteStream('outputdata.txt');

ws.write('To be or not to be, ');
ws.write('this is a question.');

setTimeout(function () {
    ws.end('\n');
}, 1000);