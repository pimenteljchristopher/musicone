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
                $state.go('app.search');
                console.log('Facebook login succeeded');
                // $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};


   $ionicSideMenuDelegate.canDragContent(false);
   $scope.loginData = {};
   $scope.registerData = {};
  

   $scope.doLogin = function() {
    $ionicLoading.show();
    console.log('Doing login', $scope.loginData);
     DataAccess.logIn($scope.loginData.username,$scope.loginData.password).success(function(data){
          $ionicLoading.hide();
          console.log(data);
          DataMusicone.setToken(data);

          $state.go('app.search');
        })
     .error(function(data, status, headers, config) {
      $ionicLoading.hide();
      var alertPopup = $ionicPopup.alert({
       title: 'Notification',
       template: 'Incorrect username & password'
     });
  });
    
  };
   
})
.controller('SignupCtrl', function(
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
  $filter,
  $timeout) {
   $ionicSideMenuDelegate.canDragContent(false);

   $scope.registerData = {
    gender:"Male"
   };
     $scope.disabled = function(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  };
    $scope.dateOptions = {
    formatYear: 'yyyy',
    startingDay: 1
  };
   $scope.altInputFormats = ['MMMM dd yyyy'];
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  }; 
  $scope.format = 'MMMM dd yyyy';
  $scope.popup1 = {
    opened: false
  };

  $scope.today = function() {
    $scope.registerData.birthdate = new Date();
  };
  $scope.today();

  $scope.doJoin= function() {
   $scope.registerData.birthdate =   $filter('date') ($scope.registerData.birthdate,'MMMM dd yyyy'); 
        $ionicLoading.show({
          template: 'Loading...'
        });

    console.log($scope.registerData);


    DataAccess.signUp($scope.registerData).success(function(data){
     
          var alertPopup = $ionicPopup.alert({
             title: 'Notification',
             template: 'Registration was successful.'+$scope.registerData.username+' Enjoy your free musicone account... '
           });

           $ionicLoading.hide();
           $state.go('signin');
        })
      .error(function(data, status, headers, config) {
        var alertPopup = $ionicPopup.alert({
         title: 'Notification',
         template: 'Registration Failed'
       });
       $ionicLoading.hide();
  });
  };
});