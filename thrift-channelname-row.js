var fs = require('fs');
var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var channels = JSON.parse(fs.readFileSync('./ibc-data.json'), 'utf8').data;

var client = HBase.client(config);
var tableName = 'channel';

function putToHBase(put) {
  client.put(tableName, put, function(err){
    if (err) {
      console.log('error', err);
      return;
    }
    console.log(err, 'put is successful');
  });
}

for(var i=0; i<channels.length; i++){
  var channelName = channels[i].name;
  var row = "w1/wb1/channel/" + channelName;
  var put = client.Put(row);
  for(var j=0; j<channels[i].values.length; j++){
    var index = channels[0].values[j].toString();
    var column = channels[i].values[j].toString();
    put.add('data', index, column);
  }
  putToHBase(put);
}


