'use strict';

/* Controllers */

var eadgbeControllers = angular.module('eadgbeControllers', []);

eadgbeControllers.controller('CuratedCtrl', ['$scope', 'Videos', '$routeParams',
    function ($scope, Videos, $routeParams)
    {
        Videos.get(function(data){
            $scope.d = data;
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


/* generics / reusable functions */


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
    $('#video-outer').lightbox_me({
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