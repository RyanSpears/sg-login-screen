(function () {

    'use strict';

    var controllerId = "sidemenu";

    angular.module('app').controller(controllerId, sidemenu);

    sidemenu.$inject = ['$scope', '$window', 'userservice'];

    function sidemenu($scope, $window, userservice) {

        var vm = this;

        vm.isCashier = isCashier;

        activate();

        function activate() {
            console.log('sidemenu');
        }

        function isCashier() {
            console.log('sidemenu.userIsCashier' + userservice.isCashier());
            return userservice.isCashier();
        }

        return vm;
    }

}());
