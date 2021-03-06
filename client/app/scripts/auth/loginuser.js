(function () {

    'use strict';

    console.log('loginuser outer this ' + this);

    var controllerId = "loginuser";

    angular.module('app').controller(controllerId, loginuser);

    loginuser.$inject = ['$scope', '$modalInstance', 'userservice'];

    function loginuser($scope, $modalInstance, userservice, userAuthenticated) {

        var vm = this;

        console.log('loginuser ' + vm);

        vm.isCashier = isCashier;
        vm.user = null;
        vm.authenticate = authenticate;
        vm.email = '';
        vm.password = '';
        vm.userAuthenticated = userAuthenticated;

        activate();

        function activate() {
            console.log('loginuser');
            vm.user = userservice.getUser();
        }

        function isCashier() {
            console.log('loginuser.userIsCashier' + userservice.isCashier());
            return userservice.isCashier();
        }

        function authenticate() {
            vm.user = userservice.authenticateUser(vm.email, vm.password);
            $modalInstance.close(vm.user !== null);
        }

        return vm;
    }

}());
