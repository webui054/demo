persons.controller("PersonsCtrl",["$scope","PersonRepo","$rootScope","$http","PersonDataMappingArray","$location",'PersonsService',
    function($scope,PersonRepo,$rootScope,$http,PersonDataMappingArray,$location,PersonsService){

        $scope.personGeneralInfoAddModalObj = {};
        $scope.personForeignerInfoAddModalObj = {};
        $scope.searchObj = {};
        $scope.isShowGeneralInfo = false;
        $scope.personGeneralInfoObj = {};
        $scope.trueFalseArr= [{id:0 , name: "Ні",val: false},{id:1 , name: "Так",val: true}];
        $scope.personGeneralInfoEditModalObj ={};
        $scope.personsOffset = 0;

        $scope.personForeignerInfoEditModalObj ={};

        $scope.tempForeinerArrObj = [{ personId:1, languageId:2, name:"Kuznetsov Dmytro Oleksandrovych",
            firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}
            ,{ personId:2, languageId:3, name:"Kuznetsov Dmytro Oleksandrovych",
                firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}];

        $scope.tempForeinerObj ={};

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

        $scope.getPersonData = function (offset,orderByKey) {
            PersonsService.getAll(offset,orderByKey,$scope.searchObj.personName,$scope.searchObj.genderTypeId
                ,$scope.searchObj.personTypeId,$scope.searchObj.citizenCountryId,$scope.searchObj.marriedTypeId)
                .success(function(data){
                $scope.personsCount = data.count;
                $scope.personData = data.resources;
                PersonRepo.pushPerson(data.resources);
            });
        };

        $scope.getPersonData(0,'name-asc');


        $scope.getNextData = function(){
            if(($scope.personsOffset+10) < $scope.personsCount){
            $scope.personsOffset += 10;
            $scope.getPersonData($scope.personsOffset,'name-asc')
            }
        };

        $scope.getPrevData = function(){
            if($scope.personsOffset > 0){
            $scope.personsOffset -= 10;
            $scope.getPersonData($scope.personsOffset,'name-asc')
            }
        };

        $scope.showGeneralInfo = function(data){

            $scope.personGeneralInfoEditModalObj = data;
            $scope.personGeneralInfoObj = data;
            angular.forEach($scope.tempForeinerArrObj,function(key){
                if(key.personId === data.id){
                    $scope.tempForeinerObj = key;
                }
            });
            $location.path('/person/'+ data.id);
        };


        $scope.pushPersonToObj= function(data){
            $scope.personGeneralInfoEditModalObj = data;
        };

        $scope.showSearch= function(iff){

            $scope.searchObj = {};
            var el = document.getElementById("personsTable");
            if(iff){
                angular.element(el).removeClass("col-lg-12 col-md-12");
                angular.element(el).addClass("col-lg-9 col-md-8")
            }else{
                angular.element(el).removeClass("col-lg-9 col-md-9");
                angular.element(el).addClass("col-lg-12 col-md-12")
            }
            $scope.isMoreSearch = iff;
        };

        $scope.searchPersonsByName = function(){
            $scope.personsOffset = 0;
            $scope.getPersonData(0,'name-asc');
        };

    }]);

persons.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.open = function (name, persId, index) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceCtrl',
            size: "sm",
            resolve: { name: function () {
                return name;
            },
                id: function () {
                    return persId;
                },
                currentIndex: function(){
                    return index;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});


persons.controller('ModalInstanceCtrl', function ($scope, $modalInstance, name, id, currentIndex) {

    $scope.name = name;
    $scope.id = id;
    $scope.currentIndex = currentIndex;

    $scope.ok = function () {
        $modalInstance.close(true);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

