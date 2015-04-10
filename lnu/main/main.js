var app = angular.module('LnuApp', ['directiveModule', 'angularUtils.directives.dirPagination','PersonTableModule','ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/persons");

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
app.filter('checkYesNo',function() {
    return function(input) {
        if(typeof input === "Number"){
            input = input !== 0;
        }
        return input ? 'Так' : 'Ні';
    };
});



