module.exports = function (level, provider, args) {
  if (level !== -10) return;

  var probe  = args[0]
  var handle = args[1]

  if (probe === 'begin') return handle._start = Date.now()
  if (probe === 'end') return log("duration: " + handle.url + " (" + String(Date.now() - handle._start) + ')')
}
