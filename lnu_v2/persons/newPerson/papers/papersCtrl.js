persons.controller("AddPaperCtrl", ["$scope", "$http", "$location", "PersonRepo", "PersonsService", "PaperDataArray", "Validator", "PersonDataMappingArray", function ($scope, $http, $location, PersonRepo, PersonsService, PaperDataArray, Validator, PersonDataMappingArray) {
    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.PapersArrData = [];
    $scope.PapersArrData = {
        papersUsages: [],
        papersTypes: [],
        honorTypes: []
    };
    $scope.paperObj = {
        honorsTypeId: 1
    };

    $scope.getUsages = function () {
        PaperDataArray.getPaperById().success(function (data) {
            $scope.papersUsages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypePapersData = function (paperUsageId) {
        PaperDataArray.getPaperChildById(paperUsageId).success(function (data) {
            $scope.papersTypes = data.resources;
            $scope.isUsageSelected = true;
        });
    };

// Validation
    $scope.numericValidator = function (e) {
        Validator.numericValidator(e);
    };

    $scope.ukrValidator = function (e) {
        Validator.ukrValidator(e);
    };
// Pushing data and moving to the next page
    $scope.goToZno = function () {
        PersonRepo.pushPaper($scope.paperObj);
        PersonsService.addNewPerson();
        $location.path("/persons");
    };

    // THIS PART REFERS TO THE ENDING OF PAGES
    //$scope.goToZno = function(){
    //    PersonRepo.pushPaper($scope.paperObj);
    //
    //};

}]);
