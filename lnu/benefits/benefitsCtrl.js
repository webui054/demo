/**
 * Created by roman on 07.04.2015.
 */

app.controller("BenefitsCTRL", ["$scope", function($scope) {

    $scope.propozTab = 31;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };

    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
}]);