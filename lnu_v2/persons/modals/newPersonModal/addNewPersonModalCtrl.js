persons.controller("AddNewPersonModalCtrl",["$scope","PersonDataMappingArray","$http","PersonsService",
    function($scope,PersonDataMappingArray,$http,PersonsService){
    $scope.allPersonsArrData = [];
    $scope.allPersonsArrData = {
        citizenCountries: [],
        genderTypes : [],
        personsTypes : [],
        marriedTypes : [],
        languages : []
    };

    $scope.getCitizenCountry = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
            $scope.allPersonsArrData.citizenCountries = data;
        });
    };
    $scope.getCitizenCountry();

    $scope.getLanguages = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
            $scope.allPersonsArrData.languages = data;
        });
    };
    $scope.getLanguages();


    $scope.getMarriedTypes = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
            $scope.allPersonsArrData.marriedTypes = data;
        });
    };

    $scope.getMarriedTypes();

    $scope.getPersonsType = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
            $scope.allPersonsArrData.personsTypes = data;
        });

    };
    $scope.getPersonsType();

    $scope.getGenderTypes = function(){
        PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
            $scope.allPersonsArrData.genderTypes = data;
        });
    };
    $scope.getGenderTypes();

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";



    $scope.addNewPerson = function(){
        $('#addNewPersonModal').modal("hide");
        $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
        " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

        $scope.personGeneralInfoAddModalObj.begDate = new Date($scope.personGeneralInfoAddModalObj.begDate.year +"-"
        +($scope.personGeneralInfoAddModalObj.begDate.month)+"-"+$scope.personGeneralInfoAddModalObj.begDate.day);

        $scope.personGeneralInfoAddModalObj.identifier = "123123";
        //$scope.personGeneralInfoAddModalObj.endDate = "2015-01-01";

        PersonsService.addNewPerson($scope.personGeneralInfoAddModalObj).success(function(data){
            $scope.personData.push(data);
        });

        $scope.personGeneralInfoAddModalObj = {};
    }

}]);
