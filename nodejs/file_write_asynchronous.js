var fs = require('fs');
var filedata = fs.readFile('readme.txt','utf8',function(err,data){
	fs.writeFile('writefile_01.txt',data,function(){});
	console.log("file writing done")
});
console.log("test")