persons.controller("EditGeneralPersonInfoCtrl",["$scope","PersonDataMappingArray","PersonsService","PersonRepo","$routeParams","Validator","$location",
    function($scope,PersonDataMappingArray,PersonsService,PersonRepo,$routeParams,Validator,$location){
        var personId = parseInt($routeParams.personId,10);
        $scope.allPersonsArrData = {
            personsTypes : [],
            marriedTypes : [],
            genderTypes : [],
            citizenCountries : [],
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

        $scope.getPerson = function (){
            PersonRepo.getPersonById2(personId).then(function(data){
                    $scope.personGeneralInfoEditModalObj = data;
                    var tempDate = new Date(data.begDate);
                    $scope.personGeneralInfoEditModalObj.day = tempDate.getDate();
                    $scope.personGeneralInfoEditModalObj.month = (tempDate.getMonth()+1);
                    $scope.personGeneralInfoEditModalObj.year = tempDate.getFullYear();
                    $scope.personGeneralInfoObj = data;
                    $scope.isShowGeneralInfo = true;
                }
            );
        };

        $scope.getPerson();
        $scope.getCitizenCountry();
        $scope.getLanguages();
        $scope.getGenderTypes();
        $scope.getMarriedTypes();
        $scope.getPersonsType();

        $scope.numericValidator = function(e){
            Validator.numericValidator(e);
        };

        $scope.ukrValidator = function(e){
            Validator.ukrValidator(e);
        };

        $scope.editPerson = function(){
            $scope.personGeneralInfoEditModalObj.name = $scope.personGeneralInfoEditModalObj.firstName +
            " " + $scope.personGeneralInfoEditModalObj.surname + " " + $scope.personGeneralInfoEditModalObj.fatherName;

            var tempDate = $scope.personGeneralInfoEditModalObj.year + "-"+$scope.personGeneralInfoEditModalObj.month +
                "-"+$scope.personGeneralInfoEditModalObj.day;
            $scope.personGeneralInfoEditModalObj.begDate = tempDate;

            var data = {
                personTypeId:  $scope.personGeneralInfoEditModalObj.personTypeId,
                citizenCountryId: $scope.personGeneralInfoEditModalObj.citizenCountryId,
                genderTypeId: $scope.personGeneralInfoEditModalObj.genderTypeId,
                marriedTypeId: $scope.personGeneralInfoEditModalObj.marriedTypeId,
                begDate: tempDate,
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
            PersonsService.editPerson($scope.personGeneralInfoEditModalObj.id,data).success(function(data){
                $location.path('/person/'+personId)
            });
        }
    }]);
