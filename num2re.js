var toRegexRange = require('to-regex-range');

var re = new RegExp(toRegexRange('1', '99'));
re.test('50');

var rr1 = toRegexRange('1000', '2200')
console.log(rr1);
var re1 = RegExp(rr1);
console.log('1994.5 in [1000, 2200] ?', re1.test('1994.5'));
console.log('994.5 in [1000, 2200] ?', re1.test('994.5'));
console.log('2307 in [1000, 2200] ?', re1.test('2307'));
console.log('1000 in [1000, 2200] ?', re1.test('1000'));
console.log('2200 in [1000, 2200] ?', re1.test('2200'));
//=> 11[1-9]|1[2-9][0-9]|[2-4][0-9]{2}|5[0-4][0-9]|55[0-5]

console.log(toRegexRange('900', '1000'));
//=> 5

console.log(toRegexRange('5', '6'));
//=> [5-6]

console.log(toRegexRange('51', '229'));
//=> 5[1-9]|[6-9][0-9]|1[0-9]{2}|2[0-2][0-9]

console.log(toRegexRange('29', '51'));
//=> 29|[3-4][0-9]|5[0-1]

console.log(toRegexRange('1', '100000'));
//=> [1-9]|[1-9][0-9]{1,4}|100000


var rr7 = toRegexRange('51', '29');
console.log(rr7);
var re7 = RegExp(rr7);
console.log('45 in [51, 29] ?', re7.test('45'));
console.log('54 in [51, 29] ?',re7.test('54'));
console.log('14 in [51, 29] ?',re7.test('14'));
console.log('51 in [51, 29] ?', re7.test('51'));
console.log('29 in [51, 29] ?', re7.test('29'));
//=> 29|[3-4][0-9]|5[0-1]
