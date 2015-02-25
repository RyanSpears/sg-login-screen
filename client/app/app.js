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
