# jtrace

> dynamic code execution for live tracing

## usage

### write your app `demo.js`

```javascript
var i = 0;
setInterval(function(){
  console.log('timer', "Item number" + i++);
}, 1000)
```

### start your process with `jrun`

The `jrun` command intercepts `console.log` commands.

```bash
$ jrun demo.js
```

### dynamically log with `jtrace`

The `jtrace` command will inject a logging function in place of `console.log`.

```bash
# print logs at info level or higher
$ jtrace

# print logs at debug level or higher
$ jtrace --debug
```
