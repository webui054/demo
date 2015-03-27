/**
 * Created by Dmytro on 16.03.2015.
 */

var app = angular.module('LnuApp', ['directiveModule']);

app.controller('MainCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {
    $scope.tab = 1;

    $scope.selectTab = function(setTab){
        $scope.getTempData();
        $scope.tab = setTab;
    };
    $scope.isSelected = function(checkTab){
        return $scope.tab === checkTab;
    };

    $scope.brand = 'LNU';
    $scope.personViewModel = 'Персони';
    $scope.propositionViewModel='Пропозиції';
    $scope.tempData = {};

    $scope.make_base_auth = function(user, password) {
        var tok = user + ':' + password;
        var hash = btoa(tok); // encoding string in Base64
        return "Basic " + hash;
    };
    $scope.BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";


    $scope.getTempData = function(){
        $scope.username = "admin";
        $scope.password = "nimda";
        $.ajax
        ({
            type: "GET",
            url: $scope.BASEURL + "api/specoffers",
            dataType: 'json',
            async: false,
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', $scope.make_base_auth($scope.username, $scope.password));
            },
            success: function (data){
                $scope.tempData = data;
                //angular.forEach(data, function(item){
                //    $scope.tempData.push(item);
                //    console.log(item);
                //});
            }
        });
    };
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




