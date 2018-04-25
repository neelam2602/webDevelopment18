var express = require('express');
// console.log(express);
var mysql = require('mysql');
var bodyParser = require('body-parser')

var connection = mysql.createConnection({
	host : "localhost",
	user : "neelam",
	password:"neelam",
	database : "eshopper_project"
})
// console.log(connection)

var app = express();
// console.log(app)
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){
	// res.send('hello')
	// res.render('index');
	//sends the rendered views to client
	connection.query("select * from brands",function(err,result){
		if(err){
			console.log(err)
		}
		else{
			// console.log(result)
			res.render('index',{data1:10,data2:20,data3:result});
		}
	})

})
app.get('/home',function(req,res){
	// res.send('home page')
	res.render('home');
})
app.get('/about',function(req,res){
	// res.send('about page')
	res.render('about');
})
app.post('/form_action',function(req,res){
	// console.log(req.body);
	data1 = req.body.ex1;
	data2 = req.body.ex2;
	connection.query("insert into brands (name,count) values ('"+data1+"','"+data2+"')",function(err,result){
		if(err){
			console.log(err)
		}
		else{
			// console.log(result)
			res.redirect('/')
		}
	})
})
app.listen(3000);
