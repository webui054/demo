app.controller("AddNewPersonModalCtrl",["$scope", function($scope){
    //$scope.personModalTab = 1;
    //
    //$scope.selectPersonModalTab = function(setTab){
    //    $scope.personModalTab = setTab;
    //};
    //
    //$scope.isPersonModalTabSelected = function(checkTab){
    //    return $scope.personModalTab === checkTab;
    //};
    $scope.addNewPerson = function(){
        $('#addNewPersonModal').modal("hide");
        $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
        " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

        $scope.personGeneralInfoAddModalObj.personId = ($scope.tempPersonData.length + 1);
        $scope.personGeneralInfoAddModalObj.identifier = "";
        $scope.personGeneralInfoAddModalObj.parentId = 0;

        $scope.tempPersonData.push($scope.personGeneralInfoAddModalObj);

        $scope.personGeneralInfoAddModalObj = {};
    }

}]);
