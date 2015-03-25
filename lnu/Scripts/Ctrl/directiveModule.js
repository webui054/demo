var app = angular.module('directiveModule', []);
app.directive('personContent', function() {
    return {
        templateUrl: 'View/personView.html'
    };
});
app.directive('propositionContent', function() {
    return {
        templateUrl: 'View/propositionView.html'
    };
});


app.controller("innerDirectCTRL",["$scope", function($scope){
    $scope.personTab = 21;

    $scope.selectDocTab = function(setTab){
        $scope.personTab = setTab;
    };
    $scope.isDocTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
    $scope.propozTab = 31;

    $scope.selectAucTab = function(setTab){
        $scope.propozTab = setTab;
    };
    $scope.isAucTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
}]);