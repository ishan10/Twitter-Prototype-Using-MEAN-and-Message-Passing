var ejs = require("ejs");
var mq_client = require('../rpc/client');


function showHome(req,res) {
	res.render('home');
}

function twitterHome(req,res) {
	res.render('twitterHome');
	
}

function showProfile(req,res){
	console.log("Inside ShowProfile");
	res.render("successProfile");
}

function showUserProfile(req,res){
	req.session.username = req.body.userid;
	res.send(req.session.username);
}

function getFeed(req,res) {
	userid = req.session.username;
	var msg_payload = {"userid": userid};
mq_client.make_request('tweet_queue',msg_payload, function(err,results){
		
		console.log("got results on client : "+results);
		if(err){
			throw err;
		} else {
			//console.log();
			res.send(results);
		}
		 
	});	
}


function getProfileDetails(req,res){
	userid = req.session.username;
	var msg_payload = {"userid": userid};
	mq_client.make_request('profile_queue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		} else {
			//console.log();
			res.send(results);
		}
		 
	});	
}

function createTweet(req,res){
	var tweet,userid;
	tweet = req.body.tweet;
	userid = req.session.username;
	var msg_payload = {"userid": userid, "tweet" : tweet};
	mq_client.make_request('insertTweet_queue',msg_payload, function(err,results){
		
		if(err){
			throw err;
		} else {
			if (results.statusCode=="tweeted"){
			res.send({"statusCode" : "tweeted"});
			} else {
				console.log("returned false");
				res.send({"statusCode" : 401});
			}
			
		}
		 
	});	
}

function getProfileTweets(req,res) {
	userid = req.session.username;
	var msg_payload = {"userid": userid};
	
	mq_client.make_request('profileTweet_queue',msg_payload, function(err,results){
		if(err){
			throw err;
		} else {
			res.send(results);
		}
	});	
}


function getMyFollowing(req,res) {
	userid = req.session.username;
	var msg_payload = {"userid": userid};
	mq_client.make_request('myFollowing_queue',msg_payload, function(err,results){
	if(err){
		throw err;
	} else {
		res.send(results[0].followingid);
	}
		 
	});	
	
}

function getMyFollowers(req,res) {
	userid = req.session.username;
	var msg_payload = {"userid": userid};
mq_client.make_request('myFollowers_queue',msg_payload, function(err,results){
	if(err){
		throw err;
	} else {
		res.send(results[0].followerid);
	}		 
	});	
	
}


function reTweet(req,res) {
	var retweet_user = req.body.userid;
	var tweet = req.body.retweet;
	var userid = userid = req.session.username;
	var msg_payload = {"userid": userid, "retweet_user":retweet_user, "tweet":tweet};
mq_client.make_request('reTweet_queue',msg_payload, function(err,results){
	if(err){
		throw err;
	} else {
		if (results.statusCode=="retweeted"){
		res.send({"statusCode" : "retweeted"});
		} else {
			console.log("returned false");
			res.send({"statusCode" : 401});
		}
		
	} 
	});	
	
}

function signOut(req,res){
	req.session.destroy();
	json_responses = {"statusCode" : "sessionTerminated"};
	res.send(json_responses);
}
exports.signOut=signOut;
exports.reTweet=reTweet;
exports.getMyFollowing=getMyFollowing;
exports.getMyFollowers=getMyFollowers;
exports.getProfileTweets=getProfileTweets;
exports.createTweet=createTweet;
exports.getFeed=getFeed;
exports.twitterHome=twitterHome;
exports.showHome=showHome;
exports.getProfileDetails=getProfileDetails;
exports.showUserProfile=showUserProfile;
exports.showProfile=showProfile;