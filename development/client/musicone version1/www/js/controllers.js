var module = angular.module('starter.controllers', ['ngOpenFB']) ;

 module.controller('PlaylistsCtrl', function($scope) {
  //console.log(LoginCredentials.getAll);
  $scope.playlists = [];
})


.controller('TopCtrl', function($scope,DataMusicone,$timeout,$ionicHistory,$state,$ionicModal,$ionicLoading, $moment,$rootScope) {


$scope.timeIn = $scope.currentTime;
$scope.change = 0;
  $scope.played = false;
  $scope.playerAction = function(change){
    console.log(change);
    console.log($scope.change);
    if ($scope.change == change) {
      console.log('not reset');
      if($scope.played == false){
       $scope.played = true;
      }
      else{
          $scope.played = false;
      }
    }
    else{ console.log("reset");
    $scope.played = false;
     $scope.change = change;
       if($scope.played == false){
     $scope.played = true;
    }
    else{
        $scope.played = false;
    }
  }
 };





 
  
})
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
      if(seconds >= 0) timeString += (seconds > 1) ? (seconds + " seconds ") : (minutes + " seconds ");
    return timeString;
}
})
.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
.controller('ForgetCtrl', function($scope,DataAccess,$ionicPopup,$state,$ionicLoading) {
  //console.log(LoginCredentials.getAll);
  $scope.loginData = {email:""};

  $scope.forgetSend = function  (data) {
    // body...
    $ionicLoading.show();
    DataAccess.forget(data).then(function(response){
        $ionicLoading.hide();
      console.log(response);
          if(response.status){
                $ionicPopup.alert({
             title: 'Notification',
             template: 'Success! Please check your email now.'
             }).then(function(res) {
               $state.go('login');
             });
           }
           else{
             $ionicPopup.alert({
             title: 'Notification',
             template: 'Failed! Please try again.'
             });
           }
    });
  }
})


.controller('SearchlistCtrl', function($scope, $ionicLoading,$ionicPopup,$stateParams,soundcloud,$http,$state,DataMusicone,$ionicScrollDelegate) {
   // var promises= DataMusicone.getTrack();
   // promises.then(function(result){
   //  $scope.song = result;
   // });
$scope.search = {name:""};
$scope.searchArtist = function(name){
  $ionicLoading.show();
  var promises =DataMusicone.searchTrack(name);
  promises.then(function(result){
  $ionicLoading.hide();
  $ionicPopup.alert({header:"notification",template:result});
      $scope.song = result;
      console.log(result);
     });
}

    $scope.scrollTop = function() {
        $ionicScrollDelegate.resize();  
    };
  
 
})

.controller('BrowseCtrl',['$scope','DataAccess',function($scope,DataAccess){
    DataAccess.getAll().success(function(data){
        $scope.items=data.results;
         console.log($scope.items);
    });
    $scope.onItemDelete=function(item){
        DataAccess.delete(item.objectId);
        $scope.items.splice($scope.items.indexOf(item),1);
    }

}])
.controller('FavoriteCtrl',['$scope','DataAccess','$state','DataMusicone',function($scope,DataAccess,$state,DataMusicone){

 var cardTypes  = [];
 $scope.data = {
    showDelete: false
  };
  $scope.onItemDelete = function(item) {
    console.log(item);
    $scope.cards.splice($scope.cards.indexOf(item), 1);
  };
  $scope.$on('$ionicView.enter', function(){
        $scope.cards  = DataMusicone.getFavorite();
  });



  $scope.editFavorites = function(cards){
    console.log(cards);
    console.log("press");
    DataMusicone.editFavorite(cards);
  }
  $scope.deleteAll = function(){
    DataMusicone.deleteFavorite();
  }
  

}])
.controller('MessengerCtrl',['$scope','DataAccess','$state','DataMusicone','$ionicModal',function($scope,DataAccess,$state,DataMusicone,$ionicModal){
  
 $scope.messages = [{

 }];


 $ionicModal.fromTemplateUrl('templates/sms.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openSMS = function() {
    $scope.modal.show();
  };
  $scope.closeSMS = function() {
    $scope.modal.hide();
  };
  
 $scope.sendSMS = function(){
  
 };

}])
.controller('TicketCtrl',['$scope','DataAccess','$state','DataMusicone',function($scope,DataAccess,$state,DataMusicone){


}])
.controller('SettingsCtrl',['$scope','DataAccess','$state','DataMusicone',function($scope,DataAccess,$state,DataMusicone){


}])
.controller('GalleryCtrl',['$scope','DataAccess','$state','DataMusicone',function($scope,DataAccess,$state,DataMusicone){


}]);
