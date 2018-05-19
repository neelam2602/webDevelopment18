var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var session = require('express-session');
var async = require('async');

var Client = require('node-rest-client').Client;
validate = require('express-validator')
 
var client = new Client();

var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge:60*60*24*10 }
}))
app.use(function(req,res,next){
	req.connection.setNoDelay(true);
	next();
})
app.use(validate());
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req,res,next){
	// console.log(req.url)
	// console.log(req.session)
	if(req.session && req.session.userName){
		if(req.url == "/login"){
			res.redirect('/')
		}
		else{next();}
	}
	else{
		if(req.url == "/password"){
			res.redirect('/')
		}
		else{next();}
	
	}
})
app.use('/public', express.static(__dirname + '/public'));
let transporter = nodemailer.createTransport({
        host: 'mail.php-training.in',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "vishal@php-training.in", // generated ethereal user
            pass: "Vishal@123" // generated ethereal password
        },
        tls:{rejectUnauthorized: false}

    });

const db = require('monk')('127.0.0.1:27017/mongo_first')
// console.log(db)
// const users = db.get('person')

app.get('/login',function(req,res){
	res.render('login')
})

app.post('/login_action',function(req,res){
	// res.send("test")
	var emailId = req.body.emailId;
	var password = req.body.password;

	req.checkBody('emailId',"invalid emailid").isEmail()
	req.checkBody('password',"invalid password").notEmpty()
	
	var errors = req.validationErrors()
	if(errors){
		// console.log(errors);
		results_of_error = "";
		for(var i = 0; i < errors.length;i++){
        results_of_error+=errors[i].msg + "<br>";
  		}

  		res.send(results_of_error);
	}
	else{
		// res.send("ok")
		db.get("user_info").find({$and:[{emailId:emailId},{password:password}]},function(err,result){
			if(!err){
				// console.log(result)
				if(result.length>0){
					req.session.userName = emailId;
					app.locals.userName = emailId;
					res.send("ok")
				}
				else{
					res.send("Invlid credentials")
				}
			}
			else{
				console.log(err)
			}
		})
	}

	
})
app.post('/password_action',function(req,res){
	// console.log(req.body)
	if(req.body.curr_password == req.body.new_password){
		res.send("new and current password should be different")
	}
	else if(req.body.new_password != req.body.con_new_password){
		res.send("password mismatch")
	}
	else{
		emailId = req.session.userName;
		console.log(emailId)
		db.get("user_info").find({"emailId":emailId},function(err,result){
			if(!err){
				// console.log(result)
				if(req.body.curr_password != result[0].password){
					res.send("current password invalid")
				}else{
					// db.person.update({"_id":userid},{$set:{"name":"new","mobile":"99"});
					db.get("user_info").update({"emailId":emailId},{$set:{"password":req.body.new_password}})
					res.send("passowrd updated")
				}
			}else{
				console.log(err)
			}
		})
	}
	// res.send("success")
})
app.post('/brand_filter',function(req,res){
	// res.send(req.body.id)
	db.get("product").find({"brand_id":req.body.id},function(err,result3){
	    res.send(result3)
	 })
})
app.post('/category_filter',function(req,res){
	// res.send(req.body.id)
	db.get("product").find({"category_id":req.body.id},function(err,result3){
	    res.send(result3)
	 })
})
app.get('/product',function(req,res){
	// res.render('product')
	async.parallel({
	    one: function(callback) {
	        // callback(null, 'abc\n');
	        db.get("brand").find({},function(err,result1){
	        	callback(null, result1);
	        })
	    },
	    two: function(callback) {
	        // callback(null, 'xyz\n');
	        db.get("category").find({},function(err,result2){
	        	callback(null, result2);
	        })
	    }
	    
	}, function(err, results) {
	    // results now equals to: results.one: 'abc\n', results.two: 'xyz\n'
	    // console.log(results.one)
	    // console.log(results.two)

	    
	    res.render('product',{r1:results.one,r2:results.two})
	});
})
app.post('/product_action',function(req,res){
	console.log(req.body)
	console.log(req.file)

	res.send("ok")
})
app.get('/logout',function(req,res){
	req.session.destroy(function(err){
		if(!err){
			delete app.locals.userName;
			res.redirect('/')
		}
		else{
			console.log(err)
		}
	})
})
app.get('/password',function(req,res){
	res.render('password')
})
app.get('/category',function(req,res){
	res.render('category')
})
app.get('/brand',function(req,res){
	res.render('brand')
})
app.post('/category_action',function(req,res){
	// res.render('category')
	// console.log(req.body)
	data = req.body;
	category_name = req.body.category;
	db.get("category").find({"category":category_name},function(err,result){
		if(result.length>0){
			res.send("category name already exist")
		}
		else{
			db.get("category").insert(data,function(err,result){
				if(!err){
					res.send("ok")
				}else{
					console.log(err)
				}
			})
		}
	})
})
app.post('/brand_action',function(req,res){
	// res.render('brand')
	data = req.body;
	brand_name = req.body.brand;

	db.get("brand").find({"brand":brand_name},function(err,result){
		if(result.length>0){
			res.send("Brand name already exist")
		}
		else{
			db.get("brand").insert(data,function(err,result){
				if(!err){
					res.send("ok")
				}else{
					console.log(err)
				}
			})
		}
	})
	
})
app.post('/register_action',function(req,res){
	// res.send("test")
	// validation using express-validator
	var record = req.body
	var username = req.body.username;
	var emailId = req.body.emailId;
	var password = req.body.password;
	var confrmPassword = req.body.confrmPassword;
	var mobileNumber = req.body.mobileNumber;
	req.checkBody('uersname',"invalid name").notEmpty().isLength({ min: 4 }).trim()
	req.checkBody('emailId',"invalid emailid").notEmpty().isEmail()
	req.checkBody('password',"invalid password").notEmpty()
	req.checkBody('confrmPassword',"invalid pas").notEmpty()
	req.checkBody('mobileNumber',"invalid mobile number").notEmpty()
	var errors = req.validationErrors()
	if(errors){
		// console.log(errors);
		results_of_error = "";
		for(var i = 0; i < errors.length;i++){
        results_of_error+=errors[i].msg + "<br>";
  		}

  		res.send(results_of_error);
	}
	else{

			db.get("user_info").find({"emailId":emailId},function(err,result){
				// console.log(result)
				if(result.length>0){
					res.send("user already exists")
				}
				else{



			// validation using express-validator

			// console.log(record)
			db.get("user_info").insert(record,function(err,result){
						if(!err){
							res.send("user added")
						}
			});
			let mailOptions = {
		        from: '"vishal" <vishal@php-training.in>', // sender address
		        to: req.body.emailId, // list of receivers
		        subject: 'registration process', // Subject line
		        text: 'Hello world?', // plain text body
		        html: 'Validate yourself' // html body
	   		};
			transporter.sendMail(mailOptions, (error, info) => {
		       	if (error) {
		            return console.log(error);
		        }
		        
				else{
					console.log(err)
				}
			})
			// res.send(record);
			var mob_num = req.body.mobileNumber;
			var msg = "validation for eshopper";
			client.get("http://api.textlocal.in/send/?username=neelamsoni854@gmail.com&hash=e8851cb7cbf3753c3f1980012abb71ed5a855bd44eb13ae5a6ee8dc847ef4d2d&message="+msg+"&sender=TXTLCL&numbers=91"+mob_num+"&test=0", function (data, response) {
		    // parsed response body as js object
		    // console.log(data);
		    // raw response
		    // console.log(response);
			});
			}
		})
	}
})

app.get('/',function(req,res){
	
	async.parallel({
	    one: function(callback) {
	        // callback(null, 'abc\n');
	        db.get("brand").find({},function(err,result1){
	        	callback(null, result1);
	        })
	    },
	    two: function(callback) {
	        // callback(null, 'xyz\n');
	        db.get("category").find({},function(err,result2){
	        	callback(null, result2);
	        })
	    },
	    three:function(callback){
	    	db.get("product").find({},function(err,result3){
	    		callback(null,result3)
	    	})
	    }
	}, function(err, results) {
	    // results now equals to: results.one: 'abc\n', results.two: 'xyz\n'
	    // console.log(results.one)
	    // console.log(results.two)

	    res.render('index',{r1:results.one,r2:results.two,r3:results.three})
	    res.render('product',{r1:results.one,r2:results.two})
	});
	
})


app.listen(3000)