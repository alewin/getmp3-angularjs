app.controller('AppCtrl', function($scope, $mdSidenav, $mdToast, MusicService) {
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
                    //$scope.$apply();
                } catch (e) {
                    console.log($scope.songs);
                }
                //pay.response.forEach(function(item) {});
            });
    }

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
            email: 'getmp3blog@gmail.com',
            icon: 'surround_sound',
            version: "0.0.1"
        }
    };
});
