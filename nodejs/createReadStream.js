var fs = require('fs');

var rec  = fs.createReadStream(__dirname + '/read_stream_data.txt','utf8');


rec.on('data',function(chunk){
	console.log('recieved');
	console.log(chunk);
})