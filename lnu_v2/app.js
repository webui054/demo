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
        $routeProvider.when('/addPerson/general', {
            templateUrl: 'persons/newPerson/general/generalView.html',
            controller: 'AddPersonGeneralInfoCtrl'

        });
        //todo add correct address view
        $routeProvider.when('/addPerson/address', {
            templateUrl: 'persons/newPerson/address/addressModal.html',
            controller: 'AddressModalCtrl'

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
        function ($rootScope, $location, $http) {
            $rootScope.$on('$locationChangeStart', function () {
                if ($location.path() !== '/login' && (localStorage.getItem('token') === "" || localStorage.getItem('token') === null)) {
                    $location.path('/login');
                }
                else{
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + localStorage.getItem('token');
                    $rootScope.isLoggedIn = true;
                }
            });
        }]);