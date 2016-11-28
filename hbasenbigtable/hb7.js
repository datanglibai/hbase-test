var fs = require('fs');
var HBase = require('node-thrift-hbase');
var channels = JSON.parse(fs.readFileSync('./real-ibc-data.json'), 'utf8').data;

var configDes = { host: '13.75.114.94', port: 9090 };
var hbaseClientDes = HBase.client(configDes);


function putToHBase(put) {
    hbaseClientDes.put('data', put, function (err) {
        if (err) {
            console.log('error', err);
            return;
        }
        //console.log(err, 'put is successful');
    });
}

function format(num, size) {    
    var s = Number(num).toFixed(1) + "";
    while (s.length < size) s = "0" + s;
    return s;
}

for (var i = 0; i < data.length; i++) {
    var row = data[i].Key;
    var put = hbaseClientDes.Put(row);
    put.add('info', 'longname', data[i].LongName); // 100 must be string
    put.add('info', 'unit', data[i].Unit);
    putToHBase(put);

    for (var j = 0; j < data[i].Index.length; j++) {
        var put2 = hbaseClientDes.Put(data[i].Key + '|' + format(data[i].Index[j],7));    //row1 is rowKey
        put2.add('data', 'v', data[i].Value[j]);
        putToHBase(put2);
    }
}

