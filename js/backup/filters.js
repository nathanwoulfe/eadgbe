'use strict';

/* Filters */

angular.module('eadgbeFilters', []).filter('youtubeUrl', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl('//www.youtube.com/embed/' + val.substring(val.indexOf('v=') + 2, val.indexOf('&')) + '?hd=1&autoplay=1&rel=0&autohide=1&showinfo=0&modestbranding=1');
    };
})

.filter('youtubeImg', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl('//i.ytimg.com/vi/' + val + '/0.jpg');
    };
})

.filter('youtubeImgFromUrl', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl('//i.ytimg.com/vi/' + val.substring(val.indexOf('v=') + 2, val.indexOf('&')) + '/0.jpg');
    };
})

.filter('amps', function () {
    return function (val) {
        return val.replace('&amp;', '&');
    };
})

.filter('attr', function () {
    return function (val) {
        return '- ' + val;
    };
})

.filter('underscores', function () {
    return function (val) {
        return val.replace(/\s/g, '_');
    };
})

.filter('spaces', function () {
    return function (val) {
        return val.replace(/_/g, ' ');
    };
});

