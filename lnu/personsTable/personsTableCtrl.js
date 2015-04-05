app.controller("PersonsTableCTRL",["$scope","PersonRepo", function($scope,PersonRepo){
    $scope.isShowGeneralInfo = false;
    $scope.tempData123 = ["as1","as3","as4","as5","as6","as2"];

    $scope.showGeneralInfo = function(data){
        PersonRepo.pushPerson(data);
        $scope.isShowGeneralInfo = true;
    };
}]);/**
 * Created by Dmytro on 04.04.2015.
 */
