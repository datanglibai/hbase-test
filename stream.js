var stream = require('stream');
var CryptoJS = require("crypto-js");
var util = require('util');

var fs = require('fs');
var readStream = fs.createReadStream('inputdata.txt');

function EncryptStream(){
    stream.Transform.call(this);

   this._readableState.objectMode = false;
   this._writableState.objectMode = false;
}
util.inherits(EncryptStream, stream.Transform);

EncryptStream.prototype._transform = function(obj, encoding, cb){
    var ciphertext = CryptoJS.AES.encrypt(obj.toString(), 'Transform');
    this.push(ciphertext.toString());
    cb();
};

readStream.pipe(new EncryptStream()).pipe(process.stdout);