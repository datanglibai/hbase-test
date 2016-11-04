var HBase = require('node-thrift-hbase');
var config = {  host: '13.75.114.94', port: 9090};

var client = HBase.client(config);

var put = client.Put('A|B|C|D');
put.add('info', 'name', 'm');
client.put('data', put, function(err){
  if (err) {console.log('error', err); return; }
  console.log(err, 'put is successful');
});

