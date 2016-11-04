var fs = require('fs');
var crypto = require('crypto');
var format = require('util').format;
var gcloud = require('gcloud');
var dataset = gcloud.datastore({
    // This environment variable is set by app.yaml when running on GAE, but will
    // need to be manually set when running locally.
    projectId: 'yourprojectid' //process.env.GCLOUD_PROJECT''
});


var data = JSON.parse(fs.readFileSync('./yourfile.json'), 'utf8').data;

savedata();


function savedata() {
    for (var i = data.length - 1; i >= 0; i--) {
        var fp = data[i];
        saveFp('ibc-demo-data', fp);
    };
}


function saveFp(typeName, item) {

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
        dataset.save({
            key: dataset.key([resfilekey.kind, resfilekey.id, 'item']),
            data: {
                id: item.id,               
                comments: item.comments
            }
        }, function (err) {
            if (err) {
                console.log(err);
            }

            console.log('item ' + item.name + ' saved')
        });
    });
}
