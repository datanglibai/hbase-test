// Copyright 2015-2016, Google, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START app]
'use strict';

var format = require('util').format;
var express = require('express');
var gcloud = require('gcloud');
var crypto = require('crypto');

var app = express();
app.enable('trust proxy');

var dataset = gcloud.datastore({
    // This environment variable is set by app.yaml when running on GAE, but will
    // need to be manually set when running locally.
    projectId: 'well-integrity' //process.env.GCLOUD_PROJECT''
});

var apiRouter = require('./router');
app.use('/api', apiRouter);


app.get('/', function(req, res, next) {

    res.status(200).json({ key: 'value' });
});

app.get('/ibc', function(req, res) {

    var query = dataset.createQuery('ibc-data-test');

    dataset.runQuery(query, function(err, entities) {
        if (err) {
            return next(err);
        }

        if (entities.length > 0) {
            var visits = entities.map(function(entity) {
                return format(
                    'Time: %s, filename: %s, key : %s',
                    entity.data.timestamp,
                    entity.data.dlisname,
                    entity.key
                );
            });

            var output = format('IBC dlis files:\n%s', visits.join('\n'));

            res.set('Content-Type', 'text/plain');
            res.status(200).send(output);
        } else {
            dataset.save({
                key: dataset.key('ibc-data-test'),
                data: {
                    timestamp: new Date(),
                    //channels:[{channelName:"GR",dataSet:[{index: 4000,value: 205},{index: 4001,value: 203}]},{channelName:"LITH",dataSet:[{index: 4000,value: 15},{index: 4001,value: 13}]}]
                    dlisname: 'ibc-data-from-maxwell'
                }
            }, function(err) {
                if (err) {
                    return next(err);
                }
            });
        }
    }); //end of runquery
}); // end of '/ibc'



app.get('/ibc/channels', function(req, res, next) {

    var query = dataset.createQuery('channels-with-parent');
    //.filter('done', '=', false)
    dataset.runQuery(query, function(err, entities) {
        if (err) {
            return next(err);
        }

        if (entities.length > 0) {
            var visits = entities.map(function(entity) {
               console.dir(entity);
                return format(
                    'Filekey: %s, channelname: %s',                    
                    entity.key.id,                    
                    entity.data.channelname
                );
            });

            var output = format('Channels:\n%s', visits.join('\n'));

            res.set('Content-Type', 'text/plain');
            res.status(200).send(output);
        } else {
            var queryfilekey = dataset.createQuery('ibc-data-test');
            var resfilekey;
            dataset.runQuery(queryfilekey, function(err, entities) {
                if (err) {
                    return next(err);
                }
                if (entities.length > 0) {
                    resfilekey = entities[0].key;
                }

                if (resfilekey == undefined) {
                    res.status(200).send("no file key find");
                    return;
                }
                dataset.save({
                    key: dataset.key([resfilekey.kind, resfilekey.id, 'channels-with-parent']),
                    data: {
                        channelname: 'GR'                        
                    }
                }, function(err) {
                    if (err) {
                        return next(err);
                    }
                });

                dataset.save({
                    key: dataset.key([resfilekey.kind, resfilekey.id, 'channels-with-parent']),
                    data: {
                        channelname: 'LITH'                        
                    }
                }, function(err) {
                    if (err) {
                        return next(err);
                    }
                });
            });

            res.set('Content-Type', 'text/plain');
            res.status(200).send("OK.");

        }
    }); //end of runquery
}); //end of '/ibc/gr'


/* Start the server */
var server = app.listen(process.env.PORT || 8080, '0.0.0.0', function() {
    console.log('App listening at http://%s:%s', server.address().address,
        server.address().port);
    console.log('Press Ctrl+C to quit.');
});
// [END app]


function saveDataMeta(meta) {

}

function saveChannel (channel) {
      
}

function saveChannelData (data) {
     
}