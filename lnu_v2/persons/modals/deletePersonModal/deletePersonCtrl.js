persons.controller("DeletePersonModalCtrl",["$scope","PersonsService",
    function($scope,PersonsService){
        $scope.ok = function () {
            $('#deletePersonModalContent').modal("hide");
            PersonsService.deletePerson($scope.personGeneralInfoEditModalObj.id).success(function(data){
            });
        };
        $scope.cancel = function () {
            $('#deletePersonModalContent').modal("hide");
        };
    }]);
