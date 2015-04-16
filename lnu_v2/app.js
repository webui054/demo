var auth = angular.module('Authentication', []);
var main = angular.module('Persons', []);


var app = angular.module('LnuApp', ['ngRoute','Authentication','Persons'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            hideMenus: true
        });
        $routeProvider.when('/persons', {
            templateUrl: 'persons/persons.html'
        });
        $routeProvider.when('/some', {
            templateUrl: 'someView/someView.html',
            controller: 'SomeCtrl'
        });
        $routeProvider.when('/logout', {
            resolve: ['AuthenticationService','$location', function(AuthenticationService,$location){
                AuthenticationService.ClearCredentials();
                $location.path('/login');
            }]
        });

        $routeProvider.otherwise({ redirectTo: '/login' });
    }])
    .run(['$rootScope', '$location', '$http',
        function ($rootScope, $location,$http) {

            $rootScope.token = localStorage.getItem('token');
            if ($rootScope.token !== "") {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.token;
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                console.log($location.path());
                if ($location.path() !== '/login' && $rootScope.token === "") {
                    $location.path('/login');
                }
            });
        }]);