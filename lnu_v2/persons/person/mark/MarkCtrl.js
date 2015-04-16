/**
 * Created by Oksana on 09.04.2015.
 */
persons.controller('MarkCtrl', ["$scope", "$http", function ($scope, $http) {


    $scope.tempMarkZno = [];
    $scope.personId = "";
    $scope.personPaperId = "";
    $scope.enrolSubId = "";
    $scope.mark = "";

    var tempPath1 = 'persons/person/zno/tempZno.json';
    var path1 = tempPath1;
    $scope.getZnoData = function () {
        $http.get(path1).success(function (data) {
            $scope.tempMarkZno = angular.fromJson(data);
            $scope.tempMarkZno = (data);
        });
    };

    $scope.tempMan = [];
    $scope.personId = "";
    $scope.personPaperId = "";
    $scope.enrolSubId = "";
    $scope.mark = "";


    var tempPath2 = 'persons/person/man/tempMan.json';
    var path2 = tempPath2;
    $scope.getZnoData = function () {
        $http.get(path2).success(function (data) {
            $scope.tempMarkMan = angular.fromJson(data);
            $scope.tempMarkMan = (data);
        });
    };
    $scope.getZnoData();
}])


