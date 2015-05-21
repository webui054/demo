persons.controller("AddPaperCtrl",["$scope","$location","$routeParam","PersonRepo",function($scope,$location,$routeParam,PersonRepo){
    $scope.allPersonsArrData = [];
    $scope.allPersonsArrData = {
        citizenCountries: [],
        genderTypes : [],
        personsTypes : [],
        marriedTypes : [],
        languages : []
    };
    $scope.paperObj = {
        honorsTypeId : 1
    };

    $scope.getUsages = function(){
        PaperDataArray.getPaperById().success(function(data){
            var addEl = paper.getElementById("papsU");
            addEl.addEventListener('change',function(){
                $scope.getTypePapersData($scope.papersData.usageId);
            });
            $scope.papersUsages = data.resources;
        });
    };
    $scope.getUsages();

    $scope.getTypePapersData = function(paperUsageId){
        PaperDataArray.getPaperChildById(paperUsageId).success(function(data){
            $scope.papersTypes = data.resources;
            $scope.isUsageSelected = true;
        });
    };


    $scope.getCitizenCountry = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
            $scope.allPersonsArrData.citizenCountries = data;
        });
    };
    $scope.getCitizenCountry();

    $scope.goToZno = function(){
        PersonRepo.pushPaper($scope.paperObj);
        $location.path('/addPerson/mark');
    };


}]);
