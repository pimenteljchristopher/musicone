module.controller('ProfileCtrl', function($scope,DataMusicone,DataAccess,$ionicPopup,ngFB) {
  //console.log(LoginCredentials.getAll);
  // $scope.playlists = [];
 $scope.$on('$ionicView.enter', function(){
  // $scope.info = DataMusicone.getToken();
  ngFB.api({
        path: '/me',
        params: {fields: 'id,name,gender,about,email,relationship_status,bio,birthday,cover'}
    }).then(
        function (user) {
            $scope.info = user;
            console.log(user);
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });

});
  
  // $scope.info = DataMusicone.getToken();
  $scope.data = {showDelete:false};
 
});