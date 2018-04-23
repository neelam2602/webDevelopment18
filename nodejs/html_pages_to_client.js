var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'image/jpeg'});

	var readstream = fs.createReadStream(__dirname+"/bank01.jpg",'utf8');
	readstream.pipe(res);
})
server.listen(3000,'127.0.0.1');