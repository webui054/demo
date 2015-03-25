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
//proposition's view
app.directive('propositionGeneralContent', function() {
    return {
        templateUrl: 'View/PropositionsView/generalView.html'
    };
});
app.directive('propositionSubjectContent', function() {
    return {
        templateUrl: 'View/PropositionsView/subjectsView.html'
    };
});
app.directive('propositionBenefitsContent', function() {
    return {
        templateUrl: 'View/PropositionsView/benefitsView.html'
    };
});


app.controller("innerDirectCTRL",["$scope", function($scope){
    $scope.propozTab = 21;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };
    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
    $scope.personTab = 31;

    $scope.selectAucTab = function(setTab){
        $scope.personTab = setTab;
    };
    $scope.isAucTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
}]);