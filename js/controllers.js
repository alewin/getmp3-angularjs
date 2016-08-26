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


app.controller('MusicCtrl', function($scope, $route, MusicService) {
    var iconImage = 'img/music_icon.png';
    var which_service = $route.current.$$route.paramMusicService;


    function getYoutubemp3() {
        return 'http://youtube.com'; // TODO lol
    }

    function createMusicStruct(who, song) {
        var add = {};
        switch (who) {
            case 'vk':
                add = {
                    'icon': iconImage,
                    'title': song.title,
                    'artist': song.artist,
                    'file': song.url
                };
                break;
            case 'youtube':
                add = {
                    'icon': iconImage,
                    'artist': song.snippet.title,
                    'title': "",
                    'file': getYoutubemp3(song.id.videoId)
                };
                break;
            default:
                break;
        }
        return add;
    }
    $scope.playlistSong = function(song) {
        var add = createMusicStruct(which_service, song);
        AP.addSong(add);
    }
    $scope.playSong = function(song) {
        var add = createMusicStruct(which_service, song);
        AP.playSong(add);
    }
    $scope.searchMusic = function(query) {
        //TODO remove redundant from MusicService and add generic searchMusic function with service parameter
        if (which_service == 'vk') {
            var promise = MusicService.vk(query);
            promise.then(
                function(pay) {
                    pay.response.shift();
                    $scope.songs = pay.response;
                });
        }
        if (which_service == 'youtube') {
            promise = MusicService.youtube(query);
            promise.then(
                function(pay) {
                    pay.items.shift();
                    $scope.songs = pay.items;
                });
        }
    }
});
