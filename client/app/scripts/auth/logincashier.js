(function () {

    'use strict';

    var controllerId = "logincashier";

    angular.module('app').controller(controllerId, logincashier);

    logincashier.$inject = ['$scope', '$window', '$modalInstance', 'userservice'];

    function logincashier($scope, $window, $modalInstance, userservice, cashierAuthenticated) {

        var vm = this;

        vm.isCashier = isCashier;
        vm.user = null;
        vm.authenticate = authenticate;
        vm.closeModal = closeModal;
        vm.operatorNumber = '';
        vm.passcode = '';
        vm.cashierAuthenticated = cashierAuthenticated;

        activate();

        function activate() {
            console.log('logincashier');
            vm.user = userservice.getUser();
        }

        function isCashier() {
            console.log('logincashier.userIsCashier' + userservice.isCashier());
            return userservice.isCashier();
        }

        function closeModal() {
            $modalInstance.dismiss('cancel');
        }

        function authenticate() {
            vm.user = userservice.authenticateCashier(vm.operatorNumber, vm.passcode);
            $modalInstance.close(vm.user !== null);
        }

        return vm;
    }

}());
