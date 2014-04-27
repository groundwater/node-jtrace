'use strict';

var http = require('http');
var solid = require('lib-stream-solidify');
var vm = require('vm');

function JTracer() {
  this.func = null;
}

JTracer.prototype.emit = function (vector, items) {
  if (this.tracer) {
    this.tracer.func(vector, items);
  }
};

JTracer.prototype.start = function (path) {
  var self = this;
  http.createServer(function (req, res) {
    var obs = {
      log: function(){
        var x = require('util').format.apply(null, arguments);
        res.write(JSON.stringify(x) + '\n');
      }
    };

    var context = vm.createContext(obs);
    solid(req).text(function (err, src) {
      vm.runInContext('func = ' + src, context);
      obs.func = context.func;
      self.tracer = obs;
    });
    req.on('close', function(){
      self.func = undefined;
    });
  }).listen(path);
};

module.exports = new JTracer();
