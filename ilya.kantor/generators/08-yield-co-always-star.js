Error.stackTraceLimit = 100;
require('trace');
require('clarify');

var chain = require('stack-chain');

chain.filter.attach(function (error, frames) {
  return frames.filter(function (callSite) {
    var name = callSite && callSite.getFileName();
    return (name && name.indexOf("/co/") == -1);
  });
});


var co = require('co');

co(function*() {

  yield* g();

}).catch(function(err) {
  console.log(err.message, err.stack);
});

function* g() {
  throw new Error("No stack");
}
