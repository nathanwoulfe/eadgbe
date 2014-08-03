'use strict';

/* Services */

var eadgbeServices = angular.module('eadgbeServices', ['ngResource']);

eadgbeServices.factory('Videos', ['$http', function ($http)
{
    return {
        get: function (callback)
        {
            $http.get('/yt.json').success(function (data)
            {
                callback(data.feed.entry);
            });
            /*$http.get('http://gdata.youtube.com/feeds/base/users/UClY3FU0h5PMTZpQQALwBB3g/newsubscriptionvideos?max-results=49&alt=json').success(function (data)
            {
                callback(data.feed.entry);
            });*/
        }
    };
} ]);
