var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter";

function handle_request(msg, callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userprofile');

		coll.findOne({email: msg.email, password: msg.password}, function(err, user){
			if (user) {
				//req.session.username = user.userid;
				console.log(user.userid +" is the userid from server");
				res = {"statusCode" : "validLogin", userid:user.userid};
				
			} else {
				res = {"statusCode" : "invalidLogin"};
			}
			callback(null, res);
		});
	});
}

exports.handle_request = handle_request;