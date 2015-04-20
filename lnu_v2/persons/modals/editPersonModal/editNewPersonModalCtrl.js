persons.controller("EditNewPersonModalCtrl",["$scope","PersonDataMappingArray","$http",
    function($scope,PersonDataMappingArray,$http){
    $scope.allPersonsArrData = [];
    $scope.allPersonsArrData.personsTypes = [];
    $scope.allPersonsArrData.marriedTypes = [];
    $scope.allPersonsArrData.genderTypes = [];
    $scope.allPersonsArrData.citizenCountries = [];
    $scope.allPersonsArrData.languages = [];


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

    $scope.editPerson = function(elId){
        $(elId).modal("hide");
        $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName +
        " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

        //$scope.personGeneralInfoEditModalObj.identifier = "";
        //$scope.personGeneralInfoEditModalObj.parentId = 01;

        var data = {
            personTypeId:  $scope.personGeneralInfoEditModalObj.personTypeId,
            citizenCountryId: $scope.personGeneralInfoEditModalObj.citizenCountryId,
            genderTypeId: $scope.personGeneralInfoEditModalObj.genderTypeId,
            marriedTypeId: $scope.personGeneralInfoEditModalObj.marriedTypeId,
            begDate: $scope.personGeneralInfoEditModalObj.begDate,
            endDate: "2015-01-01",
            firstName: $scope.personGeneralInfoEditModalObj.firstName,
            surname: $scope.personGeneralInfoEditModalObj.surname,
            fatherName: $scope.personGeneralInfoEditModalObj.fatherName,
            name: $scope.personGeneralInfoEditModalObj.name,
            identifier: $scope.personGeneralInfoEditModalObj.identifier,
            isHostel:  $scope.personGeneralInfoEditModalObj.isHostel ,
            isMilitary:  $scope.personGeneralInfoEditModalObj.isMilitary ,
            resident:  $scope.personGeneralInfoEditModalObj.resident ,
            photo:  $scope.personGeneralInfoEditModalObj.photo ,
            birthPlace:  $scope.personGeneralInfoEditModalObj.birthPlace ,
            docNum:  $scope.personGeneralInfoEditModalObj.docNum ,
            docSeries:  $scope.personGeneralInfoEditModalObj.docSeries
        };









        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
        $http.put(baseUrl+"api/persons/"+ $scope.personGeneralInfoEditModalObj.id,data)
            .success(function(data){

            console.log(data)
        });
        console.log($scope.personGeneralInfoEditModalObj);
    }

}]);
