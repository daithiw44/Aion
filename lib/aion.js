/**
 * Aion. Timer that ticks every second.
 * Core for handling all Interval Timers
 *
 */

var sys = require('sys'),
	events = require('events');

function Aion() {
  var self = this;
  this.matchesObj = {};
  setInterval(function() {
    var currentSecondObj = self.matchesObj[secs()];
    if (typeof currentSecondObj !== 'undefined') {
      self.manageObjectInterval(self.matchesObj[secs()]);
    }
  }, 1000);

  this.getSecond = function() {
    return secs();
  };

  this.addtoSecObj = function(matchid,props,cb) {
    var thesecond = self.getSecond();
    if (!self.matchesObj.hasOwnProperty(thesecond)) {
      self.matchesObj[thesecond] = {};
    }
    self.matchesObj[thesecond][matchid] = [props[0], props[1], props[2]];
    cb(thesecond);
  };

  this.removefomSecObj = function(matchid,thesecond) {
    if (self.matchesObj[thesecond].hasOwnProperty(matchid)) {
      delete self.matchesObj[thesecond][matchid];
    }
  };

  this.manageObjectInterval = function(objs) {
    console.log('>> passing In', objs);
    var i, emittedmatches = {};
    for (var key in objs) {
      if (objs[key][0] === 0) {
        emittedmatches[key] = objs[key][2];
        objs[key][0] = objs[key][1];
      } else {
        objs[key][0] = objs[key][0] - 1;
      }
    }
    console.log('emittedmatches >> ', emittedmatches);
    console.log('tick');
    self.emit('tick', emittedmatches);
  };
}


//Inhert an event Emitter.
sys.inherits(Aion, events.EventEmitter);

function secs() {
  var now = new Date();
  return now.getSeconds();
}

exports.Aion = Aion;
