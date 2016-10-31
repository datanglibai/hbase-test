var fs = require('fs');
var hbase = require('hbase');
 
var channels = JSON.parse(fs.readFileSync('./ibc-data.json'), 'utf8').data;

//var dept = channels[0];

//SaveToHBase();
SaveToHBaseOneConn();


function SaveToHBaseOneConn(){
    var channelValue;
    var channelName;
    var index;
        
    hbase({ host: '127.0.0.1', port: 8080 }).table('my_sixth_ibc' ).create('channel_values', function(err, success){         
        for (var i = 0; i < channels[0].values.length; i++)  
        {
            for(var j=0; j< channels.length; j++)
            {    
                channelValue = channels[j].values[i].toString();
                channelName = channels[j].name;
                index = channels[0].values[i];
                //console.log("put: " + index + 'at channel_values:'+ channelName + " : "  + channelValue);
                this.row('w1.wb1.depth.'+ index)
                .put('channel_values:'+ channelName, channelValue, function(err, success){ 
                    //if (success) console.log("success:" + success);
                }); 
            }
        }
    });    
}


//another version
function SaveToHBase(){
    for (var i = 0; i < 10 /*channels[0].values.length*/; i++)  
    {    
        for(var j=0; j< channels.length; j++)
        { 
            var channelValue = channels[j].values[i].toString();
            var channelName = channels[j].name;
            var index = channels[0].values[i];
            HBaseCall(index, channelName, channelValue);
        }  
    }  
}

function HBaseCall(index, channelName, channelValue){
    hbase({ host: '127.0.0.1', port: 8080 }).table('my_third_ibc' ).create('channel_values', function(err, success){
        console.log("put: " + index + 'at channel_values:'+ channelName + " : "  + channelValue);   
        this.row('w1.wb1.depth.'+ index)
        .put('channel_values:'+ channelName, channelValue, function(err, success){ }); 
 });
}