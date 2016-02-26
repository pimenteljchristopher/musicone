angular.module('starter')
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
})
.directive('scResultEntry', function() {
  return {
    restrict: 'E',
    scope: {
      track: '='
    },
    templateUrl: 'js/directives/scResultEntry/sc-result-entry.html'
  };
});