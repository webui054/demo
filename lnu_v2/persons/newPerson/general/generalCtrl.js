persons.controller("AddPersonGeneralInfoCtrl",["$scope","PersonDataMappingArray","$http","PersonsService","$location","PersonRepo","Validator",
    function($scope,PersonDataMappingArray,$http,PersonsService,$location,PersonRepo,Validator){
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

        $scope.getLanguages = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
                $scope.allPersonsArrData.languages = data;
            });
        };

        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.allPersonsArrData.marriedTypes = data;
            });
        };

        $scope.getPersonsType = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.allPersonsArrData.personsTypes = data;
            });
        };

        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.allPersonsArrData.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getCitizenCountry();
        $scope.getLanguages();
        $scope.getMarriedTypes();
        $scope.getPersonsType();

        $scope.numericValidator = function(e){
            Validator.numericValidator(e);
        };

        $scope.ukrValidator = function(e){
            Validator.ukrValidator(e);
        };

        $scope.goToAddress = function(){
            $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
            " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;
            $scope.personGeneralInfoAddModalObj.begDate = new Date($scope.personGeneralInfoAddModalObj.begDate.year +"-"
            +($scope.personGeneralInfoAddModalObj.begDate.month)+"-"+$scope.personGeneralInfoAddModalObj.begDate.day);
            $scope.personGeneralInfoAddModalObj.identifier = "123123";
            PersonRepo.pushPerson($scope.personGeneralInfoAddModalObj);
            $location.path('/addPerson/address');
            $scope.personGeneralInfoAddModalObj = {};
        };
    }]);
