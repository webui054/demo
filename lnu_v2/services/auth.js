auth.factory('AuthenticationService',['$http', '$rootScope',
        function ($http, $rootScope) {
            var service = {};

            service.Login = function (username, password) {
                var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
                var authdata  = btoa(username + ':' + password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
                return $http.get(baseUrl + '/api/contacts/types');
               // return $http.get(baseUrl + 'api/persons?limit=1');

            };

            service.SetCredentials = function (username, password) {
                var authdata  = btoa(username + ':' + password);
                localStorage.setItem('token', authdata);
                $rootScope.isLoggedIn = true;
            };

            service.ClearCredentials = function () {
                $rootScope.isLoggedIn = false;
                localStorage.setItem('token', "");
                $http.defaults.headers.common.Authorization = 'Basic ';
            };

            return service;
        }]);