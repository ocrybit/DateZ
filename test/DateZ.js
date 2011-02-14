//use nodeunit to run this test
var DateZ  = require('../lib/DateZ').DateZ;
var membersZ = ['getDate','getDay','getFullYear','getHours','getMilliseconds','getMinutes','getMonth','getSeconds','getYear','toDateString','toLocaleDateString','toLocaleTimeString'];
var members = ['getUTCDate','getUTCDay','getUTCFullYear','getUTCHours','getUTCMilliseconds','getUTCMinutes','getUTCMonth','getUTCSeconds','toGMTString','toUTCString','valueOf','getTime'];
var membersStr = ['toLocaleString','toString','toTimeString'];
var membersZSet = ['setDate','setFullYear','setHours','setMilliseconds','setMinutes','setMonth','setSeconds','setTime','setYear'];
var membersSet = ['setUTCDate','setUTCFullYear','setUTCHours','setUTCMilliseconds','setUTCMinutes','setUTCMonth','setUTCSeconds'];
var membersStatic = ['UTC','parse'];
function rand(max,min){
    if(min==undefined){min=0;}
    return Math.floor(Math.random()*(max+1))+min;
}
var setValues = [rand(31,1),rand(2030,1970),rand(23),rand(59),rand(59),rand(11),rand(999),rand(1000*60*60*24*365*60),rand(99)];
exports['DateZ'] = function (test) {
    test.ok(new DateZ());
    test.done();
};
var offset = Math.ceil(Math.random()*540)*Math.pow(-1,Math.ceil(Math.random()*2));
var now = new Date();
var nowZ = new DateZ(now.getTime());
nowZ.setTimezoneOffset(offset);
var now2 = new Date(now.getTime()+(now.getTimezoneOffset()-offset)*60000);
for(var i=0;i<members.length;i++){
    (function(i){
	exports[members[i]] = function (test) {
	    test.equal(nowZ[members[i]](),now[members[i]]());
	    test.done();
	};
    })(i);
}
for(var i=0;i<membersZ.length;i++){
    (function(i){
	exports[membersZ[i]] = function (test) {
	    test.equal(nowZ[membersZ[i]](),now2[membersZ[i]]());
	    test.done();
	};
    })(i);
}
for(var i=0;i<membersStr.length;i++){
    (function(i){
	exports[membersStr[i]] = function (test) {
	    test.ok(nowZ[membersStr[i]]());
	    test.done();
	};
    })(i);
}
for(var i=0;i<membersSet.length;i++){
    (function(i){
	exports[membersSet[i]] = function (test) {
	    nowZ[membersSet[i]](setValues[i]);
	    now2 = new Date(nowZ.getTime()-(nowZ.getTimezoneOffset()-offset)*60000);
	    test.equal(nowZ.getTime(),now2.getTime());
	    test.done();
	};
    })(i);
}
for(var i=0;i<membersZSet.length;i++){
    (function(i){
	exports[membersZSet[i]] = function (test) {
	    nowZ[membersZSet[i]](setValues[i]);
	    now2 = new Date(nowZ.getTime()-(nowZ.getTimezoneOffset()-offset)*60000);
	    test.equal(nowZ.getTime(),now2.getTime());
	    test.done();
	};
    })(i);
}
exports['parse'] = function (test) {
    test.ok(nowZ.parse(now.toString()));
    test.done();
};
exports['UTC'] = function (test) {
    test.ok(nowZ.UTC(rand(2030,1970),rand(11),rand(31,1),rand(23),rand(59),rand(59),rand(999)));
    test.done();
};