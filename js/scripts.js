var app = angular.module('myApp', ['ngMaterial']);

var AP = AudioPlayer;
AP.init({
    playList: [],
    notification: true,
    volume: 0.9,
    autoPlay: false
});

var vkConfig = {
    url: 'https://api.vk.com/method/audio.search',
    //accessToken: "fff9ef502df4bb10d9bf50dcd62170a24c69e98e4d847d9798d63dacf474b674f9a512b2b3f7e8ebf1d69",
    accessToken: "8426e7c42b7136646ac0c655ea0c09ad97bd80919a04a28d2e5a7860ab10862c3ac4805f27a75e096a589",
    autoComplete: 0,
    count: 300,
    sort: 2
};
