var AP = AudioPlayer;
// test image for web notification
var iconImage = 'http://funkyimg.com/i/21pX5.png';
AP.init({
    playList: [],
    notification: true,
    volume: 0.9,
    autoPlay: false
});
var app = angular.module('myApp', ['ngMaterial']);


var vkConfig = {
    url: 'https://api.vk.com/method/audio.search',
    //accessToken: "fff9ef502df4bb10d9bf50dcd62170a24c69e98e4d847d9798d63dacf474b674f9a512b2b3f7e8ebf1d69",
    accessToken: "8426e7c42b7136646ac0c655ea0c09ad97bd80919a04a28d2e5a7860ab10862c3ac4805f27a75e096a589",
    autoComplete: 0,
    count: 300,
    sort: 2
};
app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])


app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default').primaryPalette('indigo');
})

app.directive('myEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});


app.factory("MusicService", function($q, $http, $rootScope) {
    return {
        vk: function(query) {
            var deferred = $q.defer();
            var data = {
                q: query,
                sort: vkConfig.sort,
                auto_complete: vkConfig.autoComplete,
                access_token: vkConfig.accessToken,
                count: vkConfig.count,
                uid: "163398985",
                callback: 'JSON_CALLBACK'
            };
            $http.jsonp(vkConfig.url, { params: data })
                .success(function(response) {
                    deferred.resolve(response);
                    $rootScope.$$phase || $rootScope.$apply();
                })
                .error(function(response) {
                    console.log("Error VK");
                });
            return deferred.promise;
        }
    }
});






app.controller('AppCtrl', function($scope, $mdSidenav, $mdToast, MusicService) {





    $scope.playlistSong = function(song) {

        var add = { 'icon': iconImage, 'title': song.title, 'artist': song.artist, 'file': song.url };
        AP.addSong(add);
    }
    $scope.playSong = function(song) {

        var add = { 'icon': iconImage, 'title': song.title, 'artist': song.artist, 'file': song.url };
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
                    $scope.$apply();
                } catch(e) {
                    console.log($scope.songs);
                }
                //pay.response.forEach(function(item) {});
            });
    }


    $scope.toggleSidenav = function(menu) {
        $mdSidenav(menu).toggle();
    }
    $scope.toast = function(message) {
        var toast = $mdToast.simple().content('You clicked ' + message).position('bottom right');
        $mdToast.show(toast);
    };
    $scope.toastList = function(message) {
        var toast = $mdToast.simple().content('You clicked ' + message + ' having selected ' + $scope.selected.length + ' item(s)').position('bottom right');
        $mdToast.show(toast);
    };
    $scope.selected = [];
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
    }
});
