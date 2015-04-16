/**
 * Created by roman on 04.04.2015.
 */
propositions.controller("ProposalsCTRL", ["$scope", function($scope) {

    $scope.propozTab = 21;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };

    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
}]);