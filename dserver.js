var dnode = require('dnode');
var net = require('net')
, aion = require('./lib/aion').Aion;

var server = net.createServer(function(c) {
  var Aion = new aion();
  var d = dnode({
    accessAion: Aion
  });

  d.on('remote', function(remote) {
    Aion.on('tick', function(msg) {
      if (typeof msg !== 'undefined') {
        remote.onSomething(msg,function(msg) {
          for (var key in msg) {
            console.log('callback - ', key);
          }
        });
      }
    });
  });

  c.pipe(d).pipe(c);

});

server.listen(5004);

