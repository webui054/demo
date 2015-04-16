// declare modules
var auth = angular.module('Authentication', []);

var app = angular.module('LnuApp', ['directiveModule','angularUtils.directives.dirPagination',
    'PersonTableModule','ngRoute','Authentication'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
                templateUrl: 'personsTable/personsTableView.html',
                hideMenus: true
            });
        $routeProvider.when('/persons', {
                templateUrl: 'personsTable/personsTableView.html'
            });
        $routeProvider.when('/proposals', {
                templateUrl: 'proposals/propositionView.html'
            });
        $routeProvider.when('/benefits', {
                templateUrl: 'benefits/benefitsView.html'
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



//app.run(['$rootScope', '$location', 'Authentication', function ($rootScope, $location, Authentication) {
//    $rootScope.$on('$routeChangeStart', function (event) {
//
//        if (!Authentication.isLoggedIn3()) {
//            console.log('DENY');
//            event.preventDefault();
//            $location.path('/login');
//        }
//        else {
//            console.log('ALLOW');
//            $location.path('/home');
//        }
//    });
//}]);
//
//app.config(function($stateProvider, $urlRouterProvider) {
//
//    $urlRouterProvider.otherwise("/persons");
//
//    $stateProvider.state('login', {
//            url: "/login",
//            templateUrl: "login/loginView.html"
//        })
//        .state('persons', {
//            url: "/persons",
//            templateUrl: "personsTable/personsTableView.html"
//        })
//        .state('proposition', {
//            url: "/proposition",
//            templateUrl: "proposals/propositionView.html"
//        }).state('benefits', {
//            url: "/benefits",
//            templateUrl: "benefits/benefitsView.html"
//        });
//});

app.controller('MainCtrl', ["$scope",
    function ($scope) {

        $scope.isLoggedIn = false;

        $scope.tab = 1;

        $scope.selectTab = function (setTab) {
            $scope.tab = setTab;
        };
        $scope.isSelected = function (checkTab) {
            return $scope.tab === checkTab;
        };

        $scope.brand = 'ЛНУ';
        $scope.personViewModel = 'Персони';
        $scope.propositionViewModel = 'Пропозиції';
        $scope.benefitsViewModel = 'Пільги';

        $scope.logout = function () {
            $scope.isLoggedIn = false;
            localStorage.setItem("token", "");
            localStorage.setItem("baseAuthString", "");
        };
    }]);

app.filter('checkYesNo',function() {
    return function(input) {
        if(typeof input === "Number"){
            input = input !== 0;
        }
        return input ? 'Так' : 'Ні';
    };
});