Aion version 0.2.

NodeJS Module
Rather than have muliple timers, Aion allow you create a single timer and attach an object function to a give second so that it can emit an event from the single timer when the given time period has been reached. Current Aion only works for periods of time based on minutes.In other words an object can be attache to the 36 second of a minute if that obect is to be called every minute it will be called on the 36 msecond of the next minute and so on.

Example Attached:(streaming dNode Example)
The dserver.js and the dclient.js are a dnode server and client which demonstrate how using RPC calls the timer server can run in its own process and notify its clent which created the objects that the elasped amount of time has passed.

Functions

ddtoSecObj = function(matchid,props,cb)
	//attaches an object to a timer associated the id of the object (object id is necessary)
	//props are the in the format [currentminute, resetminute, object function to call when Internval has passed] *minutes are zero based, as in 2 minutes are 1, 3 minutes are 2 etc. The callback function is the last parameter and this should be used to take the second of the cycle the object was attached to and store as this second is used in the removefromSecObj call

removefomSecObj = function(matchid,thesecond) 
//takes the id of the object and the second is was attached to. So the Interval can be removed.

TODO: Loads.

Currently Aion fits my purposes but I will revisted and extend so the Interval cn be set for periods of seconds as opposed to the minutes only. Inputs of seconds/minutes to be 1000 based as in SetInterval (perhaps).
Write test current using Example and currently only using with dNode.
