var jtrace = require('./index.js');

var i = 0;
setInterval(function(){
  jtrace.emit('timer', "Item number" + i++);
  setTimeout(function () {
    a(i)
  }, 100)
}, 1000)

function a(x) {
  jtrace.emit('a', x);
}
