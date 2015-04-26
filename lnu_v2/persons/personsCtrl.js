persons.controller("PersonsCtrl",["$scope","PersonRepo","$rootScope","$http","PersonDataMappingArray","$location",
    'PersonsService','$modal',
    function($scope,PersonRepo,$rootScope,$http,PersonDataMappingArray,$location,PersonsService,$modal){

        $scope.personGeneralInfoAddModalObj = {};
        $scope.personForeignerInfoAddModalObj = {};
        $scope.searchObj = {};
        $scope.isShowGeneralInfo = false;
        $scope.personGeneralInfoObj = {};

        $scope.personGeneralInfoEditModalObj ={};
        $scope.personsOffset = 0;

        $scope.personForeignerInfoEditModalObj ={};

        $scope.tempForeinerArrObj = [{ personId:1, languageId:2, name:"Kuznetsov Dmytro Oleksandrovych",
            firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}
            ,{ personId:2, languageId:3, name:"Kuznetsov Dmytro Oleksandrovych",
                firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}];

        $scope.tempForeinerObj ={};

        $scope.tableHeaderDataObj = [ {name:'ПІБ',orderByKey:'name'},
            {name:'Стать',orderByKey:'genderTypeId'},
            {name:'Народження',orderByKey:'begDate'},
            {name:'Тип',orderByKey:'personTypeId'},
            {name:'Резидент',orderByKey:'resident'},
            {name:'Громадянство',orderByKey:'citizenCountryId'},
            {name:'Особова справа',orderByKey:''},
            {name:'Управління',orderByKey:''}];

        //Address Select for person adress
        $scope.addressData = {
            countries:[],
            regions:[],
            cdTypes:[],
            cities:[],
            districts:[],
            vType:[],
            villages:[],
            countryId:{},
            regionId:{},
            cdTypeId:{},
            districtId:{},
            vTypeId:{},
            villageId:{}
        };

        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
        $scope.getCountries = function(){
            $http.get(baseUrl + "api/adminunits?adminUnitTypeId=6").success(function(data){
                var addEl = document.getElementById("addrsC");
                addEl.addEventListener('change',function(){
                    $scope.getRegionAddressData($scope.addressData.countryId);
                });
              $scope.addressData.countries = data.resources;
            });

        };
        //$scope.getCountries();


        $scope.getRegionAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsR");
                addEl.addEventListener('change',function(){
                    $scope.getCdTypesAddressData($scope.addressData.regionId);
                });
                $scope.addressData.regions = data.resources;
                $scope.isCountrySelected = true;
            });
        };

        $scope.getCdTypesAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsCD");
                addEl.addEventListener('change',function(){
                    $scope.getDistrictAddressData($scope.addressData.cdTypeId);
                });
                $scope.addressData.cdTypes = data.resources;
                $scope.isRegionSelected = true;
            });
        };

        $scope.getDistrictAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsD");
                addEl.addEventListener('change',function(){
                    $scope.getvTypeAddressData($scope.addressData.districtId);
                });
                $scope.addressData.districts = data.resources;
                $scope.iscdTypeSelected = true;
            });
        };

        $scope.getvTypeAddressData = function(parentId){

            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsV");
                addEl.addEventListener('change',function(){
                    $scope.getVillageAddressData($scope.addressData.vTypeId);
                });
                $scope.addressData.vTypes = data.resources;
                $scope.isDistrictSelected = true;
            });
        };

        $scope.getVillageAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                $scope.addressData.villages = data.resources;
                $scope.isvTypeSelected = true;
            });
        };

        //end for adress selection

        $scope.allMappedArrData = {
            citizenCountry: [],
            genderTypes : [],
            personsTypes : [],
            marriedType : [],
            languages : []
        };
        $scope.isMoreSearch = false;

        // persons mapped array getters
        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.allMappedArrData.citizenCountry = data;
            });
        };
        $scope.getLanguages = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/languages.json').then(function(data){
                $scope.allMappedArrData.languages = data;
            });
        };
        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.allMappedArrData.marriedType = data;
            });
        };
        $scope.getPersonsType = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.allMappedArrData.personsTypes = data;
            });

        };
        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.allMappedArrData.genderTypes = data;
            });
        };
        // run persons mapped array getters
        $scope.getCitizenCountry();
        $scope.getLanguages();
        $scope.getMarriedTypes();
        $scope.getPersonsType();
        $scope.getGenderTypes();

        // search data content array getters
        $scope.dataForSearchContent = {
            citizenCountries: [],
            genderTypes : [],
            personsTypes : [],
            marriedTypes : [],
            languages : [],
            personName : ""
        };
        $scope.searchObj ={
            personName : ""
        };

        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/citizenCountry.json').then(function(data){
                $scope.dataForSearchContent.citizenCountries = data;
            });
        };

        $scope.getLanguages = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/languages.json').then(function(data){
                $scope.dataForSearchContent.languages = data;
            });
        };

        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/marriedTypes.json').then(function(data){
                $scope.dataForSearchContent.marriedTypes = data;
            });
        };

        $scope.getPersonsType = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/personsTypeId.json').then(function(data){
                $scope.dataForSearchContent.personsTypes = data;
            });

        };

        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getDataArray('persons/person/general/genderTypes.json').then(function(data){
                $scope.dataForSearchContent.genderTypes = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getCitizenCountry();
        $scope.getPersonsType();
        $scope.getMarriedTypes();
        $scope.getLanguages();
        // end: search data content array getters

        $scope.personData = {};
        $scope.orderByKey = 'name-asc';
        $scope.getPersonData = function (offset,orderByKey) {
            return PersonsService.getAll(offset,orderByKey,$scope.searchObj.personName,$scope.searchObj.genderTypeId
                ,$scope.searchObj.personTypeId,$scope.searchObj.citizenCountryId,$scope.searchObj.marriedTypeId)
                .success(function(data){
                    $scope.personsCount = data.count;
                    $scope.personData = data.resources;
                    PersonRepo.pushPerson(data.resources);
                });
        };

        $scope.getPersonData(0,$scope.orderByKey);

        $scope.reverseSort = false;

        $scope.getOrderByPersonData = function (orderByKey) {
            if(orderByKey === ''){

            }else{
                $scope.reverseSort = !$scope.reverseSort;
                if($scope.reverseSort){
                    $scope.orderByKey = orderByKey +'-asc';
                    $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
                }
                else {
                    $scope.orderByKey = orderByKey +'-desc';
                    $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
                }
            }
        };

        $scope.getNextData = function(){
            if(($scope.personsOffset+10) < $scope.personsCount){
                $scope.personsOffset += 10;
                $scope.getPersonData($scope.personsOffset,$scope.orderByKey);
            }
        };

        $scope.getPrevData = function(){
            if($scope.personsOffset > 0) {
                $scope.personsOffset -= 10;
                $scope.getPersonData($scope.personsOffset, $scope.orderByKey);
            }
        };

        $scope.showGeneralInfo = function(data){
            $location.path('/person/'+ data.id);
        };

        $scope.pushPersonToObj= function(data){
            $scope.personGeneralInfoEditModalObj = data;
            var tempDate = new Date(data.begDate);
            $scope.personGeneralInfoEditModalObj.day = tempDate.getDate();
            $scope.personGeneralInfoEditModalObj.month = (tempDate.getMonth()+1);
            $scope.personGeneralInfoEditModalObj.year = tempDate.getFullYear();
        };

        $scope.isMoreSearch = false;
        $scope.showSearch= function(iff){
            $scope.searchObj = {};
            $scope.isMoreSearch = iff;
        };

        $scope.searchPersonsByName = function(){
            $scope.personsOffset = 0;
            $scope.getPersonData(0,$scope.orderByKey);
        };

    }]);

