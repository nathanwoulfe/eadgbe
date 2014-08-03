'use strict';

/* App Module */

var eadgbeApp = angular.module('eadgbeApp', [
  'ngRoute',
  'eadgbeControllers',
  'eadgbeFilters',
  'eadgbeServices'
]);

eadgbeApp.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/curated.html',
            controller: 'CuratedCtrl'
        }).
        when('/v/:id', {
            templateUrl: 'partials/curated.html',
            controller: 'CuratedCtrl'
        }).
        when('/artist/:artistId', {
            templateUrl: 'partials/artist.html',
            controller: 'ArtistDetailCtrl'
        }).
        when('/group/:groupId', {
            templateUrl: 'partials/groups.html',
            controller: 'GroupDetailCtrl'
        }).
        when('/genre/:genreId', {
            templateUrl: 'partials/genres.html',
            controller: 'GenreDetailCtrl'
        }).
        when('/curated', {
            templateUrl: 'partials/curated.html',
            controller: 'CuratedCtrl'
        }).
        when('/api/:method', {
            templateUrl: 'partials/api.html',
            controller: 'ApiCtrl'
        });
} ]);

