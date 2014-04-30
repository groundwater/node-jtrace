var rank  = 000;
var module = null;

// use a filter function
exports.filter = function (facets) {
  var facetOk  = (facets.brand === 'probe' && facets.rank & rank);
  var moduleOk = (module && facets.module !== module) ? false : true;

  return facetOk && moduleOk;
};

var DIR   = 001;
var LOG   = 002;
var INFO  = 004;
var WARN  = 010;
var ERROR = 020;

// called when probe is loaded
// before any events are fired
exports.begin = function (params) {
  // switch rank at runtime
  rank = params.rank ? parseInt(params.rank, 8) : 077;

  if (params.error)  rank = ERROR;
  if (params.warn)   rank = ERROR | WARN;
  if (params.info)   rank = ERROR | WARN | INFO;
  if (params.log)    rank = ERROR | WARN | INFO | LOG;
  if (params.dir)    rank = ERROR | WARN | INFO | LOG | DIR;

  if (params.module) module = params.module;
};

// called once on each event
exports.event = function (facets, item) {
  var out;
  switch (typeof item) {
  case 'function':
    out = '[Function]'; break;
  case 'object':
    out = '[Object]'; break;
  case 'string':
    out = item; break;
  }
  console.log(facets.module, facets.event, out);
};

// maybe called when probe is unloaded
exports.end = function () {
  //
};
