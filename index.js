'use strict';

var http  = require('http');
var solid = require('lib-stream-solidify');
var vm    = require('vm');
var util  = require('util');

function JTracer() {
  this.tracer = null;
}

JTracer.prototype.emit = function (level, vector, items) {
  if (this.tracer) {
    this.tracer.trace(level, vector, items);
  }
};

JTracer.prototype.start = function (path) {
  var self = this;
  http.createServer(function (req, res) {

    var sbox = {
      log: function(){
        var x = util.format.apply(null, arguments);
        res.write(x + '\n');
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
