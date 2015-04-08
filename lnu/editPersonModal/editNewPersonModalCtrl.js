app.controller("EditNewPersonModalCtrl",["$scope", function($scope){


    $scope.editNewPerson = function(){
        $scope.tempModalPerson2.name = $scope.tempModalPerson2.firstName + " " + $scope.tempModalPerson2.surname + " " + $scope.tempModalPerson2.fatherName;

        $scope.tempModalPerson2.identifier = "";
        $scope.tempModalPerson2.parentId = 0;
        console.log($scope.tempModalPerson2);
    }

}]);
