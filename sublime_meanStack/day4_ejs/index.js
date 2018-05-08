var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const mongoose = require('mongoose');
var Client = require('node-rest-client').Client;
 
var client = new Client();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
mongoose.connect('mongodb://127.0.0.1:27017/mongo_first');
//'127.0.0.1:27017/mongo_first'
const Schema = mongoose.Schema;
    // ObjectId = Schema.ObjectId;
 
const BlogPost = new Schema({
 // "_id": ObjectId,
 "name": String,
 "age": String

});


// console.log(mongoose);

const MyModel = mongoose.model('persons', BlogPost);
// console.log(MyModel)
 

app.get('/',function(req,res){
	// res.render('index');
	MyModel.find({}, function (err, docs) {
  // docs.forEach
	  	if(err){
	  		console.log("error" + err)	
	  	}
	  	else{
	  		// console.log(docs)
	  		res.render('index',{data:docs})
	  	}
	});
})
app.post('/form_action',function(req,res){
	// res.render('index')
	// Create an instance of model SomeModel
	var awesome_instance = new MyModel({ name: req.body.ex1,age:req.body.ex2 });

	// Save the new model instance, passing a callback
	awesome_instance.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	  res.redirect('/')
	});
})
app.get('/delete/:urlData',function(req,res){
	id =req.params.urlData;
	MyModel.remove({"_id":id},function(err,result){
		if(err)
		{
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
app.listen(3000)