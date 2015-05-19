persons.controller("AddNewPersonModalCtrl",["$scope","PersonDataMappingArray","$http","PersonsService","$location","PersonRepo",
    function($scope,PersonDataMappingArray,$http,PersonsService,$location,PersonRepo){
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

        (function () {
            var day = document.getElementById('dayAp');
            day.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var mouth = document.getElementById('monthAp');
            mouth.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var year = document.getElementById('yearAp');
            year.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });
            var docNum = document.getElementById('docNumAp');
            docNum.addEventListener('keydown',function(e){
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)
                    && (e.keyCode !== 8)) {
                    e.preventDefault();
                }
            });

            var form = document.forms["addNewPersonModalForm"].elements;
            angular.forEach(form, function(data,i){
                if(data.name === ('addNewPerson'+i)){
                var el = document.getElementById('addNewPerson'+i);
                    $scope.one = false;
                    el.addEventListener('keypress',function(e){
                        //var asd = el.value;
                        //var reg = /['а-яА-ЯіїєІЇЄ]/;
                        //reg.match(asd);
                        var isNotUkrKeyPress =  (e.keyCode < 1025 || e.keyCode > 1097);
                        if(e.keyCode !== 39 || $scope.one){
                            if ((isNotUkrKeyPress) || (e.keyCode === 8)) {
                                if(e.keyCode !== 1100){
                                    if (e.keyCode < 1102 || e.keyCode > 1104) {
                                        if (e.keyCode < 1106 || e.keyCode > 1111) {
                                            e.preventDefault();
                                        }
                                    }
                                }
                            }
                        }else{
                            $scope.one = true;
                        }
                    });
                }
            });
        }());

        $scope.goToAddress = function(){
            $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
            " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

            $scope.personGeneralInfoAddModalObj.begDate = new Date($scope.personGeneralInfoAddModalObj.begDate.year +"-"
            +($scope.personGeneralInfoAddModalObj.begDate.month)+"-"+$scope.personGeneralInfoAddModalObj.begDate.day);

            $scope.personGeneralInfoAddModalObj.identifier = "123123";

            PersonRepo.pushPerson($scope.personGeneralInfoAddModalObj);

            PersonsService.addNewPerson(PersonRepo.popPerson()).then(function(data){
                console.log(data);
                $location.path('/addPerson/address');
            });

            //$location.path('/addPerson/address');

            $scope.personGeneralInfoAddModalObj = {};


        };


        $scope.addNewPerson = function(){
            $scope.personGeneralInfoAddModalObj.name = $scope.personGeneralInfoAddModalObj.firstName +
            " " + $scope.personGeneralInfoAddModalObj.surname + " " + $scope.personGeneralInfoAddModalObj.fatherName;

            $scope.personGeneralInfoAddModalObj.begDate = new Date($scope.personGeneralInfoAddModalObj.begDate.year +"-"
            +($scope.personGeneralInfoAddModalObj.begDate.month)+"-"+$scope.personGeneralInfoAddModalObj.begDate.day);

            $scope.personGeneralInfoAddModalObj.identifier = "123123";


            PersonsService.addNewPerson($scope.personGeneralInfoAddModalObj).then(function(data){
                $location.path('/persons');
            });

            $scope.personGeneralInfoAddModalObj = {};
        }

    }]);
