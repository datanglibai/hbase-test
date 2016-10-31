var fs = require('fs');
var crypto = require('crypto');
var format = require('util').format;
var gcloud = require('gcloud');
var dataset = gcloud.datastore({
    // This environment variable is set by app.yaml when running on GAE, but will
    // need to be manually set when running locally.
    projectId: 'well-integrity' //process.env.GCLOUD_PROJECT''
});


var focalpoints = JSON.parse(fs.readFileSync('./ibc-focal-point.json'), 'utf8').focalpoints;

saveFocalPoints();


function saveFocalPoints() {
    for (var i = focalpoints.length - 1; i >= 0; i--) {
        var fp = focalpoints[i];
        saveFp('ibc-demo-data', fp);
    };
}


function saveFp(typeName, focalpoint) {

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
            key: dataset.key([resfilekey.kind, resfilekey.id, 'focal-point']),
            data: {
                id: focalpoint.id,
                scale: focalpoint.scale,
                topDepth: focalpoint.topDepth,
                bottomDepth: focalpoint.bottomDepth,
                timestamp: focalpoint.timestamp,
                logFormat: focalpoint.logFormat,
                visualID: focalpoint.visualID,
                author:focalpoint.author,
                intepretation: focalpoint.intepretation,
                category: focalpoint.category,
                comments: focalpoint.comments
            }
        }, function (err) {
            if (err) {
                console.log(err);
            }

            console.log('focalpoint ' + focalpoint.name + ' saved')
        });
    });
}
