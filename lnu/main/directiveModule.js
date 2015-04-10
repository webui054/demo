var directiveModule = angular.module('directiveModule', []);
directiveModule.directive('personContent', function() {
    return {
        templateUrl: 'persons/personsView.html'
    };
});
directiveModule.directive('propositionContent', function() {
    return {
        templateUrl: 'proposals/propositionView.html'
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
        templateUrl: 'proposals/generalView/generalView.html'
    };
});
directiveModule.directive('propositionSubjectContent', function() {
    return {
        templateUrl: 'proposals/subjects/subjectsView.html'
    };
});
directiveModule.directive('propositionBenefitsContent', function() {
    return {
        templateUrl: 'proposals/specofferBenefits/specofferBenefitsView.html'
    };
});

directiveModule.directive('mainContent', function() {
    return {
        templateUrl: 'main/main.html'
    };
});

directiveModule.controller("innerDirectCTRL",["$scope", function($scope){

}]);