var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'application/JSON'});
	var myobj = {name:'jigs',age:20};
	res.end(JSON.stringify(myobj));
});

server.listen(3000,'127.0.0.1');