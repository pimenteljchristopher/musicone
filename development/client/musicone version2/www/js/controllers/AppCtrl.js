angular.module('starter')
.controller('AppCtrl', function($scope, $ionicModal, $timeout,DataAccess,$state,DataMusicone,$ionicLoading,$rootScope,$state) {
  // Form data for the login modal


  $scope.doLogout = function(){
    $ionicLoading.show();
    var token = DataMusicone.getToken();
    // alert(token.sessionToken);
    DataAccess.logOut(token.sessionToken).then(function(result){
      console.log(result);
          $ionicLoading.hide();
      DataMusicone.destroyToken();
      $state.go('signin',{},{reload:true});
    });

  };
});