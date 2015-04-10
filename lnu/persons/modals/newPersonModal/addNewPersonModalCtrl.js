app.controller("AddNewPersonModalCtrl",["$scope", function($scope){

    $scope.addNewPerson = function(){
        $('#addNewPersonModal').modal("hide");
        $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
        " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

        $scope.personGeneralInfoAddModalObj.id = ($scope.tempPersonData.length + 2);
        $scope.personGeneralInfoAddModalObj.identifier = "";
        $scope.personGeneralInfoAddModalObj.parentId = 0;

        $scope.tempPersonData.push($scope.personGeneralInfoAddModalObj);

        $scope.personGeneralInfoAddModalObj = {};
    }

}]);
