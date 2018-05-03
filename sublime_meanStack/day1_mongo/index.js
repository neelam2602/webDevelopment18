var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer')

var upload = multer({ dest: 'uploads/' })
 


var app = express();
app.use('/xyz',express.static(__dirname+'/public'));
app.set('view engine','pug');
app.use(bodyParser.urlencoded({extended : false}));

const db = require('monk')('127.0.0.1:27017/mongo_first')
// console.log(db)
const users = db.get('person')



app.get('/',function(req,res){
	// res.render('index');
	//find is same as select query
	users.find({},function(err,result){
		if(err){
			console.log(err);
		}
		else{
			// console.log(result)
			res.render('index',{data:result})
		}
	})
})

app.post('/form_action',function(req,res){
	// console.log(req.body);
	users.insert({name:req.body.ex1,age:req.body.ex2},function(err,result)
	{
		if(err){
			console.log(err)
		}
		else{
			res.redirect('/');
		}
	})
})
app.post('/file_upload',upload.single('ex1'),function(req,res){
	// console.log(req.body)
	// console.log(req.file)
	filename = req.file.originalname;
	users.insert({name:req.body.ex2,age:filename},function(err,result)
	{
		if(err){
			console.log(err)
		}
		else{
			res.redirect('/');
		}
	})

})
app.get('/delete/:urlData',function(req,res){
	id =req.params.urlData;
	users.remove({"_id":id},function(err,result){
		if(err){
			console.log(err)
		}
		else{
			res.redirect('/')
		}
	})
})
app.get('/form',function(req,res){
	res.render('form')
})

app.listen(3000);