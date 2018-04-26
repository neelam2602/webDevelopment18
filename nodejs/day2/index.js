var express = require('express');
// console.log(express);
var mysql = require('mysql');
var bodyParser = require('body-parser')
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
        host: 'mail.php-training.in',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vishal@php-training.in', // generated ethereal user
            pass: 'Vishal@123' // generated ethereal password
        },tls: {
        rejectUnauthorized:false
    }
    });


var connection = mysql.createConnection({
	host : "localhost",
	user : "neelam",
	password:"neelam",
	database : "eshopper_project"
})
// console.log(connection)

var app = express();
// console.log(app)
app.use('/xyz', express.static(__dirname + '/public'));
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
	// console.log(data1)
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
app.get('/delete/:urlData',function(req,res){
	// console.log(req);
	id = req.params.urlData;
	connection.query("delete from brands where id = '"+id+"'",function(err,result){
		if(err){
			console.log(err);
		}
		else{
			res.redirect('/')
		}
	})
})
app.post('/mail_action',function(req,res){
	// res.send("hello")
	// res.send(req.body.ex1);
	email = req.body.ex1;
	subject = req.body.ex2;
	msg = req.body.ex3;
	let mailOptions = {
        from: '"vishal" <vishal@php-training.in>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        text: msg, // plain text body
        html: msg // html body
    };

	transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        // console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('mail sent')

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
})

app.listen(3000);
