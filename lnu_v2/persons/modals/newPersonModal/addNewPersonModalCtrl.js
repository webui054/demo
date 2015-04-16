persons.controller("AddNewPersonModalCtrl",["$scope","PersonDataMappingArray", function($scope,PersonDataMappingArray){
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





    $scope.addNewPerson = function(){
        $('#addNewPersonModal').modal("hide");
        $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
        " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

        $scope.personGeneralInfoAddModalObj.id = ($scope.tempPersonData.length + 2);
        $scope.personGeneralInfoAddModalObj.identifier = "";
        $scope.personGeneralInfoAddModalObj.parentId = 0;

        $scope.tempPersonData.push($scope.personGeneralInfoAddModalObj);

        $scope.personGeneralInfoAddModalObj = {};
    }

}]);
