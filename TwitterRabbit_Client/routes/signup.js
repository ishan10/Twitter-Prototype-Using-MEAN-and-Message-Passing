var ejs = require("ejs");
var mq_client = require('../rpc/client');


function signupHome(req,res) {
	res.render('signUpForm');
}

function checkUser(req,res) {
	var firstname, lastname,email, password, userid, birthday,location,contact;
	firstname = req.body.firstname;
	lastname = req.body.lastname;
	email = req.body.email;
	password = req.body.password;
	userid = req.body.userid;
	birthday = req.body.birthday;
	location = req.body.location;
	contact = req.body.contact;
	
	var msg_payload = {"firstname": firstname, "lastname": lastname, "email": email, "password":password, "userid": userid,
			"birthday": birthday, "location": location, "contact": contact};
	
mq_client.make_request('signUp_queue',msg_payload, function(err,results){
		if(results.statusCode=="userExists"){
			res = {"statusCode" : "userExists"};
			res.send({"statusCode" : "userCreated"});
		} else if(results.statusCode=="userCreated"){
			res.send({"statusCode" : "userCreated"});
		} else {
			console.log("returned false");
			res.send({"statusCode" : 401});
		}
	});	
}

exports.checkUser=checkUser;
exports.signupHome=signupHome;