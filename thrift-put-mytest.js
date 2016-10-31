var fs = require('fs');
var HBase = require('node-thrift-hbase');
var channels = JSON.parse(fs.readFileSync('./real-ibc-data.json'), 'utf8').data;

var configDes = { host: '13.75.114.94', port: 9090 };
var hbaseClientDes = HBase.client(configDes);


function putToHBase(put) {
    hbaseClientDes.put('channels', put, function (err) {
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

for (var i = 0; i < channels.length; i++) {
    var row = channels[i].Key;
    var put = hbaseClientDes.Put(row);
    put.add('info', 'longname', channels[i].LongName); // 100 must be string
    put.add('info', 'unit', channels[i].Unit);
    putToHBase(put);

    for (var j = 0; j < channels[i].Index.length; j++) {
        var put2 = hbaseClientDes.Put(channels[i].Key + '|' + format(channels[i].Index[j],7));    //row1 is rowKey
        put2.add('data', 'v', channels[i].Value[j]);
        putToHBase(put2);
    }
}

