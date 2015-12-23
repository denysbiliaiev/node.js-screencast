// демонстрирует, что setImmediate после IO, а nextTick - до IO
// в текущей реализации таймеры тоже до IO, но в документации к Node об этом нет (может измениться)

var fs = require('fs');

// JS >> task LibUV
//  (nextTick)
//   LibUV
//    (setImmediate)
//     JS...
//       LibUV  
fs.open(__filename, "r", function(err, result) {
  console.log("IO!");
});


for(var i=0; i<5; i++) {
  // После IO
  setImmediate(function() {
    console.log("immediate");
  });

  // Перед IO
  process.nextTick(function() {
    console.log("nextTick");
  });

}


console.log("start!");
