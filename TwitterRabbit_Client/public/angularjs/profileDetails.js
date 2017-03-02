var profileDetails = angular.module('profileDetails', []);

profileDetails.controller('ProfileDetailsController', function($scope,$http) {
	$scope.showFeed = false;
	$scope.showFollowingList = false;
	$scope.showFollowersList = false;
	$http({
		 method: "POST",
		 url : '/getProfileDetails',
	 }).success(function(data) {
			 $scope.firstname = data[0].firstname;
			 $scope.lastname = data[0].lastname;
			 $scope.userid = data[0].userid;
			 $scope.birthday = data[0].birthday;
			 $scope.location = data[0].location;
			 $scope.contact = data[0].contact;
	
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	$scope.showFollowers = function(){
		$http({
			 method: "POST",
			 url : '/getMyFollowers',
		 }).success(function(data) {
				 $scope.followers = data;
				 $scope.showFeed = true;
				 $scope.showFollowingList=true;
				 $scope.showFollowersList=false;
				 
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
		};
	$scope.showFollowing = function(){
		$http({
			 method: "POST",
			 url : '/getMyFollowing',
		 }).success(function(data) {
				 $scope.following = data;
				 $scope.showFeed = true;
				 $scope.showFollowersList=true;
				 $scope.showFollowingList=false;
		}).error(function(error) {
			$scope.unexpected_error = false;
		});
		};
	$scope.showTweets=function(){
		console.log("inside showTweets");
		$http({
			 method: "POST",
			 url : '/getProfileTweets',
		 }).success(function(data) {
			 $scope.showFeed = false;
			 $scope.showFollowingList=true
			 $scope.tweetData = data;
	 }).error(function(error) {
			$scope.unexpected_error = false;
		});
	};
	
});


profileDetails.controller('ProfileFeedController', function($scope,$http) {
	/*$scope.showFeed = false;*/
/*	$http({
		 method: "POST",
		 url : '/getProfileTweets',
	 }).success(function(data) {
		 $scope.showFeed = false;
		 $scope.data = data;
 }).error(function(error) {
		$scope.unexpected_error = false;
	});*/
	
	
	
	
	
});
