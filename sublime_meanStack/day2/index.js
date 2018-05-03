var express = require('express');
var bodyparser = require('body-parser');

const mongoose = require('mongoose');
var Client = require('node-rest-client').Client;
 
var client = new Client();


var app= express();

app.set('view engine','pug');
app.use(bodyparser.urlencoded({ extended: false }))
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
	// console.log(req.body)
	// Create an instance of model SomeModel
	var awesome_instance = new MyModel({ name: req.body.ex1,age:req.body.ex2 });

	// Save the new model instance, passing a callback
	awesome_instance.save(function (err) {
	  if (err) return handleError(err);
	  // saved!
	  res.redirect('/')
	});
})
app.post('/sms_action',function(req,res){
	var mob_num = req.body.ex1;
	var msg = req.body.ex2;
	client.get("http://api.textlocal.in/send/?username=neelamsoni854@gmail.com&hash=e8851cb7cbf3753c3f1980012abb71ed5a855bd44eb13ae5a6ee8dc847ef4d2d&message="+msg+"&sender=TXTLCL&numbers=91"+mob_num+"&test=0", function (data, response) {
    // parsed response body as js object
    // console.log(data);
    // raw response
    console.log(response);
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
app.listen(3000);