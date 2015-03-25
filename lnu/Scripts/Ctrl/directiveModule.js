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
//person's view
app.directive('personGeneralContent', function() {
    return {
        templateUrl: 'View/PersonsView/generalView.html'
    };
});
app.directive('personContactsContent', function() {
    return {
        templateUrl: 'View/PersonsView/contactsView.html'
    };
});
app.directive('personAddressContent', function() {
    return {
        templateUrl: 'View/PersonsView/addressView.html'
    };
});
app.directive('personDocumentsContent', function() {
    return {
        templateUrl: 'View/PersonsView/documentsView.html'
    };
});
app.directive('personEnglishContent', function() {
    return {
        templateUrl: 'View/PersonsView/englishView.html'
    };
});
app.directive('personManContent', function() {
    return {
        templateUrl: 'View/PersonsView/MANView.html'
    };
});
app.directive('personZnoContent', function() {
    return {
        templateUrl: 'View/PersonsView/ZNOView.html'
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
    $scope.personTab = 1;

    $scope.selectPersonTab = function(setTab){
        $scope.personTab = setTab;
    };
    $scope.isPersonTabSelected = function(checkTab){
        return $scope.personTab === checkTab;
    };
}]);