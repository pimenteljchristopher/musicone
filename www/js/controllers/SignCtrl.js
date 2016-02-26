module.controller('SigninCtrl', function(
  $scope,
  $state,
  $stateParams,
  $ionicModal,
  $ionicPopup,
  $ionicSideMenuDelegate,
  $ionicLoading,
  DataAccess,
  DataMusicone,
  $ionicPlatform,
  $window,
  $cordovaAdMob,
  $timeout,
  ngFB) {
 

  $scope.fbLogin = function () {
    var token = DataMusicone.getToken();
    ngFB.login({scope: 'publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
               DataMusicone.setToken( response.authResponse.accessToken);
                var alertPopup = $ionicPopup.alert({
                 title: 'Notification',
                 template: "Facebook login was successful.\n Please do rate us"
               });
                alertPopup.then(function(res) {
                   $state.go('app.profile');
                   console.log('Facebook login succeeded');
               });  
            } 
        });
};


   $ionicSideMenuDelegate.canDragContent(false);

  

   
});