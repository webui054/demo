app.controller("PersonsCTRL",["$scope", function($scope){

    $scope.personTab = 1;

    $scope.selectPersonTab = function(setTab){

        $scope.personTab = setTab;
    };
    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
}]);/**
 * Created by Dmytro on 04.04.2015.
 */
