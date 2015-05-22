persons.controller("AddPaperCtrl", ["$scope", "$http", "$location", "PersonRepo", "PersonsService", "PaperDataArray", "Validator", function ($scope,$http, $location, PersonRepo, PersonsService, PaperDataArray, Validator) {
    var baseURL =
    $scope.PapersArrData = [];
    $scope.PapersArrData = {
        papersUsages: [],
        papersTypes: []
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

    $scope.getPaperUsage = function () {
        PersonDataMappingArray.getDataArray(base).then(function (data) {
            $scope.allPersonsArrData.citizenCountries = data;
        });
    };
    // $scope.getCitizenCountry();



    $scope.numericValidator = function (e) {
        Validator.numericValidator(e);
    };

    $scope.ukrValidator = function (e) {
        Validator.ukrValidator(e);
    };

    $scope.goToZno = function () {
        PersonRepo.pushPaper($scope.paperObj);
        $location.path('/addPerson/mark');
    };

    // THIS PART REFERS TO THE ENDING OF PAGES
    //$scope.goToZno = function(){
    //    PersonRepo.pushPaper($scope.paperObj);
    //    PersonsService.addNewPerson();
    //    //$location.path('/addPerson/mark');
    //};

}]);
