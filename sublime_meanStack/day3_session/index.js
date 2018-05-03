var express = require('express')
var bodyparser = require('body-parser')
var session = require('express-session')

var app = express();
app.set('view engine','pug');
app.use(bodyparser.urlencoded({ extended: false }))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))

app.get('/',function(req,res){
	res.render('form')
})
app.post('/form_action',function(req,res){
	req.session.data_ex1 = req.body.ex1;
	req.session.data_ex2 = req.body.ex2;

	res.redirect('/show')


})
app.get('/show',function(req,res){
	res.render('show_data',{x1:req.session.data_ex1,x2:req.session.data_ex2})
	// console.log(req.session)
})
app.get('/delete',function(req,res){

	// delete req.session.data_ex1;

	req.session.destroy(function(err){
		if(!err){
			res.redirect('/show')
		}
		else{
			console.log(err)
		}
	})
	res.render('show_data')
})

app.listen(3000)