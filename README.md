DateZ
=====
DateZ is a wrapper object for the built-in Javascript Date object with the missing setTimezoneOffset() method enhancement intended to use for server-side Javascript with Node.js.

With Node.js, you might want to do a lot of HTML content generation on the server-side, but then generating the right Dates for client-side timezones becomes pain in the ass since the built-in Javascript Date object is lacking the appropreate timezone setter method and all you can get is the UTC/GMT based time and the local time where the remote server is located (not the client-machines where the time format should be tuned for). You can use DateZ.setTimezoneOffset() to shift the timezones of a Date object, and the rest works just like the built-in Date object.
(This doesn't, of course, autotune the timezones for the client locations. You still need to specify a timezone the Date object is converted to.)

Installation
------------
for now, DateZ is intended to use in server-side scripts with Node.js (as i needed it). You can use npm for easy installation.

	npm install DateZ

there is no reason not to use the same DateZ object for client-side scripting, so it is to be done in the future implementation.(i guess...)

Usage
-----
DateZ has all the methods the Built-in Date object has, and works exactly the same except for the setTimezoneOffset addition described below.
	
	.setTimezoneOffset( timezoneOffset, [ timezoneAbbreviation ] );

timezonOffset should be equivalent to the value you can get from Date.getTimezoneOffset().

	cf) GMT-0800 => 480, GMT+0900 => -540

timezoneAbbreviation is optional, and can be any string value. (You can even set "Mars Daylight savind Time" if you wish.) If not given here, timezone abbreviations will be omitted from the return values of any string related methods, such as toString(), toLocalString() and toTimeString(). Timezone values and their abbreviations are in one-to-many relationships, so there isn't an absolute way to pick out just one abbreviation unless you specify which abbreviation you mean to use.

	var sys = require('sys');	
	var DateZ = require('DateZ').DateZ;

	//suppose your remote server is somewhere in PST zone, which is represented as GMT-0800
	var now = new Date(); //built-in
	var nowZ = new DateZ(); //Z stands for time"Z"one btw
	
	sys.puts(now.toString());
	sys.puts(nowZ.toString());
	
	//now change the timezone of nowZ for JST(GMT+0900)
	nowZ.setTimezoneOffset(-540);
	
	sys.puts(now.toString());
	sys.puts(nowZ.toString());

	//note that timezone abbreviations are omitted unless you explicitly specify with setTimezoneOffset
	
	nowZ.setTimezoneOffset(-540, 'JST');
	sys.puts(nowZ.toString());

and that's about it for now.
