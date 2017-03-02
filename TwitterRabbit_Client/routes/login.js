var crypto = require('crypto');
//var mongo = require("./mongo");
//var mongoURL = "mongodb://localhost:27017/twitter";
var mq_client = require('../rpc/client');

function checkLogin(req,res) {
	var password, email;
	password = req.body.password;
	//password = crypto.createHash("sha1").update(password).digest("HEX");
	email = req.body.email;
	var msg_payload = { "email": email, "password": password };

mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			console.log("inside else");
			if(results.statusCode=="validLogin"){
			req.session.username = results.userid;
			console.log(req.session.username +" is the session in client");
			json_responses = {"statusCode" : "validLogin"};
			res.send(json_responses);
			}
			else {    
				json_responses = {"statusCode" : "invalidLogin"};
				res.send(json_responses);
			}
		}
		 
	});
	
}

exports.checkLogin=checkLogin;
	
