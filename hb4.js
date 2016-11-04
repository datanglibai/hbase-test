var fs = require('fs');
var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var channels = JSON.parse(fs.readFileSync('./ibc-data.json'), 'utf8').data;

var client = HBase.client(config);
var tableName = 'test_ibc2';

function putToHBase(put) {
  client.put(tableName, put, function(err){
    if (err) {
      console.log('error', err);
      return;
    }
    console.log(err, 'put is successful');
  });
}

for(var i=0; i<channels[0].values.length; i++){
  var row = "w1/wb1/depth/" + channels[0].values[i];
  var put = client.Put(row);
  for(var j=0; j<channels.length; j++){
    var column = channels[j].name;
    var value = channels[j].values[i].toString();
    put.add('cv', column, value);
//    console.log(">>>>>>>>>>>>>>>>"+"Row:"+row+"\tColumn:"+column+"\tValue:"+value);
  }
  putToHBase(put);
}


