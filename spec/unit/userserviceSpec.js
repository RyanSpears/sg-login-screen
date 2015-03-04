var userservice;
var $httpBackend;

beforeEach(function () {
    module('app');
    module('ngMockE2E');
});

// Inject service using angular-mocks
beforeEach(inject(function ($injector, _userservice_) {
    // Arrange
    userservice = _userservice_;
}));

// Set up the mock http service responses
beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend
        .whenGET('/client/app/views/dashboard.html')
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

describe('userservice tests', function () {
    it('true should be true', function () {
        expect(true).toBe(true);
    });
});
