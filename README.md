# jtrace

> dynamic instrumentation for node.js

The `jtrace` module has two beliefs:

1. applications want to be fast
2. people want to make things quickly

The `jtrace` module wants to make our applications fast,
and wants us to develop things quickly.
Place `jtrace` probes into our application during development,
and instrument those probes at runtime.

Probes are designed to be:

1. *near zero cost* when not in use
2. *re-usable* across multiple instrumentations
3. *safe* to use in production
4. *categorical* for filtering

Use the same probes for logging, debugging, and performance tuning.

## usage

```javascript
var jtrace = require('jtrace');
var server = http.createServer(function (req, res) {
  jtrace.dir('request', req);

  setTimeout(function () {
    jtrace.dir('response', req);
    res.end('Hello World');
  }, Math.random() * 1000);
});

server.listen(8080, function () {
  jtrace.info('start', server);
});
```

These hooks are generic entry-points into your application.
They can be used for logging, but they can also be used for instrumenting
and performance tuning.

### use probes for logging

Catch all the probes, and log their *action*

```javascript
jtrace.on(jtrace.ALL, function (facets, item) {
  console.log(facets.action);
});
```

This might print out:

```text
start
request
response
request
request
response
response
```

### use probes for instrumenting

#### http response times

Since probes also receive objects,
you can modify and inspect those objects at runtime.

```javascript
jtrace.on(jtrace.ALL, function (facets, item) {
  switch(facet.action) {
  case 'request':
    // tag the request start time
    item._start = Date.now();
    break;
  case 'response':
    // measure the total request latency
    console.log('%s (%dms)', item.url, Date.now() - item._start);
    break;
  }
});
```

This might print out:

```text
/users (500ms)
/ (2ms)
/user/bob (1023ms)
```

#### http request total

```javascript

```

## advanced

Complex instrumentation can be enclosed in a function.
The function is only called when the probe is enabled.

```javascript
jtrace.info('complex', function () {
  return complexCalculation();
});
```

Probes with closures are always evaluated synchronously.
