app.controller("PersonsTableCTRL",["$scope", function($scope){
    $scope.isShowGeneralInfo = false;
    $scope.tempData123 = ["as1","as3","as4","as5","as6","as2"];
    $scope.showGeneralInfo = function(data){

        $scope.isShowGeneralInfo = true;
    };

}]);/**
 * Created by Dmytro on 04.04.2015.
 */
app.controller("personInfoCtrl", ["$scope", "$http", function($scope, $http){
    $scope.tempPersonData = {};
    $scope.getPersonData = function () {
        $http.get('Content/tempData/tempData.json').success(function (data) {
            $scope.tempPersonData = data;
        });
    };
    $scope.getPersonData();
}]);