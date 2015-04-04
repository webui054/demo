var app = angular.module('LnuApp', ['directiveModule']);

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




