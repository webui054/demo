/**
 * Created by Oksana on 09.04.2015.
 */

persons.controller('MarkCtrl', ["$scope", "$http", "$location", "PersonRepo", "PersonsService", "PaperDataArray", "Validator", function ($scope, $http, $location, PersonRepo, PersonsService, PaperDataArray, Validator) {
    $scope.MarkArrData = [];
    $scope.MarkArrData = {
        publicActivityAwardId: [],
        enrolmentSubjectId: []
    };

    $scope.getPublicActivity = function () {
        PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function (data) {
            $scope.MarkArrData.publicActivityAwardId = data;
        });
    };

    $scope.getEnrolmentSubject = function () {
        PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function (data) {
            $scope.MarkArrData.enrolmentSubjectId = data;
        });
    };


// Validation
    $scope.numericValidator = function (e) {
        Validator.numericValidator(e);
    };

    $scope.ukrValidator = function (e) {
        Validator.ukrValidator(e);
    };

    // Final adding of Person
    $scope.goToEnd = function () {
        PersonRepo.pushZno($scope.paperObj);
        PersonRepo.pushMan($scope.paperObj);
        PersonsService.addNewPerson();
    };

}]);