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

saveIBC('ibc-demo-data', {
        fileName: 'ibc-example-file',
        wellName: 'ibc-example-well',
        webllboreName: 'ibc-example-webllbore'
    },
    function() {
        for (var i = channels.length - 1; i >= 0; i--) {
            var channel = channels[i];
            saveChannel('ibc-demo-data', channel);
        }
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
    }, function(err) {
        callback(err);
    });
}


function saveChannel(typeName, channel) {

    var queryfilekey = dataset.createQuery(typeName);
    var resfilekey;
    dataset.runQuery(queryfilekey, function(err, entities) {
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
        dataset.save({
            key: dataset.key([resfilekey.kind, resfilekey.id, 'channel']),
            data: {
                name: channel.name,
                values: channel.values,
                unit: ''
            }
        }, function(err) {
            if (err) {
                console.log(err);
            }

            console.log('channel ' + channel.name + ' saved')
        });
    });
}
