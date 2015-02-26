'use strict';

var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

var underscore = angular.module('underscore', []);

underscore.factory('_', function () {
    return window._;
});

app.config([
    "$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state("cashier", {
                    url: "/cashier/:title?Dashboard",
                    templateUrl: "/client/app/scripts/cashier/cashier.html",
                    controller: 'cashier as vm'
                })
                .state("cashier.redeem", {
                    url: "/redeem/:title",
                    views: {
                        "@": {
                            templateUrl: '/client/app/scripts/cashier/cashier.html',
                            controller: 'cashier as vm'
                        }
                    }
                })
                .state("cashier.customeradmin", {
                    url: "/customeradmin/:title",
                    views: {
                        "@": {
                            templateUrl: '/client/app/scripts/cashier/cashier.html',
                            controller: 'cashier as vm'
                        }
                    }
                })
                .state("cashier.lockingcards", {
                    url: "/lockingcards/:title",
                    views: {
                        "@": {
                            templateUrl: '/client/app/scripts/cashier/cashier.html',
                            controller: 'cashier as vm'
                        }
                    }
                })
                .state("cashier.cardtraces", {
                    url: "/cardtraces/:title",
                    views: {
                        "@": {
                            templateUrl: '/client/app/scripts/cashier/cashier.html',
                            controller: 'cashier as vm'
                        }
                    }
                })
                .state("cashier.participatingvenues", {
                    url: "/participatingvenues/:title",
                    views: {
                        "@": {
                            templateUrl: '/client/app/scripts/cashier/cashier.html',
                            controller: 'cashier as vm'
                        }
                    }
                });
    }
    ])
    .run(['$state', function ($state) {
            $state.transitionTo('cashier', {
                title: 'Dashboard'
            });
    }
]);

app.controller('dashboard', function ($scope) {
    console.log('dashboard');
});

app.run([
    '$rootScope', '$state', 'userservice',
    function ($rootScope, $state, userservice) {
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('State Changed Success ' + event.name + ', toState: ' + toState.name + ', fromState:' + fromState.name);
            });
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                console.log('State Changed Start ' + event.name + ', toState: ' + toState.name + ', fromState:' + fromState.name);

                if(userservice.stateAuthorisedForCashier(toParams.title)) {
                    return;
                }

                if(userservice.authenticatedState === toState.name) {
                    userservice.authenticatedState = '';
                    return;
                } else {
                    event.preventDefault();
                }

                return userservice.openCashierLogin().then(function (result) {
                    console.log('app.$stateChangeStart: cashierAuthenticated? = ' + result);
                    if (result) {
                        userservice.authenticatedState = toState.name;
                        $state.go(toState.name, toParams);
                    }
                }, function () {
                    console.log('in here');
                }, function () {
                    console.log('finally');
                });
            });
    }
]);
