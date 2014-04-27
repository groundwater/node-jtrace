var i = 0;

setInterval(function(){
  console.dir  ('mod1', "dir message");
  console.log  ('mod1', "log message");
  console.info ('mod1', "info message");
  console.warn ('mod1', "warn message");
  console.error('mod1', "error message");
  setTimeout(function () {
    a(i++)
  }, 100)
}, 1000)

function a(x) {
  console.log('mod2', "I'm from another module" + x);
}
