'use strict';

/* Controllers */

var eadgbeControllers = angular.module('eadgbeControllers', []);

eadgbeControllers.controller('HomeCtrl', ['$scope', 'FB_Random', 'YT_Videos', 'EN_Artist', 'EN_Similar',
    function ($scope, FB_Random, YT_Videos, EN_Artist, EN_Similar) {

        $('.anystretch').remove();
        FB_Random.fn(function (d) {

            $scope.name = d.name;
            $scope.mid = d.mid;
            $scope.groups = d['/music/group_member/membership'];
            $scope.genres = d['/music/artist/genre'];

            var similarRaw = [];
            $.each($scope.genres, function (i, v) {
                $.each($scope.genres[i].artists, function (i, v) {
                    similarRaw.push(this.name);
                });
            });
            $scope.similar = similarRaw.filter(function (elem, pos) {
                return similarRaw.indexOf(elem) === pos;
            });

            $scope.similar = $scope.similar.slice(0, 10);

            YT_Videos.fn($scope.mid, function (d) {
                $scope.youtube = d;
            });

            EN_Artist.fn($scope.name, function (d) {

                if (d.biographies.length !== 0) {
                    $scope.bioSite = d.biographies[0].site;
                    var bio = parseBio(d.biographies[0].text);

                    $scope.bioIntro = bio[0];
                    $scope.bioText = bio.splice(1, bio.length);
                } else {
                    $scope.bioIntro = 'That\' a bit embarassing, no biography available';
                }

                if (d.images.length !== 0) {
                    $.anystretch(d.images[0].url, { speed: 150 });

                    $('.anystretch').foggy({
                        blurRadius: 7,          // In pixels.
                        opacity: 0.9,           // Falls back to a filter for IE.
                        cssFilterSupport: true  // Use "-webkit-filter" where available.
                    });
                }

            });
        });

        $scope.showVideo = function (id) {
            showVideoFromId(id);
        }

        $scope.expandBio = function () {
            expandBio();
        }
    }

]);


    eadgbeControllers.controller('ArtistDetailCtrl', ['$scope', '$routeParams', 'FB_Artist', 'EN_Similar', 'EN_Artist', 'YT_Videos',
    function ($scope, $routeParams, FB_Artist, EN_Similar, EN_Artist, YT_Videos) {

        $scope.name = $routeParams.artistId.replace('_', ' ');
        $('.anystretch').remove();
        EN_Artist.fn($scope.name, function (d) {

            /*var maxVal = 0;
            for (var i = 0; i < d.images.length; i++) {
            var height = parseInt(d.images[i]['height'], 10);
            if (height > maxVal) {
            maxVal = height;
            $scope.image = d.images[i];
            }
            }*/

            $scope.bioSite = d.biographies[0].site;
            var bio = parseBio(d.biographies[0].text);
            $scope.bioIntro = bio[0];
            $scope.bioText = bio.splice(1, bio.length);

            if (d.images.length !== 0) {
                $.anystretch(d.images[0].url, { speed: 150 });
                $('.anystretch').foggy({
                    blurRadius: 7,          // In pixels.
                    opacity: 0.9,           // Falls back to a filter for IE.
                    cssFilterSupport: true  // Use "-webkit-filter" where available.
                });
            }

            //$scope.videos = d.video;
            $scope.terms = d.terms;

            EN_Similar.fn($scope.name, function (d) {
                $scope.similar = d;
            });

            FB_Artist.fn($scope.name, function (d) {
                $scope.mid = d.mid;
                $scope.groups = d['/music/group_member/membership'];

                YT_Videos.fn($scope.mid, function (d) {
                    $scope.youtube = d;
                });
            });

        });

        $scope.showVideo = function (id) {
            showVideoFromId(id);
        }

        $scope.expandBio = function () {
            expandBio();
        }
    }
]);

eadgbeControllers.controller('GroupDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
      $scope.name = $routeParams.groupId;
  } 
]);


eadgbeControllers.controller('GenreDetailCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
      $scope.name = $routeParams.genreId;
  } 
]);

  eadgbeControllers.controller('CuratedCtrl', ['$scope', 'YT_Curated_II', '$routeParams',
    function ($scope, YT_Curated_II, $routeParams)
    {
        
        YT_Curated_II.fn(function (d)
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

eadgbeControllers.controller('ApiCtrl', ['$scope', '$routeParams', 'API_updateJson', 'API_postToPage',
    function ($scope, $routeParams, API_updateJson, API_postToPage) {

        $('.search-wrapper').remove();        

        $scope.method = $routeParams.method;
        if ($scope.method === 'updateJson') {
            API_updateJson.fn(function (d) {
                $scope.json = d;
            });
        }

        if ($scope.method === 'postToPage') {
            API_postToPage.fn(function (d) {
                $scope.message = d;
            });
        }

    }
]);


/* generics / reusable functions */
function showVideoFromId(id) {
    var src = 'http://www.youtube.com/embed/' + id + '?hd=1&rel=0&autohide=1&showinfo=0&modestbranding=1';
    $('#video').attr('src', src).removeClass('hidden');
}

function showVideoFromUrl(url) {
    var src = 'http://www.youtube.com/embed/' + url.substring(url.indexOf('v=') + 2, url.indexOf('&')) + '?hd=1&rel=0&autohide=1&showinfo=0&modestbranding=1';
    $('#video').attr('src', src).removeClass('hidden');
}

function expandBio() {
    $('.bio-content').slideToggle('slow');
    $('.expand').text($('.expand').text() == "More" ? "Hide" : "More");
}

function parseBio(bio) {
    return bio.reverse().split(/\s(?=\.\w{4})/).map(function (a) { return a.reverse(); }).reverse();
}

String.prototype.reverse = function () {
    return this.split('').reverse().join('');
};

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