var directiveModule = angular.module('directiveModule', []);
directiveModule.directive('personContent', function() {
    return {
        templateUrl: 'persons/personsView.html'
    };
});
directiveModule.directive('propositionContent', function() {
    return {
        templateUrl: 'View/propositionView.html'
    };
});
// login view
directiveModule.directive('loginContent', function() {
    return {
        templateUrl: 'login/loginView.html'
    };
});
//proposition's view
directiveModule.directive('propositionGeneralContent', function() {
    return {
        templateUrl: 'View/PropositionsView/generalView.html'
    };
});
directiveModule.directive('propositionSubjectContent', function() {
    return {
        templateUrl: 'View/PropositionsView/subjectsView.html'
    };
});
directiveModule.directive('propositionBenefitsContent', function() {
    return {
        templateUrl: 'View/PropositionsView/benefitsView.html'
    };
});

directiveModule.directive('mainContent', function() {
    return {
        templateUrl: 'main/main.html'
    };
});

directiveModule.controller("innerDirectCTRL",["$scope", function($scope){
    $scope.propozTab = 21;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };
    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };
    $scope.personTab = 1;

    $scope.selectPersonTab = function(setTab){

        $scope.personTab = setTab;
    };
    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
}]);