(function () {

    'use strict';

    var controllerId = "security";

    angular.module('app').controller(controllerId, security);

    security.$inject = ['$scope', '$window', '$modal', 'userservice'];

    function security($scope, $window, $modal, userservice) {

        var vm = this;

        vm.user = getUser();
        vm.loggedIn = userLoggedIn();
        vm.openModal = openModal;

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

        function openModal() {
            var modalInstance = $modal.open({
                templateUrl: '/client/app/scripts/auth/logincashier.html',
                controllerAs: 'vm',
                controller: 'logincashier',
                resolve: {},
                backdrop: 'static'
            });

            modalInstance.result.then(function() {
                console.log('Modal dismissed at ' + new Date());
            })
        }

        return vm;
    }

}());
