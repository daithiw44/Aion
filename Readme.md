Aion version 0.2.

NodeJS Module.

Aion is a setInterval Timer that ticks every second of a minute. Aion attaches an object(s) method to a second in the minute cycle of the time. With Aion you can trigger the object to call a function of the object in muliple of minutes based on the second the object joined the timer.

So rather than have muliple timers, Aion allows you create a single timer and attach an object(s) function to a given second so that it can emit an event from the single timer when the given time period has been reached. Currently Aion only works for periods of time based on minutes. In other words an object can be attached to the 36 second of a minute if that obect is to be called every minute it will be called on the 36 second of the next minute and so on.

<img src"aion.jpg" border="0"/>

Example Attached:(streaming dNode Example dserver.js and dclient.js)
The dserver.js and the dclient.js are a dnode server and client which demonstrate how using RPC calls the timer server can run in its own process and notify its clent which created the objects that the elasped amount of time has passed.

Aion Methods.

1. addtoSecObj = function(matchid,props,cb)
	//attaches an object to a timer associated the id of the object (object id is necessary)
	//props are the in the format [currentminute, resetminute, object function to call when Internval has passed] *minutes are zero based, as in 2 minutes are 1, 3 minutes are 2 etc.
Returns the second the object joined the cycle.
The callback function is the last parameter and this should be used to take the second of the cycle the object was attached to and store as this second is used in the removefromSecObj call

2. removefomSecObj = function(matchid,thesecond) 
//takes the id of the object and the second is was attached to. So the Interval can be removed.

TODO and beyond.

Currently Aion fits my purposes but I will revisted and extend so the Interval cn be set for periods of seconds as opposed to the minutes only. Inputs of seconds/minutes to be 1000 based as in SetInterval (perhaps).
