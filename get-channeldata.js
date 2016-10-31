var HBase = require('node-thrift-hbase');
var config = {  host: 'localhost', port: 9090};

var client = HBase.client(config);
var tableName = 'channel';


getchanneldata();

function getchanneldata(){
    
    var get = client.Get('w1/wb1/channel/ECCE');
    client.get(tableName,get,function(err,data){ 
    //get users table 
 
    if(err){
        console.log('error:',err);
        return;
    }
    
    console.log(err,data);
 
});    
}