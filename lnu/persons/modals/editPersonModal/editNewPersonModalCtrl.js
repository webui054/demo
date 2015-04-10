app.controller("EditNewPersonModalCtrl",["$scope", function($scope){


    $scope.editPerson = function(elId){
        $(elId).modal("hide");
        $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName + " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

        $scope.personGeneralInfoEditModalObj.identifier = "";
        $scope.personGeneralInfoEditModalObj.parentId = 0;
        console.log($scope.personGeneralInfoEditModalObj);
    }

}]);
