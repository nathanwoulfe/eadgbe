'use strict';

/* App Module */
var eadgbeApp = angular.module('eadgbeApp', [
  'ngRoute',
  'eadgbeControllers',
  'eadgbeFilers',
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
            });
    } 
]);


/* Controllers Module */
var eadgbeControllers = angular.module('eadgbeControllers', []);

eadgbeControllers.controller('CuratedCtrl', ['$scope', 'YT_Curated', '$routeParams',
    function ($scope, YT_Curated, $routeParams)
    {
        
        YT_Curated.fn(function (d)
        {
            $scope.d = d;
            if ($routeParams.id != null)
            {
                lightBox($routeParams.id, false);
            }
        });

        $scope.showVideo = function (val)
        {
            lightBox(val, true);
        }

    }
]);



/* Services Module */
var eadgbeServices = angular.module('eadgbeServices', ['ngResource']);

eadgbeServices.factory('YT_Curated', function ($http) {
    return {
        fn: function (callback) {
            $http.get("http://gdata.youtube.com/feeds/base/users/UClY3FU0h5PMTZpQQALwBB3g/newsubscriptionvideos?max-results=49",
                {
                    transformResponse: function (d) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json(d);

                        $.each(json.feed.entry, function (i, v) {
                            delete json.feed.entry[i].category;
                            delete json.feed.entry[i].content;
                            delete json.feed.entry[i].link[1];
                            delete json.feed.entry[i].link[0]._rel;
                            delete json.feed.entry[i].link[0]._type;
                            delete json.feed.entry[i].title._type;
                        });

                        delete json.feed.author;
                        delete json.feed.category;
                        delete json.feed.generator;
                        delete json.feed.id;
                        delete json.feed.link;
                        delete json.feed.logo;
                        delete json.feed.title;

                        return json;
                    }
                }
            )
            .success(function (d, status, headers, config) {
                callback(d.feed.entry);
            })
            .error(function (d, status, headers, config) {
                console.log(d);
            })
        }
    };
});



/* Filters Module */

angular.module('eadgbeFilters', []).filter('youtubeImgFromUrl', function ($sce)
{
    return function (val)
    {
        return $sce.trustAsResourceUrl('//i.ytimg.com/vi/' + val.substring(val.indexOf('v=') + 2, val.indexOf('&')) + '/0.jpg');
    };
});



/* Generic functions */
function lightBox(val, parse) {
    
    var src = '';
    if (parse)
    {
        src = 'http://www.youtube.com/embed/' + val.substring(val.indexOf('v=') + 2, val.indexOf('&')) + '?hd=1&autoplay=1&rel=0&autohide=1&showinfo=0&modestbranding=1';
    } else 
    {
        src = 'http://www.youtube.com/embed/' + val + '?hd=1&autoplay=1&rel=0&autohide=1&showinfo=0&modestbranding=1';        
    }
    
    $('#video').attr('src', src);
    $('.frame-wrapper').lightbox_me({
        centred: true,
        overlayCSS: {
            background: 'white',
            opacity: .7
        },
        onClose: function() { 
            $('#video').attr('src', null);
        }        
    });
}


