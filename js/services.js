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
        },
        youtube: function(query) {
            var deferred = $q.defer();
            var data = {
                q: query,
                key: ytConfig.key,
                part: ytConfig.part,
                type: ytConfig.type,
                maxResults: ytConfig.maxResults,
                callback: 'JSON_CALLBACK'
            };
            $http.jsonp(ytConfig.url, {
                    params: data
                })
                .success(function(response) {
                    deferred.resolve(response);
                    $rootScope.$$phase || $rootScope.$apply();
                })
                .error(function(response) {
                    console.log("Error YT");
                });
            return deferred.promise;
        },
    }
});
