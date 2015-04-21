persons.controller("DeletePersonModalCtrl",["$scope","$http","PersonsService",
    function($scope,$http,PersonsService,$modalInstance){


        $scope.ok = function () {
            //PersonsService.deletePerson($scope.personGeneralInfoEditModalObj.id).success(function(data){
            //    console.log(data)
            //});
            this.$modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    }]);
