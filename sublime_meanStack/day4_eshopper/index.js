var express = require('express');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var Client = require('node-rest-client').Client;
validate = require('express-validator')
 
var client = new Client();

var app = express();
app.use(validate());
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: false }))

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

	db.get('brands').find({},function(err,result){
		if(res){
			res.render('index',{record:result});
		}
	})
})


app.listen(3000)