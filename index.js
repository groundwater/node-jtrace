'use strict';

var trace  = require('lib-trace');
var JTrace = trace.JTrace;
var Tracer = trace.Tracer;

// MODULE GLOBALS
var jtrace = new JTrace();
var tracer = Tracer.NewJTracer(jtrace);

module.exports = tracer;
