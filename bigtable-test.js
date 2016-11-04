var bigtable = require('@google-cloud/bigtable')();

var instance = bigtable.instance('my-instance');

//create instance
instance.create({
  clusters: [
    {
      name: 'my-cluster',
      location: 'us-central1-b',
      nodes: 3
    }
  ]
}, function(err, instance, operation) {
  operation
    .on('error', console.log)
    .on('complete', function() {
        console.log('complete');
      // `instance` is your newly created Instance object.
    });
});

var options = {
  families: ['info']
};

instance.createTable('testtable', options, function(err, table) {});

var rows = [
  {
    key: 'firstkey',
    data: {
      info: {
        name: 'good'
      }
    }
  }
];

table.insert(rows, function(err) {
  if (!err) {
    // Your rows were successfully inserted.
  }
});

table.getRows(function(err, rows) {
    console.log(rows);
  // `rows` is an array of Row objects.
});