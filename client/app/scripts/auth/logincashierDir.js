'use strict';

var app = angular.module('app');

app.directive('cashierLogin', function (userservice) {
    return {
        templateUrl: '/client/app/scripts/auth/logincashier.html',
        restrict: 'E',
        scope: {
            initialCollapsed: '@collapsed'
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: function ($scope, userservice) {
            this.title = 'Some title'
            this.loggedIn = true;

            this.user = userservice.getUser();

            if (this.user == null) {
                this.user = new User('Not logged in');;
            }
        }
    };
});
