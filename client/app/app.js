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
                    templateUrl: "/client/app/views/dashboard.html",
                    controller: 'dashboard as vm'
                });
    }
])
    .run(['$state',
    function ($state) {
            $state.transitionTo('home');
    }
])

app.controller('dashboard', function ($scope) {
    console.log('dashboard');
})

app.factory('userservice', function () {

    console.log('userservice');

    var user = null;

    function getUser() {
        return user;
    };

    function authenticate(email, password) {
        var user = _.findWhere(data.users, function (user) {
            return user.email === email && user.password === password;
        })

        return user;
    };

    return  {
        getUser: getUser,
        authenticate: authenticate
    }
})
