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
        $scope.tempModalPersonF.name =$scope.tempModalPersonF.firstName + " " + $scope.tempModalPersonF.surname + " " + $scope.tempModalPersonF.fatherName;

        $scope.tempModalPerson.personId = ($scope.tempPersonData.length + 1);
        $scope.tempModalPersonF.personId = ($scope.tempPersonData.length + 1);
        $scope.tempModalPerson.identifier = "";
        $scope.tempModalPerson.parentId = 0;
        console.log($scope.tempModalPerson);
        $scope.tempPersonData.push($scope.tempModalPerson);
        $scope.tempForeinerArrObj.push($scope.tempModalPersonF);
        $scope.tempModalPerson ={};
    }

}]);
