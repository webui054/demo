var app = angular.module('LnuApp', ['directiveModule', 'angularUtils.directives.dirPagination', 'ui.bootstrap.demo']);
var app = angular.module('LnuApp', ['directiveModule','ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('persons', {
            url: "/",
            templateUrl: "personsTable/personsTableView.html"
        })
        .state('proposition', {
            url: "/proposition",
            templateUrl: "View/propositionView.html"
        });
        //.state('person', {
        //    url: "/person",
        //    templateUrl: "personsTable/personsTableView.html"
        //})
});

app.controller('MainCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.isLoggedIn = false;

    $scope.tab = 1;

    $scope.selectTab = function(setTab){
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
    };

    $scope.brand = 'LNU';
    $scope.personViewModel = 'Персони';
    $scope.propositionViewModel='Пропозиції';

    $scope.logout = function(){
        $scope.isLoggedIn = false;
        localStorage.setItem("token", "");
        localStorage.setItem("baseAuthString", "");
    };

}]);




