app.controller("PersonsCTRL",["$scope","PersonRepo", function($scope,PersonRepo){

    $scope.personTab = 1;

$scope.tempPerson = {};
    $scope.selectPersonTab = function(setTab){
        $scope.tempPerson = PersonRepo.popPerson();
            console.log(PersonRepo.popPerson());
        $scope.personTab = setTab;
    };
    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
    $scope.backToTheTable = function(){
        $scope.$parent.isShowGeneralInfo = false;
    };
}]);/**
 * Created by Dmytro on 04.04.2015.
 */
