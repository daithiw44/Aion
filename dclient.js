var dnode = require('dnode');
var net = require('net');

var d = dnode();
d.on('remote', function(remote) {
  function four(id, timeVal) {
    var self = this;
    self.id = id;
    self.val = timeVal;
    self.decreaseVal = function() {self.val--;console.log(self.val);};
    self.increaseVal = function() {self.val++; console.log(self.val);};
    self.second = '';
  }

  var fortyfour = new four('fortyfour', 60);
  fortyfour.decreaseVal();

  remote.accessAion.addtoSecObj(fortyfour.id, [0, 0, fortyfour.decreaseVal], function(t) {
    console.log('time = ' + t);
    fortyfour.second = t;
    setTimeout(function() {
      console.log('removing : 44');
      remote.accessAion.removefomSecObj(fortyfour.id, fortyfour.second);
    }, 690000);
  });

  var fiftyfive = new four('fiftyfive', 0);

  remote.accessAion.addtoSecObj(fiftyfive.id, [1, 1, fiftyfive.increaseVal], function(t) {
    console.log('time = ' + t);
    fiftyfive.second = t;
  });

});

d.on('local', function(local) {
  local.onSomething = function(a,cb) {
    console.log(a);
    for (var key in a) {
      a[key]();
    }
  };
});

var c = net.connect(5004);
c.pipe(d).pipe(c);

