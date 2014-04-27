'use strict';

var http  = require('http');
var solid = require('lib-stream-solidify');
var vm    = require('vm');
var util  = require('util');

function JTracer() {
  this.tracer = null;
  this.parent = null;
  this.module = null;
}

JTracer.prototype.emit = function (level, vector, values) {

  // always use root emitter
  if (this.parent) {
    this.parent.emit(level, this.module, values);
  }

  else

  if (this.tracer) {
    var args = [];
    for (var i in values) args.push(values[i])
    this.tracer.trace(level, this.module + '/' + vector, args);
  }
};

JTracer.prototype.log = function (a1, a2) {
  this.emit(0, this.module, arguments);
};

JTracer.prototype.dir = function (a1, a2) {
  this.emit(-10, this.module, arguments);
};

JTracer.prototype.info = function (a1, a2) {
  this.emit(10, this.module, arguments);
};

JTracer.prototype.warn = function (a1, a2) {
  this.emit(20, this.module, arguments);
};

JTracer.prototype.error = function (a1, a2) {
  this.emit(30, this.module, arguments);
};

JTracer.prototype.get = function (mod) {
  var jt = new JTracer()

  jt.parent = this;
  jt.module = mod;

  return jt;
};

JTracer.prototype.start = function (path) {
  var self = this;
  http.createServer(function (req, res) {
    var names = {};

    names[-10] = '[DEBUG]';
    names[0]   = '[  LOG]';
    names[10]  = '[ INFO]';
    names[20]  = '[ WARN]';
    names[30]  = '[ERROR]';

    var sbox = {
      log: function(){
        var x = util.format.apply(null, arguments);
        res.write(x + '\n');
      },
      name: function (val) {
        if (names[val]) return names[val]
        else return ''
      }
    };

    var context = vm.createContext(sbox);

    solid(req).text(function (err, src) {
      vm.runInContext('trace = ' + src, context);
      sbox.trace  = context.trace;
      self.tracer = sbox;
    });

    req.on('close', function(){
      self.trace = undefined;
    });

  }).listen(path);
};

module.exports = new JTracer();
module.exports.module = '';
