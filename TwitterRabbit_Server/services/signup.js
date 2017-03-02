var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter";


function signup_request(msg, callback) {
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userprofile');

		coll.findOne({userid: msg.userid}, function(err, user){
			if (user) {
				res = {"statusCode" : "userExists"};
				callback(err,res);
			} else {
				coll.insert({firstname: msg.firstname, lastname: msg.lastname, email: msg.email, password:msg.password
					, userid: msg.userid,
					birthday: msg.birthday, location: msg.location, contact: msg.contact}, function(err, user){
					if (user) {
						res = {"statusCode" : "userCreated"};
						callback(err,res);
					} else {
						console.log("returned false");
						res = {"statusCode" : 401};
						callback(err,res);
					}
				});
			}
		});
	});
}

exports.signup_request=signup_request;