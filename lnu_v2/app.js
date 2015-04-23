var auth = angular.module('Authentication', []);
var persons = angular.module('Persons', []);
var propositions = angular.module('Propositions', []);
var benefits = angular.module('Benefits', []);

var app = angular.module('LnuApp', ['ui.bootstrap','ngRoute','Authentication','Persons','Propositions','Benefits'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            hideMenus: true
        });
        $routeProvider.when('/persons', {
            templateUrl: 'persons/persons.html'
        });
        $routeProvider.when('/propositions', {
            templateUrl: 'propositions/propositionView.html',
            controller: 'ProposalsCTRL'
        });
        $routeProvider.when('/person/:personId', {
            templateUrl: 'persons/person/person.html',
            controller: 'PersonCtrl'

        });
        $routeProvider.when('/benefits', {
            templateUrl: 'benefits/benefitsView.html',
            controller: 'BenefitsCTRL'
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
                if ($location.path() !== '/login' && $rootScope.token === "") {
                    $location.path('/login');
                }
            });
        }]);