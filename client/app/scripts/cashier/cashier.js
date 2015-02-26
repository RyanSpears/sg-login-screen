(function () {

    'use strict';

    var controllerId = "cashier";

    angular.module('app').controller(controllerId, cashier);

    cashier.$inject = ['$scope', '$state', '$stateParams', 'userservice'];

    function cashier($scope, $state, $stateParams, userservice) {

        var vm = this;

        vm.user;
        vm.title = $stateParams.title || 'No Title';

        activate();

        function activate() {
            vm.user = userservice.getUser();
        }

        return vm;
    }

}());
