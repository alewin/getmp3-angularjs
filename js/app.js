var app = angular.module('myApp', ['ngMaterial', 'ngRoute']);
var fs = require('fs');
var youtubedl = require('youtube-dl')
var spawn = require('child_process').spawn;
var util = require('util');


var configFile = 'config.json';

var configFile = JSON.parse(
    fs.readFileSync(configFile)
);

var download_path = configFile.download_path;
console.log(configFile.download_path);


app.config(function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.
    when('/music/youtube', {
        templateUrl: 'templates/music_list.html',
        controller: "MusicCtrl",
        paramMusicService: 'youtube'

    }).
    when('/music/vk', {
        templateUrl: 'templates/music_list.html',
        controller: "MusicCtrl",
        paramMusicService: 'vk'
    }).
    otherwise('/music/youtube');
});

var AP = AudioPlayer;
AP.init({
    playList: [],
    notification: true,
    volume: 0.9,
    autoPlay: false
});

/*
fff9ef502df4bb10d9bf50dcd62170a24c69e98e4d847d9798d63dacf474b674f9a512b2b3f7e8ebf1d69
*/
var vkConfig = {
    url: 'https://api.vk.com/method/audio.search',
    accessToken: "8426e7c42b7136646ac0c655ea0c09ad97bd80919a04a28d2e5a7860ab10862c3ac4805f27a75e096a589",
    autoComplete: 0,
    count: 300,
    sort: 2,
    uid: "163398985"
};
/*
AIzaSyDov_EJkjxi_Qqu8oS4YFoH8TFp9eGKXBY
AIzaSyD0k1yj52ZsotEG0OF0HWQC_fq4K3HWEKQ
AIzaSyCsFnZ64jbCedT3hzYKjzlHeJAcYsOlC8A
AIzaSyBcYKu5TcSDF9yxQEmydlN1Ax9BMb0jmxk
*/
var ytConfig = {
    url: 'https://www.googleapis.com/youtube/v3/search',
    key: "AIzaSyCsFnZ64jbCedT3hzYKjzlHeJAcYsOlC8A",
    part: "snippet",
    maxResults: 50,
    type: "video"
};