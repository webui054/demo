persons.controller("PersonCtrl",["$scope","PersonRepo",'$routeParams', function($scope,PersonRepo,$routeParams){
    $scope.personTab = 1;

    $scope.selectPersonTab = function(setTab){
        $scope.personTab = setTab;
    };

    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };

    $scope.backToTheTable = function(){
        $scope.personTab = 1;
        $scope.$parent.isShowGeneralInfo = false;
    };
    (function (){
        var tempPerson = PersonRepo.getPersonById(parseInt($routeParams.personId,10));
        $scope.personGeneralInfoEditModalObj = tempPerson.$$state.value;
        var tempDate = new Date(tempPerson.$$state.value.begDate);

        $scope.personGeneralInfoEditModalObj.day = tempDate.getDate();
        $scope.personGeneralInfoEditModalObj.month = (tempDate.getMonth()+1);
        $scope.personGeneralInfoEditModalObj.year = tempDate.getFullYear();
        $scope.personGeneralInfoObj = tempPerson.$$state.value;

        $scope.isShowGeneralInfo = true;
    }())
}]);