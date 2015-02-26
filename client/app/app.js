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
                .state("dashboard", {
                    url: "/dashboard?user=cashier",
                    templateUrl: "/client/app/views/dashboard.html",
                    controller: 'dashboard as vm'
                })
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
            $state.transitionTo('dashboard');
    }
]);

app.controller('dashboard', function ($rootScope, $scope, $state, $stateParams, userservice) {
    if (typeof ($stateParams.user) === 'undefined' || $stateParams.user.toLowerCase() !== "cashier") {
        userservice.setCashierFromUrl(false);
    } else {
        userservice.setCashierFromUrl(true);
        $state.transitionTo('cashier', {
            title: 'Dashboard'
        });
    }

    $scope.$on('user:other', function () {
        $state.transitionTo('dashboard');
    });
});

app.controller('footer', function ($scope, $state, $stateParams, userservice) {

    console.log('footer');

    var vm = this;

    vm.isCashier = isCashier;
    vm.cashier = cashier;

    function cashier(val) {
        userservice.setCashierFromUrl(val);

        if (val) {
            $state.transitionTo('cashier', {
                title: 'Dashboard'
            });
        } else {
            $state.transitionTo('dashboard');
        }
    }

    function isCashier() {
        return userservice.isCashier();
    }

    return vm;
});

app.run([
    '$rootScope', '$state', 'userservice',
    function ($rootScope, $state, userservice) {
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
//                console.log('State Changed Success ' + event.name + ', toState: ' + toState.name + ', fromState:' + fromState.name);
            });
        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
//                console.log('State Changed Start toState: ' + toState.name + ', toParams: ' + toParams.title + ', fromState:' + fromState.name);
                authoriseCashier(event, toState, toParams, fromState, fromParams, userservice);
            });
    }
]);

function authoriseCashier(event, toState, toParams, fromState, fromParams, userservice) {

    // state need to contain cashier to continue
    if (toState.name.toLowerCase().indexOf("cashier") === -1) {
        return;
    }

    // If not a Cashier then leave this authorisation
    if (!userservice.isCashier()) {
        return;
    }

    // If the user is a Cashier and the state is in a list of approved states
    // then they can continue.
    if (userservice.stateAuthorisedForCashier(toParams.title)) {
        return;
    }

    // If the user has just attempted to get authorisation then they will
    // have had state of the route set
    if (userservice.authenticatedState === toState.name) {
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
}
