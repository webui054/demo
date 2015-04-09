app.controller("AddNewPersonModalCtrl",["$scope", function($scope){
    $scope.personModalTab = 1;

    $scope.selectPersonModalTab = function(setTab){
        $scope.personModalTab = setTab;
    };

    $scope.isPersonModalTabSelected = function(checkTab){
        return $scope.personModalTab === checkTab;
    };
    $scope.addNewPerson = function(){
        $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName + " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;
        $scope.personForeignerInfoAddModalObj.name =$scope.personForeignerInfoAddModalObj.firstName + " " + $scope.personForeignerInfoAddModalObj.surname + " " + $scope.personForeignerInfoAddModalObj.fatherName;

        $scope.personGeneralInfoAddModalObj.personId = ($scope.tempPersonData.length + 1);
        $scope.personForeignerInfoAddModalObj.personId = ($scope.tempPersonData.length + 1);
        $scope.personGeneralInfoAddModalObj.identifier = "";
        $scope.personGeneralInfoAddModalObj.parentId = 0;
        console.log($scope.personGeneralInfoAddModalObj);
        $scope.tempPersonData.push($scope.personGeneralInfoAddModalObj);
        $scope.tempForeinerArrObj.push($scope.personForeignerInfoAddModalObj);
        $scope.personGeneralInfoAddModalObj ={};
    }

}]);
