var app = angular.module('LnuApp', ['directiveModule', 'angularUtils.directives.dirPagination', 'ui.bootstrap.demo','ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/persons");
    //
    // Now set up the states
    $stateProvider
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
        //.state('person', {
        //    url: "/person",
        //    templateUrl: "personsTable/personsTableView.html"
        //})
});

app.controller('MainCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.isLoggedIn = false;

    $scope.tab = 1;

    $scope.selectTab = function (setTab) {
        $scope.tab = setTab;
    };
    $scope.isSelected = function (checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.brand = 'LNU';
    $scope.personViewModel = 'Персони';
    $scope.propositionViewModel = 'Пропозиції';
    $scope.benefitsViewModel = 'Пільги';

    $scope.logout = function () {
        $scope.isLoggedIn = false;
        localStorage.setItem("token", "");
        localStorage.setItem("baseAuthString", "");
    };



























































}]);




