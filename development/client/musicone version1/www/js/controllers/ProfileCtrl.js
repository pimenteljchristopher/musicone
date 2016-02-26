module.controller('ProfileCtrl', function($scope,DataMusicone,DataAccess,$ionicPopup,ngFB) {
  //console.log(LoginCredentials.getAll);
  // $scope.playlists = [];
 $scope.$on('$ionicView.enter', function(){
  $scope.info = DataMusicone.getToken();
});
  ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
        function (user) {
            $scope.user = user;
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });

  $scope.info = DataMusicone.getToken();
  $scope.data = {showDelete:false};
  $scope.save = function(id,data){
  	// console.log(id+"data"+data);
    var TOKEN  = DataMusicone.getToken();
    console.log(id);
    console.log(data);
    console.log(TOKEN.sessionToken);
    data = {'post':data.post,'mobile':data.mobile,'address':data.address,'country':data.country,'status':data.status};
  	DataAccess.update(id,data,TOKEN.sessionToken).then(function(result){
      console.log(result);
      if(result.status == 200){
      		DataAccess.getUpdate(TOKEN.sessionToken).then(function(result){
      			if(result.status == 200){
      				 DataMusicone.setToken(result.data);
      				}else
               		 var alertPopup = $ionicPopup.alert({
					     title: 'Notification',
					     template: 'Please try again. Error network connection.'
					   });  
                    console.log(result);
      		});
      }else
       var alertPopup = $ionicPopup.alert({
		     title: 'Notification',
		     template: 'Please try again. Error network connection.'
		   });        
    });
  }
});