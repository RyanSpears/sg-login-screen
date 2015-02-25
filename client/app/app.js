'use strict';

var app = angular.module('app', ['ui.router']);

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
                    templateUrl: "/client/app/views/dashboard.html"
                });
    }
])
.run(['$state',
    function ($state) {
        $state.transitionTo('home');
    }
])

app.factory('userservice', ['$scope', '$window'], function ($scope, $window) {

    console.log('userservice');

    var service = {
        authenticate: authenticate
    };

    return service;

    function authenticate(email, password) {
        var user = _.findWhere(data.users, function (user) {
            return user.email === email && user.password === password;
        })

        return user;
    }
})
