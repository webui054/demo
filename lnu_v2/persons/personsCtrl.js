persons.controller("PersonsCtrl",["$scope","PersonRepo","$rootScope","$http","PersonDataMappingArray","$location",'PersonsService',
    function($scope,PersonRepo,$rootScope,$http,PersonDataMappingArray,$location,PersonsService){
        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/"; //todo remove after create service. DK
        $scope.personGeneralInfoAddModalObj = {};
        $scope.personForeignerInfoAddModalObj = {};
        $scope.searchObj = {};
        $scope.isShowGeneralInfo = false;
        $scope.personGeneralInfoObj = {};
        $scope.trueFalseArr= [{id:0 , name: "Ні",val: false},{id:1 , name: "Так",val: true}];
        $scope.personGeneralInfoEditModalObj ={};

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
        $scope.dataForSearchContent = [];
        $scope.dataForSearchContent = {
            citizenCountries: [],
            genderTypes : [],
            personsTypes : [],
            marriedTypes : [],
            languages : []
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

        $scope.tempPersonData = {};

        $scope.getPersonData = function (offset,orderByKey,name) {
            PersonsService.getAll(offset,orderByKey,name).success(function(data){
                $scope.personsCount = data.count;
                $scope.tempPersonData = data.resources;
                PersonRepo.pushPerson(data.resources);
            });
            //$http.get(baseUrl + "api/persons?limit=10&offset="+ offset+"&orderBy="+orderByKey+"&name="+name)
            //    .success(function (data) {
            //
            //});
        };
        $scope.getPersonData(0,'name-asc');//todo remove after create service. DK
        $scope.offset = 0;
        $scope.getNextData = function(){
            if($scope.offset < $scope.personsCount){
            $scope.offset += 10;
            $scope.getPersonData($scope.offset,'name-asc')
            }
        };
        $scope.getPrevData = function(){
            if($scope.offset > 0){
            $scope.offset -= 10;
            $scope.getPersonData($scope.offset,'name-asc')
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
            $scope.isMoreSearch = iff;
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

