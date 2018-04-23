var fs = require('fs');
var filedata = fs.readFileSync('readme.txt','utf8');
fs.writeFileSync('writefile.txt',filedata);
console.log("file writing done");
console.log("test");