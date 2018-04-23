var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
	// console.log(req.url);
	res.writeHead(200,{'Content-Type':'text/html'});
	if(req.url == '/' || req.url == '/home'){
		read_data = fs.createReadStream(__dirname+'/index.html','utf8');
	}
	else if(req.url == '/about'){
		read_data = fs.createReadStream(__dirname+'/about.html','utf8');
	}
	else{
		read_data = fs.createReadStream(__dirname+'/404.html','utf8');
	}
	read_data.pipe(res);
});
server.listen(3000,'127.0.0.1')