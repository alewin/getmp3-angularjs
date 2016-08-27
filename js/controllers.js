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
    $scope.which_service = $route.current.$$route.paramMusicService;

    function getYoutubemp3() {
        return 'http://youtube.com'; // TODO lol
    }



    function download_youtube_video(video_id) {
        var out_file_name = null;
        var video = spawn('youtube-dl', [
            '--extract-audio',
            '--no-check-certificate',
            '--audio-format', 'mp3',
            '-o', '%(title)s.%(ext)s',
            util.format("https://www.youtube.com/watch?v=%s", video_id)
        ], {
            cwd: download_path,
            stdio: 'pipe'
        });



        video.stdout.on('data', function(data) {

            chunkString = data.toString();
            var rowArray = splitLogToRows(chunkString);
            rowArray.forEach(function(row) {
                switch (row.type) {
                    case "download":
                        log = (row.value);
                        if (log.indexOf("% of") != -1 && log.indexOf("ETA") != -1) {
                            percentage = log.substring(0, log.indexOf("%"));
                            console.log(percentage);
                            timeLeft = log.substr(log.indexOf("ETA ") + "ETA ".length);
                            console.log(timeLeft);
                        }
                        break;
                    case "ffmpeg":
                        log = (row.value);
                        if (log.indexOf("Destination") == 0) {
                            console.log("Converting to mp3...");
                        } else {
                            console.log("Finished converting! saving the file..");
                        }
                        break;
                    default:
                        console.log("Recieved Unknown Key:" + row.type);
                }
            });


            var line = data.toString().trim();
            console.log(line);
            var dest_match = line.match(/Destination: (.*)/);
            if (dest_match) {
                out_file_name = dest_match[1];
            }
        });

        video.stderr.on('data', function(data) {
            //util.log('youtube-dl: ' + data.toString().trim());
        });
        video.on('close', function(code) {
            console.log('Download of ' + out_file_name + 'finished');
        });
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
        var add = createMusicStruct($scope.which_service, song);
        AP.addSong(add);
    }
    $scope.playSong = function(song) {
        var add = createMusicStruct($scope.which_service, song);
        AP.playSong(add);
    }
    $scope.downloadSong = function(song) {
        switch ($scope.which_service) {
            case 'vk':
                return song.url;
            case 'youtube':
                download_youtube_video(song.id.videoId);
        }
    }
    $scope.searchMusic = function(query) {
        //TODO remove redundant from MusicService and add generic searchMusic function with service parameter
        if ($scope.which_service == 'vk') {
            var promise = MusicService.vk(query);
            promise.then(
                function(pay) {
                    pay.response.shift();
                    $scope.songs = pay.response;
                });
        }
        if ($scope.which_service == 'youtube') {
            var promise = MusicService.youtube(query);
            promise.then(
                function(pay) {
                    pay.items.shift();
                    $scope.songs = pay.items;
                });
        }
    }
});