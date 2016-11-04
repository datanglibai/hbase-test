var fs = require('fs');
var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var channels = JSON.parse(fs.readFileSync('./yourfile.json'), 'utf8').data;

var client = HBase.client(config);
var tableName = 'item';

function putToHBase(put) {
  client.put(tableName, put, function(err){
    if (err) {
      console.log('error', err);
      return;
    }
    console.log(err, 'put is successful');
  });
}

for(var i=0; i<items.length; i++){
  var itemName = items[i].name;
  var row = "w1/wb1/item/" + itemName;
  var put = client.Put(row);
  for(var j=0; j<items[i].values.length; j++){
    var index = items[0].values[j].toString();
    var column = items[i].values[j].toString();
    put.add('data', index, column);
  }
  putToHBase(put);
}


