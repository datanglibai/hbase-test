var bigtable = require('@google-cloud/bigtable')({projectId: 'well-integrity-dev-1372'});


var callback = function(err, instance, operation){
operation.on('complete', function(){
console.log(operation)});
};

var instance = bigtable.instance('my-instance');

//var options = { families: ['info']};
//var table = instance.createTable('testbigtable', options, function(err, table, apiResponse){console.log(table);});

var table = instance.table('testbigtable');
//console.log(table);

/*
//comment below code next run time since the family is already created.
table.createFamily('info', function(err, family){ 
	console.log('err', err)	;
	console.log(family, "created");
});

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
   console.log('firstkey', ' were successfully inserted.');
  }
});
*/
table.getRows(function(err, rows) {
    console.log(rows[0].id, rows[0].data.info.name);
  // `rows` is an array of Row objects.
});
