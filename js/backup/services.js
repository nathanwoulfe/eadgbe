'use strict';

/* Services */

var eadgbeServices = angular.module('eadgbeServices', ['ngResource']);

eadgbeServices.factory('FB_Random', function ($http) {
    return {
        fn: function (callback) {
            $http.get("https://www.googleapis.com/freebase/v1/mqlread",
                {
                    params: {
                        query: [[{
                            name: null,
                            mid: null,
                            type: '/music/guitarist',
                            '/music/group_member/instruments_played|=': [
                                'guitar',
                                'electric guitar',
                                'acoustic guitar'
                            ],
                            '/music/group_member/membership': [{
                                'group': null,
                                'mid': null
                            }],
                            "/music/artist/genre": [{
                                "name": null,
                                "artists": [{
                                    "name": null,
                                    "type": "/music/guitarist",
                                    "limit": 5
                                }],
                                "limit": 5
                            }],
                            limit: 250
                        }]]
                    }
                }
            ).success(function (d, status, headers, config) {
                var x = Math.floor((Math.random() * 250));
                callback(d.result[x]);     
            }).error(function (d, status, headers, config) {
                console.log(d);
            });
        }
    };
});

eadgbeServices.factory('FB_Artist', function ($http) {
    return {
        fn: function (code, callback) {
            $http.get("https://www.googleapis.com/freebase/v1/mqlread",
                {
                    params: {
                        query: [{
                            name: code,
                            mid: null,
                            type: '/music/guitarist',
                            '/music/group_member/instruments_played|=': [
                                'guitar',
                                'electric guitar',
                                'acoustic guitar'
                            ],
                            '/music/group_member/membership': [{
                                'group': null,
                                'mid': null
                            }],
                             "/music/artist/genre": [{
                                "name": null,
                                "artists": [{
                                  "name": null,
                                  "type": "/music/guitarist",
                                  "limit": 5
                                }],
                                "limit": 5
                              }],
                        }]
                    }
                }
            ).success(function (d, status, headers, config) {
                callback(d.result);
            })
        }
    };
});

eadgbeServices.factory('EN_Similar', function ($http) {
    return {
        fn: function (code, callback) {
            $http.get("http://developer.echonest.com/api/v4/artist/similar",
                {
                    params: {
                        api_key: 'I4JCF4EIX2TH5RWLI',
                        name: code
                    }
                }
            ).success(function (d, status, headers, config) {
                callback(d.response.artists);
            })
        }
    };
});

eadgbeServices.factory('EN_Artist', function ($http) {
    return {
        fn: function (code, callback) {
            $http.get("http://developer.echonest.com/api/v4/artist/search",
                {
                    params: {
                        api_key: 'I4JCF4EIX2TH5RWLI',
                        name: code,
                        bucket: [
                            'images',
                            'biographies', 
                            'terms'
                            //'video'
                        ],
                        results: 1
                    }
                }
            ).success(function (d, status, headers, config) {
                callback(d.response.artists[0]);
            })
        }
    };
});


eadgbeServices.factory('YT_Videos', function ($http) {
    return {
        fn: function (mid, callback) {
            $http.get("https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        key: 'AIzaSyC_D1F8ZWa_EGFTmTkQUPhmIPKGAK2sbuI',
                        topicId: mid,
                        type: 'video',
                        maxResults: 12,
                        part: 'id'
                    }
                }
            ).success(function (d, status, headers, config) {
                callback(d.items);
            })
        }
    };
});


eadgbeServices.factory('YT_Curated', function ($http) {
    return {
        fn: function (callback) {
            $http.get("/data.txt")

            .success(function (d, status, headers, config) {
                callback(d.feed.entry);
            })
            .error(function (d, status, headers, config) {
                console.log(d);
            })
        }
    };
});

eadgbeServices.factory('YT_Curated_II', function ($http) {
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

eadgbeServices.factory('API_updateJson', function ($http) {
    return {
        fn: function (callback) {
            $http.get("http://gdata.youtube.com/feeds/base/users/UClY3FU0h5PMTZpQQALwBB3g/newsubscriptionvideos?max-results=50",
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
                        console.log(json);
                        return json;
                    }
                }
            )
            .success(function (d, status, headers, config) {

                    var updated = new Date(d.feed.entry[0].published),
                        now = new Date();               

                    //if (now - updated < 144e5) {
                        
                        var newItem = d.feed.entry[0];
                        var videoUrl = newItem.link[0]._href;
                        console.log(newItem);

                        var code = 'CAAIchuoCPN0BAASlOudW4Wy97Ydyp28DgWIwLFc08sG6g2pgnbKfdeeA2iDxSgOJCzjMGOgY5rbAZCZA8JfOnXdqKSTujNluUsHkehmi2Nrrdd0zlqmhCGcaICL6ZCuQQszat30og7MasIMlnbcjp4P7JPmhEafeidR7Iooe3RZAAcYPWFWv';
                        var longLiveToken = 'CAAIchuoCPN0BAHdG88aZAABpwolAsyFHJuaKvjb0CtYY2UmX69hMDbdjPXrgtmFOgSEL2c5eFgPcfnz4nd5RI8CyU9V2H50SpGzT4KpfPL6GG5tXZANzQOiZCflJZAhVILINow7DiqI39maLBgzXU7AbbpYzPaamwKEwskX8o7pFbMZBAqQ7v';
                        
                        /*FB.api('/536951096380113/feed', 
                            'POST',
                            {
                                message: 'NEW VIDEO: ' + newItem.title.__text,
                                link: 'http://eadg.be',
                                picture: 'http://i.ytimg.com/vi/' + videoUrl.substring(videoUrl.indexOf('v=') + 2, videoUrl.indexOf('&')) + '/0.jpg',
                                description: newItem.title.__text,
                                access_token: longLiveToken 
                            },
                            function (response) {
                                console.log(response);
                            }
                        );*/
                      
                    //}            
                
                /*$http.post('/Services.asmx/UpdateJson',
                    {
                        data: JSON.stringify(d)
                    }
                ).success(function (resp) {


                    callback('success - updated at: ' + d.feed.updated + '. Message: ' + resp.d);
                });*/
            })
            .error(function (d, status, headers, config) {
                console.log(d);
            })
        }
    };
});


eadgbeServices.factory('API_postToPage', function ($http) {
    return {
        fn: function (callback) {
            var accessToken = 'CAAIchuoCPN0BAGiAbUcCgxB9wiAnxDaqLvWeOlb4nZBHj3Ezxd0FFH63rZBFyWWpLKR8oU59sqyFbzGpQCc4olt0OpK51bxGM4BpdpZAQZAWX1hY0N7WE61p1935ihxCLZCe4WY6JZAl0IYLfi8YrgLcFnQOjcnf8ikblvqjoMFhFTsAlkNZAUXqZCeg2dD3bggZD';
            var access_Token = 'CAAIchuoCPN0BAIqPZA25wSDydwZCGaDZC9rgCB4Xd7GCapT125LZC3CBEuayNBP66t1WJZCQXq64AOZCvSHSpR1aUr35uEkXr0FlmFsv0BpyCuolrC53FYNqpkcktDTwiSsptaAkvQMlPw7lciAF7BIU7XBLIALdlYKQL45X1RN7avxfXCa8oX';
            $http.get("/data.txt")
            .success(function (d, status, headers, config) {
                callback('A message');
            })
            .error(function (d, status, headers, config) {
                console.log(d);
            })
        }
    };
});
