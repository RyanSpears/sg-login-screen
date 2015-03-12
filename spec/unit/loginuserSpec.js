describe('loginuser controller', function () {
    var $controllerConstructor;
    var modalInstance = {};
    var scope;
    var userservice;
    var ctrl;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $rootScope, _userservice_) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        userservice = _userservice_;
    }));

    beforeEach(function(){
        ctrl = $controllerConstructor('loginuser', {
            $scope: scope,
            $modalInstance: modalInstance,
            userservice: userservice
        });
    });

    it('user should be null on activate()', function () {
        var user = ctrl.user;
        expect(user).toBeNull();
    });

    it('should be defined', function () {
        expect(ctrl).toBeDefined();
    });
});
