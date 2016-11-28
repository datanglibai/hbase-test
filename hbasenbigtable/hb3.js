var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var client = HBase.client(config);

var get = client.Get('row1');
get.add('cf','a');

client.get('setuptest', get, function(err, data){
  if (err) { console.log('error', err); return;}
  console.log(err, data);
});
