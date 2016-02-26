angular.module('starter')
.controller('scResultListCtrl', 
				['$scope', '$state','$timeout','$ionicLoading', 'SoundCloudQuery', '$ionicModal', '$moment', 'KeyboardService','$ionicPopup','$filter','DataMusicone',
				function( $scope,  $state,$timeout, $ionicLoading,SoundCloudQuery,   $ionicModal,   $moment ,$ionicPopup ,  $filter, KeyboardService,DataMusicone ) {

	var idle;


$scope.hasSearchResults = false;
	
	 $scope.showAlert = function() {
	   alert("To be add later on.");
	 };
	 $scope.itemSearch = function(result){	
    	DataMusicone.setItem(result);
    	 $timeout( function(){ 
    $state.go('app.item',{id:result.id},{reload:true});
   }, 200);
        // $state.go('app.item',{id:result.id},{reload:true});
	};


	$scope.resultClick = function(result){
		$scope.info = result;
		console.log(result);

		result.big_artwork = result.artwork_url ? result.artwork_url.replace('large', 't500x500') : "";
		result.proper_time = $moment.utc(result.duration).format("HH:mm:ss");

		$scope.modal.show();
		$scope.loaded = true;
	};

	$scope.closeModal = function(){
		$scope.modal.hide();  
    $scope.loaded = false; 
    //clear info
    $scope.info = null; 
	};

		/**
	 * Loads more results
	 * @return {[type]}
	 */
	$scope.loadMoreRecords = function(){
		console.log('loading more!');
		$scope.loadMore().then(function(results){
			$scope.$broadcast('scroll.infiniteScrollComplete');
			if(results.length > 0){
				$scope.canLoadMore = true;
			}else{
				$scope.hasSearchResults = false;
			}
		});
	};


	var unbindWatcher = $scope.$watch('results', function(newVal){
			if(newVal){
				console.log('result on the watch!!');
				$scope.$broadcast('scroll.infiniteScrollComplete');
				$scope.hasSearchResults = true;
				unbindWatcher();
			}
	});
	
}]).filter('time', function($filter)
{
 return function(input)
 {
  if(input == null){ return ""; } 
 
  var _date = $filter('date')(new Date(input), 'HH:mm:ss');
 
  return _date.toUpperCase();

 };
});