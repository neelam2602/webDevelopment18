var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cookieParser = require('cookie-parser')
 
app.use(cookieParser())
app.set('view engine','pug');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',function(req,res){
	res.render('form');
})
app.post('/form_action',function(req,res){
	// res.render('data')
	console.log(req.body);
	res.cookie("cookie_data_ex1",req.body.ex1,{maxAge:10000});
	res.cookie("cookie_data_ex2",req.body.ex2,{maxAge:10000});
	res.redirect('/show_cookie')
})
app.get('/show_cookie',function(req,res){
	// console.log(req.cookies)
	res.render('data',req.cookies)
})
app.get('/delete',function(req,res){
	// res.render('data')
	res.clearCookie('cookie_data_ex1')
	res.clearCookie('cookie_data_ex2')
	res.redirect('/show_cookie')
})
app.listen(3000);
