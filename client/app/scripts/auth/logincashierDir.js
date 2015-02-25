'use strict';

var app = angular.module('app');

app.directive('cashierLogin', function (userservice) {
    return {
        templateUrl: '/client/app/scripts/auth/logincashier.html',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        controllerAs: 'vm',
        bindToController: true,
        controller: function () {
            this.showModel = showModal;
            this.title = 'Awesome title';

            function showModal() {
                return true;
            }
        }
    };
});
