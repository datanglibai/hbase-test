var fs = require('fs');
var crypto = require('crypto');
var format = require('util').format;
var gcloud = require('gcloud');
var dataset = gcloud.datastore({
    // This environment variable is set by app.yaml when running on GAE, but will
    // need to be manually set when running locally.
    projectId: 'well-integrity' //process.env.GCLOUD_PROJECT''
});


var channels = JSON.parse(fs.readFileSync('./ibc-data.json'), 'utf8').data;

saveIBC('ibc-entity-data', {
    fileName: 'ibc-example-file',
    wellName: 'ibc-example-well',
    webllboreName: 'ibc-example-webllbore'
},
    function () {
        // for (var k = 0; k < channels[0].values.length; k++) {
        //     for (var i = 0; i < channels.length; i++) {
        //         //var channel = channels[i];
        //         saveChannel('ibc-entity-data', channels[i].name, channels[0].values[k], channels[i].values[k]);
        //     }
        // }

        saveChannel('ibc-entity-data');
    }
);


function saveIBC(typeName, ibcMeta, callback) {
    dataset.upsert({
        key: dataset.key(typeName),
        data: {
            timestamp: new Date(),
            dlisname: ibcMeta.fileName,
            wellName: ibcMeta.wellName,
            wellboreName: ibcMeta.webllboreName
        }
    }, function (err) {
        callback(err);
    });
}


function saveChannel(typeName) {

    var queryfilekey = dataset.createQuery(typeName);
    var resfilekey;
    dataset.runQuery(queryfilekey, function (err, entities) {
        if (err) {
            console.log(err);
        }
        if (entities.length > 0) {
            resfilekey = entities[0].key;
        }

        if (resfilekey == undefined) {
            console.log("no file key find");
            return;
        }
        for (var k = 0; k < channels[0].values.length; k++) {
            for (var i = 0; i < channels.length; i++) {
                dataset.save({
                    key: dataset.key([resfilekey.kind, resfilekey.id, 'channeldata']),
                    data: {
                        name: channels[i].name,
                        index: channels[0].values[k],
                        value: channels[i].values[k],
                        unit: ''
                    }
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }

                    //console.log('channel ' + channelName + ' saved')
                });
            }
        }
    });
}
