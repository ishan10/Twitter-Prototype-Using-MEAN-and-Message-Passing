
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , home = require('./routes/home')
  , signup = require('./routes/signup')
  , login = require('./routes/login');

var app = express();

//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/twitter";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
//var mongo = require("./routes/mongo");

// all environments
app.set('port', process.env.PORT || 5555);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/** Get Requests**/
app.get('/', home.showHome);
app.get('/home', home.showHome);
app.get('/signUp', signup.signupHome);
app.get('/twitterHome', home.twitterHome);
app.get('/showProfile', home.showProfile);

/*app.get('/showSearchPage', searchPage.showSearchPage);*/


/** Post Requests**/
app.post('/checkUser', signup.checkUser);
app.post('/login', login.checkLogin);
app.post('/getFeed', home.getFeed);
app.post('/createTweet', home.createTweet);
app.post('/showUserProfile', home.showUserProfile);
app.post('/getProfileDetails', home.getProfileDetails);
app.post('/getProfileTweets', home.getProfileTweets);
app.post('/getMyFollowing', home.getMyFollowing);
app.post('/getMyFollowers', home.getMyFollowers);
app.post('/reTweet', home.reTweet);
/*app.post('/searchSession', searchPage.searchSession);
app.post('/getSearchResults', searchPage.search);*/
app.post('/signOut', login.signOut);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
