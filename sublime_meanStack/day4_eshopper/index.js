var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', express.static(__dirname + '/public'));

const db = require('monk')('127.0.0.1:27017/mongo_first')
// console.log(db)
// const users = db.get('person')


app.get('/',function(req,res){

	db.get('brands').find({},function(err,result){
		if(res){
			res.render('index',{record:result});
		}
	})
})


app.listen(3000)