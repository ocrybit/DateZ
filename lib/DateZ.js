DateZ = function(){
    this._argumentsToString = function(args){
	var arg = '';
	for(var i=0;i<args.length;i++){
	    arg += (i!=0)?',':'';
	    arg += 'arguments['+i+']'; 
	}
	return arg;
    }
    var arg = this._argumentsToString(arguments);
    eval('this.date = new Date('+arg+')');
    eval('this.dateZ = new Date('+this.date.getTime()+')');
    this.timezoneOffset = this.dateZ.getTimezoneOffset();
}
var membersZ = ['getDate','getDay','getFullYear','getHours','getMilliseconds','getMinutes','getMonth','getSeconds','getYear','toDateString','toLocaleDateString','toLocaleTimeString'];
var members = ['getUTCDate','getUTCDay','getUTCFullYear','getUTCHours','getUTCMilliseconds','getUTCMinutes','getUTCMonth','getUTCSeconds','toGMTString','toUTCString','valueOf','getTime'];
var membersStr = ['toLocaleString','toString','toTimeString'];
var membersZSet = ['setDate','setFullYear','setHours','setMilliseconds','setMinutes','setMonth','setSeconds','setTime','setYear'];
var membersSet = ['setUTCDate','setUTCFullYear','setUTCHours','setUTCMilliseconds','setUTCMinutes','setUTCMonth','setUTCSeconds'];
var membersStatic = ['UTC','parse'];
for(var i=0;i<membersZ.length;i++){
    eval('DateZ.prototype.'+membersZ[i]+' = function(){return this.dateZ.'+membersZ[i]+'();}'); 
}
for(var i=0;i<membersStr.length;i++){
    eval('DateZ.prototype.'+membersStr[i]+' = function(){return this.dateZ.'+membersStr[i]+'().replace(/GMT[+-]\\d{4} \\(([a-zA-Z]{3,4})\\)/,this._toTZString());}');
}
for(var i=0;i<members.length;i++){
    eval('DateZ.prototype.'+members[i]+' = function(){return this.date.'+members[i]+'();}'); 
}
for(var i=0;i<membersStatic.length;i++){
    eval('DateZ.prototype.'+membersStatic[i]+' = function(){'+
	 'return eval(\'Date.'+membersStatic[i]+'(\'+this._argumentsToString(arguments)+\')\');'+
	 '}');
}
for(var i=0;i<membersZSet.length;i++){
    eval('DateZ.prototype.'+membersZSet[i]+' = function(){'+
	 'eval(\'this.dateZ.'+membersZSet[i]+'(\'+this._argumentsToString(arguments)+\');\');'+
	 'this.date = new Date(this.dateZ.getTime()-this.dateZ.getTimezoneOffset()*1000*60+this.timezoneOffset*1000*60);'+
	 'return this;'+
	 '}'); 
}
for(var i=0;i<membersSet.length;i++){
    eval('DateZ.prototype.'+membersSet[i]+' = function(){'+
	 'eval(\'this.date.'+membersSet[i]+'(\'+this._argumentsToString(arguments)+\');\');'+
	 'this.dateZ = new Date(this.date.getTime()+this.date.getTimezoneOffset()*1000*60-this.timezoneOffset*1000*60);'+
	 'return this;'+
	 '}'); 
}
DateZ.prototype.getTimezoneOffset = function(){
    return  this.timezoneOffset;
}
DateZ.prototype.setTimezoneOffset = function(offset,abbr){
    this.timezoneOffset = offset;
    if(abbr!=undefined){this.tzAbbreviation = abbr;}
    this.dateZ = new Date(this.date.getTime()+this.date.getTimezoneOffset()*1000*60-this.timezoneOffset*1000*60);
    return this;
}
DateZ.prototype._toTZString = function(){
    var hours = Math.floor(Math.abs(this.timezoneOffset)/60);
    hours = (hours < 10)?'0'+hours:hours;
    var minutes = Math.abs(this.timezoneOffset) - hours*60;
    minutes = (minutes < 10)?'0'+minutes:minutes;
    var prefix = (this.timezoneOffset < 0)?'+':'-';
    var abbr = (this.tzAbbreviation==undefined)?'':' ('+this.tzAbbreviation+')';
    return 'GMT'+prefix+hours+minutes+abbr;
}
exports.DateZ = DateZ;