var dnode = require('dnode');
var net = require('net');

var d = dnode();
d.on('remote', function(remote) {
  var fortyfour, fiftyfive;
  /**
   * Constructor
   */
  function Four(id, timeVal) {
    var self = this;
    self.id = id;
    self.val = timeVal;
    self.decreaseVal = function() {self.val--;console.log('decreased value: ', self.val);};
    self.increaseVal = function() {self.val++; console.log('increased value: ', self.val);};
    self.second = '';
  }

  /**
   * Create object of type four
   */
  fortyfour = new Four('fortyfour', 60);
  fortyfour.decreaseVal();

  remote.accessAion.addtoSecObj(fortyfour.id, [0, 0, fortyfour.decreaseVal], function(t) {
    console.log('second of Aion fortyfour is attached to = ' + t);
    fortyfour.second = t;
    /**
     * Create a call to remove fortyfour from Aion in the future.
     */
    setTimeout(function() {
      console.log('removing : 44');
      remote.accessAion.removefomSecObj(fortyfour.id, fortyfour.second);
    }, 690000);
  });

  /**
   * Create object of type four
   */
  fiftyfive = new Four('fiftyfive', 0);

  remote.accessAion.addtoSecObj(fiftyfive.id, [1, 1, fiftyfive.increaseVal], function(t) {
    console.log('second of Aion fiftyfive is attached to = ' + t);
    fiftyfive.second = t;
  });

});

d.on('local', function(local) {
  local.onSomething = function(a,cb) {
    var key;
    console.log('client: ', a);
    for (key in a) {
      if (a.hasOwnProperty(key)) {
        a[key]();
      }
    }
    cb(a);
  };
});

var c = net.connect(4400);
c.pipe(d).pipe(c);

