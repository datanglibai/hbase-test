var HBase = require('node-thrift-hbase');
var fs = require('fs');
//var config = {  host: '', port: 9090};
//var configDes = { host: '13.75.114.94', port: 9090 };
var configSrc = { host: '', port: 9090 };

//var hbaseClientDes = HBase.client(configDes);
var hbaseClientSrc = HBase.client(configSrc);




function writeTofile() {
    var scan = hbaseClientSrc.Scan();
    scan.addStartRow('w1|wb1|depth|CCLU');
    scan.addStopRow('w1|wb1|depth|ECCE');
    scan.add('info');
    scan.add('info', 'longname');
    scan.add('info', 'unit');
    scan.add('data');
    scan.addNumRows(10);

    hbaseClientSrc.scan('channel', scan, function (err, entities) { //get users table 
        let alldata = [];
        console.log(entities.length);
        entities.map(function (data) {
            let dataitemunit = null;
            let dataitemlongname = null;
            let itemName = data.row.split('|')[3];
            let rowkey = itemName + '|depth|wb1|w1';
            console.log(rowkey, data.columnValues.length);
            var infoput = false;
            let indexes = [];
            let values = [];
            data.columnValues.filter(function (columnvalue) {
                if (columnvalue.qualifier === 'unit') dataitemunit = columnvalue.value;
                if (columnvalue.qualifier === 'longname') { dataitemlongname = columnvalue.value; console.log(dataitemlongname);}

                return (columnvalue.family === "data")

                // if (dataitemunit && dataitemlongname && !infoput) {
                //     infoput = true;
                //     console.log((dataitemunit, dataitemlongname));
                //     var put = hbaseClientDes.Put(rowkey);
                //     put.add('info', 'longname', dataitemlongname); // 100 must be string
                //     put.add('info', 'unit', dataitemunit);
                //     hbaseClientDes.put('channels', put, function (err) { //put users table
                //         if (err) { console.log('error:', err); return; }
                //         console.log(err, rowkey + ' put is successfully');
                //     });
                // }

                //if (columnvalue.family === "data") {
                // var put2 = hbaseClientDes.Put(rowkey + '|' + columnvalue.qualifier);    //row1 is rowKey
                // put2.add('data', 'v', columnvalue.value);
                // hbaseClientDes.put('channels', put2);
                //}
            }).map(function (item) {
                indexes.push(item.qualifier);
                values.push(item.value);
            });

            alldata.push({
                "Key": rowkey,
                "ItemName": itemName,
                "LongName": dataitemlongname,
                "Unit": dataitemunit,
                "Index": indexes,
                "Value": values
            });

        });

        var jsoncontent = JSON.stringify(alldata);
        fs.writeFileSync('./realdata.json', jsoncontent);
    });
}

// function scanHbase() {
//     var scan = hbaseClientDes.Scan();
//     scan.addStartRow('AZEC|depth|wb1|w1|03000.0');
//     scan.addStopRow('AZEC|depth|wb1|w1|05000.0');
//     scan.add('data', 'v');
//     scan.addNumRows(5000)
//     hbaseClientDes.scan('channels', scan, function (err, entities) { //get users table 
//         let alldata = [];
//         if(entities) console.log(entities.length);
//         entities.map(function (data) {
//             alldata.push(data.columnValues[0].value)
//         });
//         //console.log(alldata);
//     });

// }

//scanHbase();
writeTofile();



