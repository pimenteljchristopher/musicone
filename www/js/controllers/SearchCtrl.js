angular.module('starter')
.controller('SearchCtrl', 
				['$scope','$ionicHistory', '$ionicLoading', 'SoundCloudQuery', '$ionicModal', '$moment', 'KeyboardService',
function( $scope,$ionicHistory,   $ionicLoading,   SoundCloudQuery,  $ionicModal,   $moment ,  KeyboardService ) {
	

	var query;


	//$scope.query = {};
	//init the controller

	
	/**
	 * init
	 * @return {[type]} [description]
	 */

	/**
	 * Clearing query
	 * @return {[type]} [description]
	 */
	$scope.clearQuery = function(){
		$scope.query.value = null;
	}

	/**
	 * Search action
	 * @param  {[type]} so [description]
	 * @return {[type]}    [description]
	 */
	$scope.search = function(so){
		KeyboardService.hide();
		$ionicLoading.show();
	  query =  SoundCloudQuery.query({q:so.query});
		query.getNextPage().then(function(results){
			$scope.results = results;
			console.log(results);
  		$ionicLoading.hide();
  	});    
	};

	/**
	 * Loads more results
	 * @return {[type]}
	 */
	$scope.loadMore = function(){	
		return query.getNextPage().then(function(results){
			$scope.results = $scope.results ? $scope.results.concat(results) : results;
			return results;
		});  
		
	};
}])
.controller('SearchItemCtrl', ['$ionicPopup','$scope','$state', '$timeout','$ionicLoading','$ionicHistory','$location','$ionicLoading', 'SoundCloudQuery', '$ionicModal', '$moment', 'KeyboardService','$stateParams','DataMusicone','$ionicHistory','DataMusicone',
				function( $ionicPopup,$scope, $state,$timeout,$ionicLoading,$ionicHistory,$location,  $ionicLoading,   SoundCloudQuery,  $ionicModal,   $moment ,  KeyboardService,$stateParams,DataMusicone,$ionicHistory,DataMusicone ) {

// $rootScope.$on('info', function(event, e){  implementation here  
// console.log(event);
// });


        $scope.addFavorites = function(data){
        	       
			var favorites = DataMusicone.getFavorite();
			var alertPopup = $ionicPopup.alert({
                           title: 'Notification',
                           template: "Added to favorites\n "
                         });
                          alertPopup.then(function(res) {
                              DataMusicone.setFavorite(data);
                         }); 

			        	
			        	 // DataMusicone.deleteFavorite();
        };
        $scope.loaded = false;
        // $scope.currentTime = 0;
        // $scope.duration = 0;
        var result = DataMusicone.getItem();
        // $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
     	result.big_artwork = result.artwork_url ? result.artwork_url.replace('large', 't500x500') : "";
		result.proper_time = $moment.utc(result.duration).format("HH:mm:ss");
		 $scope.info = result;
		
   $ionicLoading.show();
	   $timeout( function(){ 
	   	$scope.loaded = true; 
	   	$ionicLoading.hide(); 
          $scope.$apply(function () {
    

        });
	   }, 600);

	$scope.resetPlayer = function(){
     $ionicHistory.goBack();
     // $state.$destroy();

	};
}])
.filter('millSecondsToTimeString', function() {
  return function(millseconds) {
    var seconds = Math.floor(millseconds / 1000);
    var days = Math.floor(seconds / 86400);
    var hours = Math.floor((seconds % 86400) / 3600);
    var minutes = Math.floor(((seconds % 86400) % 3600) / 60);
    var timeString = '';
    if(days > 0) timeString += (days > 1) ? (days + " days ") : (days + " day ");
    if(hours > 0) timeString += (hours > 1) ? (hours + " hours ") : (hours + " hour ");
    if(minutes >= 0) timeString += (minutes > 1) ? (minutes + " minutes ") : (minutes + " minute ");
    return timeString;
}
});