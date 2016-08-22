app.controller('sidenavCtrl', function($scope, $mdSidenav) {

    $scope.toggleSidenav = function(menu) {
        $mdSidenav(menu).toggle();
    }
    $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else list.push(item);
    };
    $scope.data = {
        title: 'Getmp3',
        app: {
            name: 'Getmp3',
            icon: 'surround_sound',
            version: "0.0.2"
        }
    };

});


app.controller('VkCtrl', function($scope, MusicService) {
    var iconImage = 'http://funkyimg.com/i/21pX5.png';

    $scope.playlistSong = function(song) {

        var add = {
            'icon': iconImage,
            'title': song.title,
            'artist': song.artist,
            'file': song.url
        };

        AP.playSong(add);
    }
    $scope.playSong = function(song) {

        var add = {
            'icon': iconImage,
            'title': song.title,
            'artist': song.artist,
            'file': song.url
        };
        AP.playSong(add);

    }
    $scope.searchMusic = function(query) {
        var promise = MusicService.vk(query);
        promise.then(
            function(pay) {
                try {
                    pay.response.shift();
                    $scope.songs = pay.response;
                    console.log($scope.songs);

                } catch (e) {
                    console.log($scope.songs);
                }
                //pay.response.forEach(function(item) {});
            });
    }
});




function getYqlUrl(url) {
    return 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '"') + '&format=json&callback=';
}









app.controller('YoutubeCtrl', function($scope, $http, MusicService) {
    var iconImage = 'http://funkyimg.com/i/21pX5.png';

    loadVideoId = function(id) {
        console.log('Load: ' + id);
        var yimUrl = 'http://youtubeinmp3.com/fetch/?format=JSON&video=http://www.youtube.com/watch?v=' + id,
            yql = getYqlUrl(yimUrl);

        $http({
            method: 'GET',
            url: yql
        }).then(function successCallback(d) {
            var txt = d.data.query.results.body;
            if (txt) {
                try {
                    var obj = JSON.parse(txt);
                    console.log(obj.link);
                    return obj.link;
                } catch (e) {
                    console.log('Errore JSON');
                    return "";
                }
            }
        }, function errorCallback(response) {
            console.log("eerrore");
        });

/*
http://w7.youtubeinmp3.com/download/get/?id=pOKaXSyeKaA&r=6Xmg5SlCHfXLm999Ic4omfy1P0SLTvqZ&t=Calcutta+-+Frosinone+%28Video+Ufficiale%29
http://www.youtubeinmp3.com/download/get/?i=PlfpEcZtK8Bi8WldlVb9%2BNrjf%2FycL6eM1gHd%2F7I5bigaXGj8SFdKKGwhPi4jg4YWtmNBNY%2Bkxz6eZyFdQZDOdw%3D%3D

*/
    };

    $scope.playlistSong = function(song) {

        var add = {
            'icon': iconImage,
            'artist': song.snippet.title,
            'title': "",
            'file': loadVideoId( song.id.videoId)
        };

        AP.playSong(add);
    }
    $scope.playSong = function(song) {

        var add = {
            'icon': iconImage,
            'artist': song.snippet.title,
            'title': "",
            'file': loadVideoId(song.id.videoId)
        };
        AP.playSong(add);

    }
    $scope.searchMusic = function(query) {
        var promise = MusicService.youtube(query);
        promise.then(
            function(pay) {
                try {
                    pay.items.shift();
                    $scope.songs = pay.items;
                    console.log($scope.songs);
                    //$scope.$apply();
                } catch (e) {
                    console.log($scope.songs);
                }
            });
    }
});
