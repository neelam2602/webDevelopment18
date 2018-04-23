http = require('http');
// console.log(http);


var server = http.createServer(function(req,res){
	res.end('SERVER CREATED');
});

server.listen(2000,'127.0.0.1');

console.log("test completed")