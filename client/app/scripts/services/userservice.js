(function () {
    'use strict';

    var serviceId = 'userservice';

    alertservice.$inject = ['$modal', '$q']

    angular.module('app').factory(serviceId, alertservice);

    function alertservice($modal, $q) {

        console.log('userservice');

        var user = null;
        var users = [
            {
                userName: 'Ryan Spears',
                email: 'ryan.spears@worldsmart.com.au',
                password: 'password1',
                operatorNumber: 1,
                passcode: '9876',
                roles: ['Cashier', 'Admin']
            },
            {
                userName: 'Alex Weise',
                email: 'alex.weise@worldsmart.com.au',
                password: 'password2',
                operatorNumber: 2,
                passcode: '1234',
                roles: ['Cashier']
            }
        ];

        var loggedIn = false;
        var cashierAuthenticated = false;
        var authenticatedState = '';
        var stateAuthorisedForCashier = stateAuthorisedForCashier;
        var cashierAllowedStates = ['Dashboard','Participating Venues'];

        function getUser() {
            return user;
        };

        function isCashier() {
            return user === null && !loggedIn;
        }

        function authenticateCashier(operatorNumber, passcode) {
            var user = _.findWhere(users, { operatorNumber: Number(operatorNumber), passcode: passcode});

            return user || null;
        };

        function openCashierLogin() {
             var deferred = $q.defer();

            var modalInstance = $modal.open({
                templateUrl: '/client/app/scripts/auth/logincashier.html',
                controllerAs: 'vm',
                controller: 'logincashier',
                resolve: {
                    cashierAuthenticated: function () {
                        return cashierAuthenticated;
                    }
                },
                backdrop: 'static'
            }).result.then(function (authenticated) {
                cashierAuthenticated = authenticated;
                console.log('Modal submitted at ' + new Date() + ' with a value of ' + cashierAuthenticated);
                deferred.resolve(cashierAuthenticated);
            }, function() {
                deferred.reject('Error getting authentication!');
            });

            return deferred.promise;
        };

        function stateAuthorisedForCashier(state) {
            return _.contains(cashierAllowedStates, state) && isCashier();
        }

        return {
            getUser: getUser,
            authenticateCashier: authenticateCashier,
            isCashier: isCashier,
            openCashierLogin: openCashierLogin,
            cashierAuthenticated: cashierAuthenticated,
            authenticatedState: authenticatedState,
            stateAuthorisedForCashier: stateAuthorisedForCashier
        }
    }
})();
