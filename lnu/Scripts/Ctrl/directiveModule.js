var directiveModule = angular.module('directiveModule', []);
directiveModule.directive('personContent', function() {
    return {
        templateUrl: 'View/personView.html'
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
        templateUrl: 'View/loginView.html'
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
//person's view
directiveModule.directive('personGeneralContent', function() {
    return {
        templateUrl: 'View/PersonsView/generalView.html'
    };
});
directiveModule.directive('personContactsContent', function() {
    return {
        templateUrl: 'View/PersonsView/contactsView.html'
    };
});
directiveModule.directive('personAddressContent', function() {
    return {
        templateUrl: 'View/PersonsView/addressView.html'
    };
});
directiveModule.directive('personDocumentsContent', function() {
    return {
        templateUrl: 'View/PersonsView/documentsView.html'
    };
});
directiveModule.directive('personEnglishContent', function() {
    return {
        templateUrl: 'View/PersonsView/englishView.html'
    };
});
directiveModule.directive('personManContent', function() {
    return {
        templateUrl: 'View/PersonsView/MANView.html'
    };
});
directiveModule.directive('personZnoContent', function() {
    return {
        templateUrl: 'View/PersonsView/ZNOView.html'
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