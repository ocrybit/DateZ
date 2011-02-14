var membersZ = ['getDate','getDay','getFullYear','getHours','getMilliseconds','getMinutes','getMonth','getSeconds','getYear','toDateString','toLocaleDateString','toLocaleTimeString'];
var members = ['getUTCDate','getUTCDay','getUTCFullYear','getUTCHours','getUTCMilliseconds','getUTCMinutes','getUTCMonth','getUTCSeconds','toGMTString','toUTCString','valueOf','getTime'];
var membersStr = ['toLocaleString','toString','toTimeString'];
var membersZSet = ['setDate','setFullYear','setHours','setMilliseconds','setMinutes','setMonth','setSeconds','setTime','setYear'];
var membersSet = ['setUTCDate','setUTCFullYear','setUTCHours','setUTCMilliseconds','setUTCMinutes','setUTCMonth','setUTCSeconds'];
var membersStatic = ['UTC','parse'];
DateZ = function(){
    var d = this;
    d.date = d.dateZ = (arguments.length>1)?new Date( Date.UTC.apply( Date, arguments ) + ( (new Date()).getTimezoneOffset() * 60000 ) ):(arguments.length==1)?new Date(new Date(arguments[0])):new Date();

    d.timezoneOffset = d.dateZ.getTimezoneOffset();

    d._toTZString = function(){
	var hours = Math.floor(Math.abs(d.timezoneOffset)/60);
	hours = (hours < 10)?'0'+hours:hours;
	var minutes = Math.abs(d.timezoneOffset) - hours*60;
	minutes = (minutes < 10)?'0'+minutes:minutes;
	var prefix = (d.timezoneOffset < 0)?'+':'-';
	var abbr = (d.tzAbbreviation==undefined)?'':' ('+d.tzAbbreviation+')';
	return 'GMT'+prefix+hours+minutes+abbr;
    }

    for(var i=0;i<membersZ.length;i++){
	(function(i){
	    d[membersZ[i]] = function(){
		return d.dateZ[membersZ[i]]();}
	})(i);
    }

    for(var i=0;i<membersStr.length;i++){
	(function(i){
	    d[membersStr[i]] = function(){
		return d.dateZ[membersStr[i]].apply(d.dateZ,[]).replace(/GMT[+-]\\d{4} \\(([a-zA-Z]{3,4})\\)/,d._toTZString());}  
	})(i);
    }

    for(var i=0;i<members.length;i++){
	(function(i){
	    d[members[i]] = function(){return d.date[members[i]]();}
	})(i);
    }

    for(var i=0;i<membersStatic.length;i++){
	(function(i){
	    d[membersStatic[i]] = function(){return Date[membersStatic[i]].apply(Date,arguments);}
	})(i);
    }

    for(var i=0;i<membersZSet.length;i++){
	(function(i){
	    d[membersZSet[i]] = function(){
		d.dateZ[membersZSet[i]].apply(d.dateZ,arguments);
		d.date = new Date(d.dateZ.getTime()-d.dateZ.getTimezoneOffset()*1000*60+d.timezoneOffset*1000*60);
		return d;
	    }
	})(i);
    }

    for(var i=0;i<membersSet.length;i++){
	(function(i){
	    d[membersSet[i]] = function(){
		d.date[membersSet[i]].apply(d.date,arguments);
		d.dateZ = new Date(d.date.getTime()+d.date.getTimezoneOffset()*1000*60-d.timezoneOffset*1000*60);
		return d;
	    }
	})(i);
    }

    d.getTimezoneOffset = function(){
	return  d.timezoneOffset;
    }

    d.setTimezoneOffset = function(offset,abbr){
	d.timezoneOffset = offset;
	if(abbr!=undefined){d.tzAbbreviation = abbr;}
	d.dateZ = new Date(d.date.getTime()+d.date.getTimezoneOffset()*1000*60-d.timezoneOffset*1000*60);
	return d;
    }
}
exports.DateZ = DateZ;