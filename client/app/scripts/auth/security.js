(function () {

    'use strict';

    var controllerId = "security";

    angular.module('app').controller(controllerId, security);

    security.$inject = ['$scope', '$window', 'userservice'];

    function security($scope, $window, userservice) {

        var vm = this;

        vm.user = getUser();
        vm.loggedIn = userLoggedIn();

        activate();

        function activate() {
            console.log('security');
        }

        function getUser() {
            console.log('security.getUser ' + userservice.getUser());
           return userservice.getUser();
        }

        function userLoggedIn() {
            return getUser() !== null;
        }

        return vm;
    }

}());
