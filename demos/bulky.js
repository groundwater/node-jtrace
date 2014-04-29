var jtrace = require('../index.js')

var mod1 = jtrace.get('mod1')
var mod2 = jtrace.get('mod2')

var i = 0;

function noise() {
  return require('crypto').randomBytes(50).toString('hex');
}

setInterval(function(){
  mod1.dir('interval1', noise());
}, 10)

setInterval(function(){
  mod1.log('interval2', noise());
}, 40)

setInterval(function(){
  mod1.info('interval3', noise());
}, 100)

setInterval(function(){
  mod1.warn('interval4', noise());
}, 200)

setInterval(function(){
  mod1.error('interval5', noise().substr(0,50) + 'ERROR' + noise().substr(0,45));
}, 500)

setInterval(function () {
  mod2.error('interval6', noise());
}, 5)
