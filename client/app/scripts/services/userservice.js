(function () {
    'use strict';

    var serviceId = 'userservice';

    angular.module('app').factory(serviceId, alertservice);

    function alertservice() {

      console.log('userservice');

        var user = null;
        var loggedIn = false;

        function getUser() {
            return user;
        };

        function isCashier() {
            return user === null && !loggedIn;
        }

        function authenticate(email, password) {
            var user = _.findWhere(data.users, function (user) {
                return user.email === email && user.password === password;
            })

            return user;
        };

        return  {
            getUser: getUser,
            authenticate: authenticate,
            isCashier: isCashier
        }
    }
})();
