(function () {

    'use strict';

    var controllerId = "security";

    angular.module('app').controller(controllerId, security);

    security.$inject = ['$scope', '$window', 'userservice'];

    function security($scope, $window, userservice) {

        var vm = this;

        vm.getUser = getUser;

        activate();

        function activate() {
            console.log('security');
        }

        function getUser() {
            console.log('security.getUser ' + userservice.getUser());
            return userservice.getUser();
        }

        return vm;
    }

}());
