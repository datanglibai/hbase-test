var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var client = HBase.client(config);
var tableName = 'whatever';


getchanneldata();

function getchanneldata(){
    
    var get = client.Get('rowkey');
    client.get(tableName,get,function(err,data){ 
    //get users table 
 
    if(err){
        console.log('error:',err);
        return;
    }
    
    console.log(err,data);
 
});    
}