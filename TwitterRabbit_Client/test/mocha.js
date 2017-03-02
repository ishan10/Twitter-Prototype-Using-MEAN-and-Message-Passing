
var request = require('request')
    , express = require('express')
    ,assert = require("assert")
    ,http = require("http");

describe('http tests', function(){

    it('should check if the sign up url is correct', function(done){
        http.get('http://localhost:5555/signupUrl', function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should be able to retturn the tweet feed', function(done){
        http.get('http://localhost:5555/getFeed',
            function(res) {
            assert.equal(200, res.statusCode);
            done();
        })
    });

    it('should be able to insert a tweet in db ', function(done) {
        request.post(
            'http://localhost:5555/createTweet',
            { form: { userid: 'ishan'} },
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });

    it('should fetch list Of Followers Details', function(done) {
        request.post(
            'http://localhost:5555/getMyFollowers',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });


    it('should fetch list Of following Details', function(done) {
        request.get(
            'http://localhost:5555/getMyFollowing',
            function (error, response, body) {
                assert.equal(200, response.statusCode);
                done();
            }
        );
    });
});