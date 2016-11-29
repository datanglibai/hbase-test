var bigtable = require('@google-cloud/bigtable')({projectId: 'yourprojectid'});


var callback = function(err, instance, operation){
operation.on('complete', function(){
console.log(operation)});
};

var instance = bigtable.instance('my-instance');

//var options = { families: ['info']};
//var table = instance.createTable('testbigtable', options, function(err, table, apiResponse){console.log(table);});

var table = instance.table('testbigtable');   //this line is required for every data add and query step.

//comment below code next run time since the family is already created.
/*
table.createFamily('info', function(err, family){
   console.log('err', err);
   console.log(family, "created");
});


table.createFamily('dt', function(err, family){ 
	console.log('err', err)	;
	console.log(family, "created");
});
*/
/*
var rows = [
  {
    key: 'testlowercase',
    data: {
      info: {
        name: 'lowercase',
        unit: 'deg'
      },
      dt: {
        999: 132.3,
        999.5: 200.3,
        1000: 223.5,
        1001: 234.6,
        1002: 322.8,
        1003: 245.5,
        value: 300.4
      }
    }
  }
];

table.insert(rows, function(err) {
  if (!err) {
   console.log( 'rows were successfully inserted.');
  }
});

/*
table.getRows(function(err, rows) {
    console.log(rows[0]);
  // `rows` is an array of Row objects.
});
*/
//get row


var myfilter  = [
    {
      column: /^([1-9][0-9]{0,2}|1000)$/
    }
];



table.getRows({keys: ['W1|Wb1|Depth|ECCE'], filter: myfilter}, function(err, rows){
    for (var i = 0; i < rows.length; ++i){
        console.log(rows[i].id, rows[i].data);
        //console.log(rows[i]);
    }
})

/*
var row = table.row('W1|Wb1|Depth|STIT');
row.get(function(err){
	console.log(row.data);
	});
*/

