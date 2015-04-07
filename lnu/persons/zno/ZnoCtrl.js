app.controller('ZnoCtrl', ["$scope", "$http", function ($scope, $http) {


    $scope.tempZno = [];
    $scope.personId = "";
    $scope.personPaperId = "";
    $scope.enrolSubId = "";
    $scope.mark = "";

    var tempPath = 'persons/zno/tempZno.json';
    var path = tempPath;
    $scope.getZnoData = function () {
        $http.get(path).success(function (data) {
            $scope.tempZno = angular.fromJson(data);
            $scope.tempZno = (data);
        });
    };
    $scope.getZnoData();
}]);