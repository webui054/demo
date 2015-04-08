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

        $scope.tempModalPerson.createDate = new Date(Date.now());
        $scope.tempModalPerson.identifier = "";
        $scope.tempModalPerson.uri = "";
        $scope.tempModalPerson.endDate = "date-time";
        $scope.tempModalPerson.parentId = 0;
        $scope.tempModalPerson.crtUserGroup = "";
        $scope.tempModalPerson.createDate = "date-time";
        $scope.tempModalPerson.crtUser = "";
        $scope.tempModalPerson.uapp = "";
        $scope.tempModalPerson.uid = 0;
        $scope.tempModalPerson.updateDate= "date-time";
        $scope.tempModalPerson.utid = "";
        $scope.tempModalPerson.note = "";




        console.log($scope.tempModalPerson);
        
    }

}]);/**
 * Created by Dmytro on 08.04.2015.
 */
