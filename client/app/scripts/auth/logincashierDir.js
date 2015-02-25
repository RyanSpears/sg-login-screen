'use strict';

var app = angular.module('app');

app.directive('cashierLogin', function (userservice) {
    return {
        templateUrl: '/client/app/scripts/auth/logincashier.html',
        restrict: 'E',
        scope: {
            user: '=',
            initialCollapsed: '@collapsed'
        },
        controllerAs: 'vm',
        bindToController: true,
        controller: function () {
            console.log('In cashierLogin directive');

            if(this.user === null) {
                this.user.name = 'No name';
            }

            this.title = 'Some title'
        }
    };
});
