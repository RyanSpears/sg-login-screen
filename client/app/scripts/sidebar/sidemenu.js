(function () {

    'use strict';

    var controllerId = "sidemenu";

    angular.module('app').controller(controllerId, sidemenu);

    sidemenu.$inject = ['$scope', '$window', 'userservice'];

    function sidemenu($scope, $window, userservice) {

        var vm = this;

        vm.isCashier = isCashier;
        vm.openModal = openModal;

        activate();

        function activate() {
            console.log('sidemenu');
        }

        function isCashier() {
            return userservice.isCashier();
        }

        function openModal() {
            var modalInstance = $modal.open({
                templateUrl: '/client/app/scripts/auth/logincashier.html',
                controllerAs: 'vm',
                controller: 'logincashier',
                resolve: {},
                backdrop: 'static'
            });

            modalInstance.result.then(function () {
                console.log('Modal dismissed at ' + new Date());
            })
        }

        $scope.$on('user:cashier', function () {
            console.log('received user:cashier broadcast');
            isCashier();
        });

        $scope.$on('user:other', function () {
            console.log('received user:other broadcast');
            isCashier();
        });


        return vm;
    }

}());
