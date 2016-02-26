/**
 * Created by Sandeep on 11/09/14.
 */
angular.module('starter.services',[])
.factory('DataAccess',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS,DataMusicone){
    return {
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/User',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        getInfo:function(){
            return $http.get('https://api.parse.com/1/users/me',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        signUp: function(data) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/users', {'username': data.username, 'password': data.password,'name':data.name,'email':data.email,'gender':data.gender,'birthdate':data.birthdate}, config);
        },
        update:function(id,data,TOKEN){
            return $http.put('https://api.parse.com/1/users/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'X-Parse-Session-Token': TOKEN,
                    'Content-Type':'application/json'
                }
            });
        },
        getUpdate:function(TOKEN){
            return $http.get('https://api.parse.com/1/users/me',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'X-Parse-Session-Token': TOKEN,
                }
            });
        },
         forget: function(data) {
            var config = {
                headers: {
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type': 'application/json'
                } 
            }
            return $http.post('https://api.parse.com/1/requestPasswordReset', {'email': data.email}, config);
        },
        logIn: function(username, password) {
            var config = {
             headers: {
               'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
               'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY
             },
             params: { 
                username: username ,
                password: password
              }
            }
            return $http.get('https://api.parse.com/1/login', config);
        },
         logOut: function(TOKEN) {
            var config = {
             headers: {
               'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
               'X-Parse-REST-API-Key': PARSE_CREDENTIALS.REST_API_KEY,
               'X-Parse-Session-Token': TOKEN
             }
           
            }
            return $http.post('https://api.parse.com/1/logout',{}, config);
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/Todo/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create:function(data){
            return $http.post('https://api.parse.com/1/classes/Todo',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/Todo/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/Todo/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}]).value('PARSE_CREDENTIALS',{
    APP_ID: '3U6bAsxJmBtH76IwbCDHfdzqzZEd6ttWO9lAzWT0',
    REST_API_KEY:'dFAuE3px7jvhHQIweM64g8OcSi3i1A49LsGe5Vvk'
})
.service('DataMusicone', function(localStorageService) {

    var trackSearch = [];
  

    this.setItem = function(result){
       trackSearch = result;         
    };
    this.getItem = function(){
       return trackSearch;
    };
    this.setToken = function(result){
    localStorageService.set('USER_TOKEN',result);
    };
    this.getToken = function(){
    return localStorageService.get('USER_TOKEN');
    };
    this.destroyToken = function(){

     localStorageService.remove('USER_TOKEN');
     var reset = {sessionToken: null};
     localStorageService.set('USER_TOKEN',reset);
    };
    this.authenticated = function(){

      var valid,token = localStorageService.get('USER_TOKEN');
  // alert(token);
      if(token.sessionToken === null || token == null){
           valid = false;
      } 
      else {
           valid = true;
      }
      return valid;
    };
    this.setFavorite = function(result){
    
    // localStorageService.remove('USER_FAVORITE');
    var fav = localStorageService.get('USER_FAVORITE');
    if (fav==null) {localStorageService.set('USER_FAVORITE',[]);}
    else {fav.push(result);localStorageService.set('USER_FAVORITE',fav);}
    };
    this.editFavorite = function(result){
    localStorageService.set('USER_FAVORITE',result);
    };
    this.getFavorite = function(){
    return localStorageService.get('USER_FAVORITE');
    }
     this.deleteFavorite = function(){
      var reset = []; 
    return localStorageService.set('USER_FAVORITE',reset);
    }


})
.factory('soundcloud', function($q) {
     var deferred = $q.defer();
    SC.initialize({
        client_id: '9eb9bf68a9df94ee4d926736ff47a147',
        redirect_uri: 'http://soundcloud.dev/soundcloud.html'
    });
    var data;
   SC.get('/users', {q: 'rihanna'}, function (data) {
          deferred.resolve( data);
    });
    return deferred.promise;
});