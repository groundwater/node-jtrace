var jtrace = require('../index.js')
var http = require('http');

var server = http.createServer(function (req, res) {
  jtrace.log('Request: ' + req.url)
  jtrace.dir('begin', req)
  setTimeout(function(){
    jtrace.dir('end', req)
    res.end();
  }, Math.random() * 1000)
})

server.listen(8080, function(){
  jtrace.info('Server listening on port 8080')
})

function noise() {
  return require('crypto').randomBytes(50).toString('hex');
}

setInterval(function(){
  jtrace.dir('interval1', noise());
}, 10)
