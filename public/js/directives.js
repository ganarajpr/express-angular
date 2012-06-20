'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive('dropdown', function () {
    return function (scope, elm, attrs) {
         $(elm).dropdown();
        };
    });
