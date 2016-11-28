var HBase = require('node-thrift-hbase');
var fs = require('fs');
var configSrc = { host: '104.198.50.78', port: 9090 };

var hbaseClientSrc = HBase.client(configSrc);

function writeTofile2() {
    var scan = hbaseClientSrc.Scan();
    scan.addStartRow('w1|wb1|depth|CCLU');
    scan.addStopRow('w1|wb1|depth|ECCE');
    scan.add('info');
    scan.add('info', 'longname');
    scan.add('info', 'unit');
    scan.add('data');
    scan.addNumRows(10);
    
    console.log(scan);

    hbaseClientSrc.scan('channel', scan, function (err, entities) { 
        var alldata = [];
        console.log(entities.length);
        entities.map(function (data) {
            var datachannelunit = null;
            var datachannellongname = null;
            var channelName = data.row.split('|')[3];
            var rowkey = channelName + '|depth|wb1|w1';
            console.log(rowkey, data.columnValues.length);
            var infoput = false;
            var indexes = [];
            var values = [];
            data.columnValues.filter(function (columnvalue) {
                if (columnvalue.qualifier === 'unit') datachannelunit = columnvalue.value;
                if (columnvalue.qualifier === 'longname') { datachannellongname = columnvalue.value; console.log(datachannellongname);}

                return (columnvalue.family === "data")             
            }).map(function (item) {
                indexes.push(item.qualifier);
                values.push(item.value);
            });

            alldata.push({
                "Key": rowkey,
                "ChannelName": channelName,
                "LongName": datachannellongname,
                "Unit": datachannelunit,
                "Index": indexes,
                "Value": values
            });

        });

        var jsoncontent = JSON.stringify(alldata);
        fs.writeFileSync('./real-ibc-data.json', jsoncontent);
    });
}
writeTofile2();



