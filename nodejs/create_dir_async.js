var fs = require('fs');
fs.mkdir("newdir",function(){
	fs.readFile('readme.txt','utf8',function(err,data){
		fs.writeFile('./newdir/writefile_03.txt',data,function(){});
	});
});

console.log("test")