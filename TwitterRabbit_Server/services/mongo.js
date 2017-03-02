var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var mongoURLnew = "mongodb://localhost:27017/twitter";
var dbCollection;

/**
 * Connection pooling using MongoURL
 */
exports.connect = function(url, callback){
	if(db==undefined){
    MongoClient.connect(mongoURLnew, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      dbCollection={};
      callback();
    });
	}else{
		callback();
	}
};

/**
 * Returns the collection on the selected database
 */
exports.collection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    if(!dbCollection[name]){
    	console.log("inside dbCollection");
    	dbCollection[name]=db.collection(name);
    }else{
    	dbCollection[name];
    }
    
    return db.collection(name);
  
};