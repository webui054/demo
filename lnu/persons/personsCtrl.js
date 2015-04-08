app.controller("PersonsCTRL",["$scope","PersonRepo", function($scope,PersonRepo){
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
}]);