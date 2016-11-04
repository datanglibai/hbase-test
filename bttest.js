var bigtable = require('@google-cloud/bigtable')({projectId: 'yourprojectid'});


var callback = function(err, instance, operation){
operation.on('complete', function(){
console.log(operation)});
};

var instance = bigtable.instance('my-instance');

//var options = { families: ['info']};
//var table = instance.createTable('testbigtable', options, function(err, table, apiResponse){console.log(table);});

var table = instance.table('testbigtable');
//console.log(table);


//comment below code next run time since the family is already created.
/*
table.createFamily('dt', function(err, family){ 
	console.log('err', err)	;
	console.log(family, "created");
});

var rows = [
  {
    key: 'W1|Wb1|Depth|STIT',
    data: {
      info: {
        name: 'STIT',
        unit: 'ps'
      },
      dt: {
        999: 2.3,
        999.5: 2.3,
        1000: 2.5,
        1001: 2.6,
        1002: 2.8,
        1003: 2.5,
        value: 3.4
      }
    }
  }
];

table.insert(rows, function(err) {
  if (!err) {
   console.log( 'rows were successfully inserted.');
  }
});


table.getRows(function(err, rows) {
    console.log(rows.length);
  // `rows` is an array of Row objects.
});
*/
//get row

var myfilter = [
    {
      column: /^([1-9][0-9]{0,2}|1000)$/
    }
];

table.getRows({filter: myfilter}, function(err, rows){
    for (var i = 0; i < rows.length; ++i){
        console.log(rows[i].id, rows[i].data);
    }
})

/*
var row = table.row('W1|Wb1|Depth|STIT');
row.get(function(err){
	console.log(row);
	});

*/
