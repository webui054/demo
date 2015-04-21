persons.controller("DeletePersonModalCtrl",["$scope","$http","PersonsService",
    function($scope,$http,PersonsService,$dialog,$location){

        $scope.ok = function () {
            $('#deletePersonModalContent').modal("hide");
            PersonsService.deletePerson($scope.personGeneralInfoEditModalObj.id).success(function(data){
                console.log(data)
            });
        };

        $scope.cancel = function () {

            $('#deletePersonModalContent').modal("hide");
        };

    }]);
