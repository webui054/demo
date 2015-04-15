app.controller("EditNewPersonModalCtrl",["$scope","PersonDataMappingArray", function($scope,PersonDataMappingArray){
    $scope.allPersonsArrData = [];
    $scope.allPersonsArrData.personsTypes = [];
    $scope.allPersonsArrData.marriedTypes = [];
    $scope.allPersonsArrData.genderTypes = [];
    $scope.allPersonsArrData.citizenCountries = [];
    $scope.allPersonsArrData.languages = [];


    $scope.getCitizenCountry = function(){
        PersonDataMappingArray.getDataArray('persons/general/citizenCountry.json').then(function(data){
            $scope.allPersonsArrData.citizenCountries = data;
        });
    };
    $scope.getCitizenCountry();

    $scope.getLanguages = function(){
        PersonDataMappingArray.getDataArray('persons/general/languages.json').then(function(data){
            $scope.allPersonsArrData.languages = data;
        });
    };
    $scope.getLanguages();


    $scope.getMarriedTypes = function(){
        PersonDataMappingArray.getDataArray('persons/general/marriedTypes.json').then(function(data){
            $scope.allPersonsArrData.marriedTypes = data;
        });
    };

    $scope.getMarriedTypes();

    $scope.getPersonsType = function(){
        PersonDataMappingArray.getDataArray('persons/general/personsTypeId.json').then(function(data){
            $scope.allPersonsArrData.personsTypes = data;
        });

    };
    $scope.getPersonsType();

    $scope.getGenderTypes = function(){
        PersonDataMappingArray.getDataArray('persons/general/genderTypes.json').then(function(data){
            $scope.allPersonsArrData.genderTypes = data;
        });
    };
    $scope.getGenderTypes();

    $scope.editPerson = function(elId){
        $(elId).modal("hide");
        $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName + " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

        $scope.personGeneralInfoEditModalObj.identifier = "";
        $scope.personGeneralInfoEditModalObj.parentId = 0;
        console.log($scope.personGeneralInfoEditModalObj);
    }

}]);
