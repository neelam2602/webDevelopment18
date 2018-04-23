var fs = require('fs');
fs.readFile('readme.txt','utf8',function(err,data){
	console.log(data + "\n\n");
})
console.log("next code")