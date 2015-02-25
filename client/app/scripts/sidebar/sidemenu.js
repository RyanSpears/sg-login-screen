(function () {

    'use strict';

    var controllerId = "sidemenu";

    angular.module('app').controller(controllerId, sidemenu);

    sidemenu.$inject = ['$scope', '$window', 'userservice'];

    function sidemenu($scope, $window, userservice) {

        var vm = {

        };

        activate();

        function activate() {
            vm.user = $window.user || userservice.getUser();
            console.log(vm.user);
        }

        return vm;
    }

}());
