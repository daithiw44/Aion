var dnode = require('dnode');
var net = require('net')
, Aion = require('../lib/aion').Aion;

var server = net.createServer(function(c) {
  var oAion = new Aion()
  , d = dnode({
        accessAion: oAion
      });

  d.on('remote', function(remote) {
    oAion.on('tick', function(msg) {
      if (typeof msg !== 'undefined') {
        remote.onSomething(msg, function(msg) {
          var key;
          for (key in msg) {
            if (msg.hasOwnProperty(key)) {
              console.log('server callback - ', key);
            }
          }
        });
      }
    });
  });

  c.pipe(d).pipe(c);

});

server.listen(4400);

