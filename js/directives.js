app.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])

app.directive('myEnter', function() {
  console.log("OK");
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

app.directive('header', function() {
    return {
        restrict: 'EA',
        templateUrl: 'templates/header.html',
        controller: "sidenavCtrl"
    };
});


/*
TODO add directive for player
app.directive("myPlayer", function($templateRequest, $compile) {
    return {
        scope: true,
        link: function(scope, element, attrs) {
            $templateRequest('templates/player.html').then(function(html) {
                element.append($compile(html)(scope));
            });
        }
    };
});

app.directive('myPlayer', function($compile){
    return {
      restrict: 'EA',
      templateUrl: 'templates/player.html',
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  });
*/
