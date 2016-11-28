var fs = require('fs');
var hbase = require('hbase');
 
var channels = JSON.parse(fs.readFileSync('./yourdatajson.json'), 'utf8').data;

//SaveToHBase();
SaveToHBaseOneConn();


function SaveToHBaseOneConn(){
    var channelValue;
    var channelName;
    var index;
        
    hbase({ host: '127.0.0.1', port: 8080 }).table('tablename' ).create('familyname', function(err, success){         
        for (var i = 0; i < channels[0].values.length; i++)  
        {
            for(var j=0; j< channels.length; j++)
            {    
                channelValue = channels[j].values[i].toString();
                channelName = channels[j].name;
                index = channels[0].values[i];                
                this.row('rowkey')
                .put('familyname:'+ channelName, channelValue, function(err, success){ 
                    //if (success) console.log("success:" + success);
                }); 
            }
        }
    });    
}


//another version
function SaveToHBase(){
    for (var i = 0; i < 10 ; i++)  
    {    
        for(var j=0; j< data.length; j++)
        { 
            var v = data[j].values[i].toString();
            var n = data[j].name;
            var i = data[0].values[i];
            HBaseCall(i, n, v);
        }  
    }  
}

function HBaseCall(i, n, v){
    hbase({ host: '127.0.0.1', port: 8080 }).table('tablename' ).create('familyname', function(err, success){
        console.log("put: ...");   
        this.row('rowkey')
        .put('familyname:'+ n, v, function(err, success){ }); 
 });
}