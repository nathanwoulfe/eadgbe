'use strict';

/* Filters */

angular.module('eadgbeFilters', []).filter('youtubeImgFromUrl', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl('//i.ytimg.com/vi/' + val.substring(val.indexOf('v=') + 2, val.indexOf('&')) + '/0.jpg');
    };
});

