var Readable = require('stream').Readable;

// var rs = new Readable;
// rs.push('beep ');
// rs.push('boop\n');
// rs.push(null);

// rs.pipe(process.stdout);

// var rs1 = new Readable;
// var c = 97;
// rs1._read = function () {
//     rs1.push(String.fromCharCode(c++));
//     if (c > 'z'.charCodeAt(0)) rs1.push(null);
// };

// rs1.pipe(process.stdout);


// var rs2 = new Readable;
// var c = 97 - 1;
// rs2._read = function () {
//     if (c >= 'z'.charCodeAt(0)) return rs2.push(null);

//     setTimeout(function () {
//         rs2.push(String.fromCharCode(++c));
//     }, 100);
// };

// rs2.pipe(process.stdout);

// process.on('exit', function () {
//     console.error('\n_read() called ' + (c - 97) + ' times');
// });

// process.stdout.on('error', process.exit);
// process.stdin.on('readable', function () {
//     var buf = process.stdin.read(3);
//     console.log(buf);
// });

var offset = 0;

process.stdin.on('readable', function () {
    var buf = process.stdin.read();
    if (!buf) return;
    for (; offset < buf.length; offset++) {
        if (buf[offset] === 0x0a) {
            console.dir(buf.slice(0, offset).toString());
            buf = buf.slice(offset + 1);
            offset = 0;
            process.stdin.unshift(buf);
            return;
        }
    }   
});