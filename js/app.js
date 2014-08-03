'use strict';

/* App Module */

var eadgbeApp = angular.module('eadgbeApp', [
  'ngRoute',
  'eadgbeControllers',
  'eadgbeFilters',
  'eadgbeServices'
]);

eadgbeApp.config(['$routeProvider',
function ($routeProvider)
{
    $routeProvider.
        when('/:id?', {
            templateUrl: 'partials/curated.html',
            controller: 'CuratedCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
} ]);

