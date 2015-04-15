var app = angular.module('LnuApp', ['directiveModule', 'angularUtils.directives.dirPagination',
    'PersonTableModule','ui.router']);

app.run(['$rootScope', '$location', 'Authentication', function ($rootScope, $location, Authentication) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Authentication.isLoggedIn3()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/home');
        }
    });
}]);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/persons");

    $stateProvider.state('login', {
            url: "/login",
            templateUrl: "login/loginView.html"
        })
        .state('persons', {
            url: "/persons",
            templateUrl: "personsTable/personsTableView.html"
        })
        .state('proposition', {
            url: "/proposition",
            templateUrl: "proposals/propositionView.html"
        }).state('benefits', {
            url: "/benefits",
            templateUrl: "benefits/benefitsView.html"
        });
});

app.controller('MainCtrl', ["$scope", "Authentication", "$http", "$filter", "$interval",
    function ($scope,Authentication, $http, $filter, $interval) {

    $scope.isLoggedIn = false;

    $scope.tab = 1;

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };


    $scope.$watch(Authentication.isLoggedIn3, function (value, oldValue) {

        if(!value && oldValue) {
            console.log("Disconnect");
            $location.path('/login');
        }

        if(value) {
            console.log("Connect");
            //Do something when the user is connected
        }

    }, true);




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



