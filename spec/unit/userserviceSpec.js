describe('userservice tests', function () {
    var userservice;
    var $httpBackend;
    var q;

    beforeEach(function () {
        module('app');
        module('ngMockE2E');
    });

    // Inject service using angular-mocks
    beforeEach(inject(function ($q, _userservice_) {
        q = $q;
        userservice = _userservice_;
    }));

    // Set up the mock http service responses
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend
            .whenGET('/client/app/views/dashboard.html')
            .respond("");

        $httpBackend
            .whenGET('/client/app/scripts/auth/loginuser.html')
            .respond("");
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should have the service be defined', function () {
        // Arrange
        expect(userservice).toBeDefined();
    });

    it('authenticateuser works for value email and password', function () {

        // Act
        var user = userservice.authenticateUser('ryan.spears@worldsmart.com.au', 'password1');

        // Assert
        expect(user).toBeDefined();
        expect(user.userName).toBe('Ryan Spears');
        expect(user.operatorNumber).toBe(1);
    });

    it('should be able to successfully return a promise from openUserLogin', function () {
        // Arrange

        // Act
        var promise = userservice.openUserLogin();

        // Assert
        expect(promise).toBeDefined();
    });

    it('getUsers() should return 2 users', function () {
        // Arrange

        // Act
        var promise = userservice.getUsers();

        // Assert
        expect(promise).toBeDefined();
        expect(promise.$$state.value.length).toBe(2);
    });

    it('after authenticateuser the isCashier() should be false', function () {

        // Act
        var user = userservice.authenticateUser('ryan.spears@worldsmart.com.au', 'password1');

        // Assert
        expect(userservice.isCashier()).toBeFalsy();
    });
});
