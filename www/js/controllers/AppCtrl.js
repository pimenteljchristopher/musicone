angular.module('starter')
.controller('AppCtrl', function($scope, $ionicModal,$ionicPopup, $timeout,DataAccess,$state,DataMusicone,$ionicLoading,$rootScope,$state,$ionicHistory,ngFB,$rootScope) {
  // Form data for the login modal
  $scope.rateUs= function(){
     window.open('market://details?id=com.ionicframework.musicone166455', '_system');
  }
  $scope.doLogout = function() {
                ngFB.logout().then(
                    function() {      
                    var alertPopup = $ionicPopup.alert({
                           title: 'Notification',
                           template: "Facebook logout was successful.\n Until next time."
                         });
                          alertPopup.then(function(res) {
                             DataMusicone.destroyToken();
                             $state.go('signhome');
                             console.log('Facebook login succeeded');
                         });  
                    },
                    errorHandler);
            }
            function errorHandler(error) {
                alert(error.message);
            }
});