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
            $http.jsonp(vkConfig.url, {
                    params: data
                })
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
