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

Use the same probes for logging, debugging, and performance tuning.

## usage

We add probes to our application in key positions.
Probes can be filtered during instrumentation,
so we should provide a *type* and a *value* to each probe.

```javascript
var jtrace = require('jtrace');

http.createServer(function (req, res) {

  // `request` is the type
  // `req` is the value
  jtrace.log('request', req);

  res.send('Hello World');
}).listen(8080);
```

At runtime, we can instrument our application with the following module.

```javascript
var jtrace = require('jtrace');

jtrace.on('request', function (req) {
  console.log('request name', req.name);
});
```

The result of which might look like

```text
request name /users/bob
request name /users/joe
```
