'use strict';

var app = angular.module('app');

app.directive('cashierLogin', function (userservice) {
    return {
        templateUrl: '/client/app/scripts/auth/logincashier.html',
        restrict: 'E',
        scope: {
            initialCollapsed: '@collapsed'
        },
        //        controllerAs: 'vm',
        //        bindToController: true,
        controller: function ($scope, userservice) {
            $scope.title = 'Some title'
            $scope.loggedIn = true;

            $scope.user = userservice.getUser();

            if ($scope.user == null) {
                $scope.user = new User('Not logged in');;
            }

            console.log($scope.user.userName);
        }
    };
});
