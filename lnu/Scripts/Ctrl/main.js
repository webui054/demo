/**
 * Created by Dmytro on 16.03.2015.
 */

var app = angular.module('LnuApp', ['directiveModule']);

app.controller('MainCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {
    //login logic
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

    // UI

    $('#testModal').on('shown.bs.modal', function () {

    });

    $('#testModal').on('hidden.bs.modal', function () {

    });

    $scope.showModal = function(id) {
        if (id === null) {
            return;
        }
        setTimeout(function() {
            $(id).modal('show');
        }, 500);
    };
}]);




