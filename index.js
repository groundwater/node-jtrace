'use strict';

var trace  = require('lib-trace');
var Tracer = trace.Tracer;
var Probe  = trace.Probe;

// MODULE GLOBALS
var tracer = new Tracer();
var probe  = Probe.NewWithTracer(tracer);

module.exports = probe;
