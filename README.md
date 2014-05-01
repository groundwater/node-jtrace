# jtrace

> dynamic instrumentation for node.js

## install

```bash
npm install --save jtrace
```

Once you've instrumented your application with `jtrace` probes,
you can use `jrun` and `jtrace` for dynamic runtime instrumentation.

## design

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

Once you've instrumented your application with `jtrace` probes,
start it with the `jrun` command.

```bash
~/myapp $ jrun my_app.js
```

In another process try to view the probe events

```bash
~/myapp $ jtrace
```

## probes

```javascript
var jtrace = require('jtrace');
var server = http.createServer(function (req, res) {
  jtrace.dir('request', 'begin', req);

  setTimeout(function () {
    jtrace.dir('request', 'end', req);
    res.end('Hello World');
  }, Math.random() * 1000);
});

server.listen(8080, function () {
  jtrace.info('server', 'start', server);
});
```

These hooks are generic entry-points into your application.
They can be used for logging, but they can also be used for instrumenting
and performance tuning.

### use probes for logging

Ultra verbose logging

```javascript
function yes() {return true;}

jtrace.onEvent(yes, function (facets, item) {
  console.log(facets.event, facets.order);
});
```

This might print out:

```text
server start
request begin
request end
request begin
request end
```

### use probes for instrumenting

#### http response times

Since probes also receive objects,
you can modify and inspect those objects at runtime.

```javascript
jtrace.onEvent(yes, function (facets, item) {
  if (facets.event !== 'request') return;

  switch(facet.order) {
  case 'begin':
    // tag the request start time
    item._start = Date.now();
    break;
  case 'end':
    // measure the total request latency
    console.log('%s (%dms)', item.url, Date.now() - item._start);
    break;
  }
});
```

This might print out:

```text
/users (500ms)
/user/kim (2ms)
/user/bob (1023ms)
```

## advanced

Complex instrumentation can be enclosed in a function.
The function is only called when the probe is enabled.

```javascript
jtrace.info('complex', 'begin', function () {
  return complexCalculation();
});
```

Probes with closures are always evaluated synchronously.
