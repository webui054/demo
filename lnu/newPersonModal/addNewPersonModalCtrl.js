app.controller("AddNewPersonModalCtrl",["$scope", function($scope){
    $scope.personModalTab = 1;

    $scope.selectPersonModalTab = function(setTab){
        $scope.personModalTab = setTab;
    };

    $scope.isPersonModalTabSelected = function(checkTab){
        return $scope.personModalTab === checkTab;
    };
    $scope.addNewPerson = function(){
        $scope.tempModalPerson.name = $scope.tempModalPerson.firstName + " " + $scope.tempModalPerson.surname + " " + $scope.tempModalPerson.fatherName;

        $scope.tempModalPerson.identifier = "";
        $scope.tempModalPerson.parentId = 0;
        console.log($scope.tempModalPerson);
        $scope.tempPersonData.push($scope.tempModalPerson);
    }

}]);
