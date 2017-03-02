var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/twitter";

function handle_request(msg, callback){
	
	var res = {};

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll=mongo.collection('follow_data');
		coll.find({userid:msg.userid}).toArray(function(err,items){
			if(err){
                results = {"statusCode": 401};
            } else {
            	if(items.length > 0){
            		console.log('items.length: ' + items.length);
            		mongo.connect(mongoURL, function(){
            			var tweetColl=mongo.collection('tweet_post');
            			console.log('after tweetColl ' + items.length);
            			tweetColl.find({$or:[{userid:{$in:items[0].followingid}},{userid:msg.userid}]}).sort({date_added: -1}).to
                            .toArray(function (err, results) {
                            	if (err) {
                                    results = {"statusCode": 401};
                                    callback(err,results);
                                } else {
                                    callback(err,results);
                                }
            	});
            });
		
	}else{
		mongo.connect(mongoURL,function () {
            var tweetColl = mongo.collection('tweet_post');
            tweetColl.find({userid: msg.userid}).sort({date_added: -1}).toArray(function (err, results) {
            	if (err) {
                    results = {"statusCode": 401};
                    callback(err,results);
                } else {
                    callback(err,results);
                }
            });
        });
		}
	}
		});
	});
}

function  profile_request(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userprofile');
		
		 coll.find({userid: msg.userid}).toArray(function (err, results) {
					if (results) {
						console.log("user "+results);
						 callback(err,results);
					} else {
						console.log("returned false");
						json_responses = {"statusCode" : 401};
						 callback(err,results);
					}
				});
	});
}

function insertTweet_request(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('tweet_post');
		//var counters = mongo.collection('counters');
		
				coll.insert({userid: msg.userid ,tweet_comments: msg.tweet, date_added: new Date()}, function(err,user){
					if (user) {
						console.log("inserted tweet");
						res = {"statusCode" : "tweeted"};
						callback(err,res);
					} else {
						console.log("returned false");
						res = {"statusCode" : 401};
						callback(err,res);
					}
					
				});
				/*function getNextSequence(tweetSequence){
					console.log("inside getNextSequence");
					var sequenceDocument = counters.findAndModify({
					query:{_id: tweetSequence },
					update: {$inc:{sequence_value:1}},
					new:true
					});
					return sequenceDocument.sequence_value;
					}*/
	});
}

function  profileTweet_request(msg, callback){
	mongo.connect(mongoURL,function () {
        var tweetColl = mongo.collection('tweet_post');
        tweetColl.find({userid: msg.userid}).sort({date_added: -1}).toArray(function (err, results) {
            if (err) {
                results = {"statusCode": 401};
                callback(err,results);
            } else {
            	callback(err,results);
            }
        });
    });
}

function myFollowing_request(msg, callback){

	mongo.connect(mongoURL,function () {
        var coll = mongo.collection('follow_data');
        coll.find({userid: msg.userid}).toArray(function (err, results) {
            if (err) {
                results = {"statusCode": 401};
                callback(err,results);
            } else {
            	callback(err,results);
            }
        });
    });
	
}


function myFollowers_request(msg, callback){

	mongo.connect(mongoURL,function () {
        var coll = mongo.collection('follow_data');
        coll.find({userid: msg.userid}).toArray(function (err, results) {
            if (err) {
                results = {"statusCode": 401};
                callback(err,results);
            } else {
            	callback(err,results);
            }
        });
    });
	
}



function reTweet_request(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('tweet_post');
		
				coll.insert({userid: msg.userid ,tweet_comments: msg.tweet, date_added: new Date(), retweet_user:msg.retweet_user}, function(err,user){
					if (user) {
						console.log("inserted retweet");
						res = {"statusCode" : "retweeted"};
						callback(err,res);
					} else {
						console.log("returned false");
						res = {"statusCode" : 401};
						callback(err,res);
					}
					
				});
	});
}






exports.reTweet_request=reTweet_request;
exports.myFollowers_request=myFollowers_request;
exports.myFollowing_request=myFollowing_request;
exports.profileTweet_request=profileTweet_request;
exports.insertTweet_request = insertTweet_request;
exports.insertTweet_request = insertTweet_request;
exports.profile_request = profile_request;
exports.handle_request = handle_request;