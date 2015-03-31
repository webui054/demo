app.controller('AddressCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {
    $scope.tempData = [];
    $scope.tempData2 = [];
    $scope.tempData3 = {};
    //$scope.make_base_auth = function(user, password) {
    //    var tok = user + ':' + password;
    //    var hash = btoa(tok); // encoding string in Base64
    //    return "Basic " + hash;
    //};
    //$scope.BASEURL = "http://104.236.29.16:8080/is-lnu-rest-api/";

    $scope.getTempDataById = function(id){
        $scope.username = localStorage.getItem("login");
        $scope.password2 = localStorage.getItem("password");
        $.ajax
        ({
            type: "GET",
            url: $scope.BASEURL + "api/specialties/" + id,
            dataType: 'json',
            async: false,
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', $scope.make_base_auth($scope.username, $scope.password2));
            },
            success: function (data){
                $scope.tempData3 = angular.fromJson(data);
            }
        });
    };

    $scope.getTempData = function(){
        $scope.username = localStorage.getItem("login");
        $scope.password2 = localStorage.getItem("password");
        $.ajax
        ({
            type: "GET",
            url: $scope.BASEURL + "api/specoffers",
            dataType: 'json',
            async: false,
            data: '{}',
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', $scope.make_base_auth($scope.username, $scope.password2));
            },
            success: function (data){
                $scope.tempData = angular.fromJson(data.resources);
                angular.forEach($scope.tempData,function(item){
                    $scope.getTempDataById(item.specialtyId);
                    item.name = $scope.tempData3.name;
                    $scope.tempData2.push(item);
                    $scope.tempData3 = {};
                });

            }
        });
    };

    //$scope.getTempData();


}]);/**
 * Created by student on 26.03.2015.
 */
