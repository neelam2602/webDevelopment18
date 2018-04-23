var fs = require('fs');
console.log(fs);

var ans = fs.readFileSync('readme.txt','utf8');
console.log(ans + "\n\n");
console.log("next code");