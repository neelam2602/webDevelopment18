var fs = require('fs');
fs.unlink('./newdir/writefile_03.txt',function(){
	fs.rmdir('newdir',function(){});
})