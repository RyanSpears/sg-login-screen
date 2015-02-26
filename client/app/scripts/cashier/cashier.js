(function () {

    'use strict';

    var controllerId = "cashier";

    angular.module('app').controller(controllerId, cashier);

    cashier.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'userservice'];

    function cashier($rootScope, $scope, $state, $stateParams, userservice) {

        var vm = this;

        vm.user;
        vm.title = $stateParams.title || 'No Title';

        activate();

        function activate() {
            vm.user = userservice.getUser();
        }

        $scope.$on('user:cashier', function () {
            console.log('received user:cashier broadcast');
            $state.transitionTo('cashier', {
                title: 'Dashboard'
            });
        });

         $scope.$watch('userservice.cashier', function (newVal, oldVal, scope) {
             if (newVal) {
                 console.log('userservice.isCashier new value for isCashier is' + newVal);
             }
         });

        return vm;
    }

}());
