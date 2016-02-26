// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'ngCordova',
  'plangular', 
  'angular-momentjs',
  'starter.controllers',
  'starter.services',
  'LocalStorageModule',
  'ngOpenFB',
  'admobModule'])

.run(function(
  $ionicPlatform,
  $state,
  $timeout,
  $cordovaSplashscreen,
  ngFB,
  DataMusicone) {

  ngFB.init({appId: '746820032119054', tokenStore: window.localStorage});
  setTimeout(function() {
    $cordovaSplashscreen.hide();
  }, 5000)
  $ionicPlatform.ready(function() {
  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.run(['admobSvc', function (admobSvc) {
      // Also you could configure the options here (or in any controller):
      // admobSvcProvider.setOptions({ ... });

      admobSvc.createBannerView({
        publisherId:          "ca-app-pub-3459564552160541/5192032111",  // Required
        interstitialAdId:     "ca-app-pub-3459564552160541/1533241712",  // Optional
        isTesting:            false,
        autoShowBanner:       true,                             
      });
      // You could also call admobSvc.createBannerView(options);


      // Handle events:
      // $rootScope.$on(admobSvc.events.onAdOpened, function onAdOpened(evt, e) {
      //   console.log('adOpened: type of ad:' + e.adType);
      // });
    }])
.config(function($stateProvider, $urlRouterProvider,plangularConfigProvider) {
      plangularConfigProvider.clientId = '9eb9bf68a9df94ee4d926736ff47a147';
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
    // ,
    // onEnter: function($state,DataMusicone){
    //         if(!DataMusicone.authenticated()){
    //           $state.transitionTo('signhome');
    //         }
    //       }
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html",
        controller: 'SearchCtrl'
      }
    }
  })
     .state('app.ticket', {
    url: "/ticket",
    views: {
      'menuContent': {
        templateUrl: "templates/ticket.html",
        controller: 'TicketCtrl'
      }
    }
  })
   .state('app.messenger', {
    url: "/messenger",
    views: {
      'menuContent': {
        templateUrl: "templates/messenger.html",
        controller: 'MessengerCtrl'
      }
    }
  })
   .state('app.gallery', {
    url: "/gallery",
    views: {
      'menuContent': {
        templateUrl: "templates/gallery.html",
        controller: 'GalleryCtrl'
      }
    }
  })
      .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })
    .state('app.top', {
    url: "/top",

    views: {
      'menuContent': {
        templateUrl: "templates/top.html",
        controller: 'TopCtrl',
      }
    }
  })
    .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "templates/profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })
    .state('app.favorite', {
    url: "/favorite",
    views: {
      'menuContent': {
        templateUrl: "templates/favorite.html",
        controller: 'FavoriteCtrl'
      }
    }
  })
   .state('app.item', {
    url: "/item/:id",
    views: {
      'menuContent': {
        templateUrl: "templates/info.html",
        controller: 'SearchItemCtrl',
        params:{id:null},
          onExit: function($state){
           // $scope.$on("$destroy", SearchItemCtrl);
          }
      }
    }
  })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
      .state('app.browse', {
    url: "/browse/:tag",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html",
        controller: 'BrowseCtrl'
      }
    }
  })
  .state('app.smokemachine', {
    url: "/smokemachine",
    views: {
      'menuContent': {
        templateUrl: "templates/smokemachine.html",
        controller: 'SmokeMachineCtrl'
      }
    }
  })
   .state('signhome', {
    url: "/signhome",
     templateUrl: "templates/sign/signhome.html",
      controller: 'SigninCtrl',
      onEnter: function($state,DataMusicone){

       //  // alert(JSON.stringify(window.localStorage));
        if(DataMusicone.getToken()){
           $state.go("app.profile");
          // alert("alert login");
        };
       // // if(DataMusicone.authenticated()){
       // //  $state.go("app.profile")
       // // }
      

      }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/signhome');
}).directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
});
