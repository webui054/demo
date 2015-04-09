app.controller("EditNewPersonModalCtrl",["$scope", function($scope){


    $scope.editNewPerson = function(){
        $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName + " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

        $scope.personGeneralInfoEditModalObj.identifier = "";
        $scope.personGeneralInfoEditModalObj.parentId = 0;
        console.log($scope.personGeneralInfoEditModalObj);
    }

}]);
