/**
 * Created by Oksana on 08.04.2015.
 */
persons.controller('ManCtrl', ["$scope", "$http", function ($scope, $http) {


    $scope.tempMan = [];
    $scope.personId = "";
    $scope.personPaperId = "";
    $scope.enrolSubId = "";
    $scope.mark = "";


    var tempPath = 'persons/man/tempMan.json';
    var path = tempPath;
    $scope.getZnoData = function () {
        $http.get(path).success(function (data) {
            $scope.tempMan = angular.fromJson(data);
            $scope.tempMan = (data);
        });
    };
    $scope.getZnoData();


    //$scope.deleteUser = function (id) {
    //    $http.delete(tempPath + id)
    //        .success(function (data) {
    //            $scope.tempMan = data;
    //        });
    //}


}
]);


