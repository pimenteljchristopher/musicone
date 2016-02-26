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
    ngFB.login({scope: 'email'}).then(

        function (response) {
           
            if (response.status === 'connected') {
                $state.go('app.profile')
                console.log('Facebook login succeeded')
                // $scope.closeLogin();
            } 
        });

};


   $ionicSideMenuDelegate.canDragContent(false);

  

   
});