var util = require('util');	
var DateZ = require('DateZ').DateZ;

//suppose your remote server is somewhere in PST zone, which is represented as GMT-0800
var now = new Date(); //built-in
var nowZ = new DateZ(); //Z stands for time"Z"one btw

util.puts(now.toString());
util.puts(nowZ.toString());

//now change the timezone of nowZ for JST(GMT+0900)
nowZ.setTimezoneOffset(-540);

util.puts(now.toString());
util.puts(nowZ.toString());

//note that timezone abbreviations are omitted unless you explicitly specify with setTimezoneOffset
nowZ.setTimezoneOffset(-540, 'JST');
util.puts(nowZ.toString());