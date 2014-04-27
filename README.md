# jtrace

> dynamic code execution for live tracing

## usage

### write your app `demo.js`

```javascript
var jtrace = require('jtrace');

var i = 0;
setInterval(function(){
  jtrace.emit('timer', "Item number" + i++);
}, 1000)
```

### start your process with `jrun`

The `jrun` command creates an IPC channel over a unix http socket.

```bash
$ jrun demo.js
```

### dynamically log with `jtrace`

The `jtrace` command should be run in the same directory as `jrun`.

```bash
$ jtrace
```
