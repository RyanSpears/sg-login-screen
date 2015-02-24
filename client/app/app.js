var app = angular.module('app', [
    'ui.router'
]);

var underscore = angular.module('underscore', []);

underscore.factory('_', function () {
    return window._;
});

app.config(["$stateProvider",
    "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "client/app/index.html",
            })
    }
])
