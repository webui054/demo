app.controller("PersonsTableCTRL",["$scope","PersonRepo","$rootScope","$http","PersonDataMappingArray",
    function($scope,PersonRepo,$rootScope,$http,PersonDataMappingArray){

        $scope.personGeneralInfoAddModalObj = {};
        $scope.personForeignerInfoAddModalObj = {};

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

        $scope.allMappedArrData = [];
        $scope.allMappedArrData.citizenCountry = [];
        $scope.allMappedArrData.personsTypes = [];
        $scope.allMappedArrData.marriedType = [];
        $scope.allMappedArrData.genderTypes = [];
        $scope.allMappedArrData.languages = [];

        // persons mapped array getters
        $scope.getCitizenCountry = function(){
            PersonDataMappingArray.getMappedArray('persons/general/citizenCountry.json').then(function(data){
                $scope.allMappedArrData.citizenCountry = data;
            });
        };
        $scope.getLanguages = function(){
            PersonDataMappingArray.getMappedArray('persons/general/languages.json').then(function(data){
                $scope.allMappedArrData.languages = data;
            });
        };
        $scope.getMarriedTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/general/marriedTypes.json').then(function(data){
                $scope.allMappedArrData.marriedType = data;
            });
        };
        $scope.getPersonsType = function(){
            PersonDataMappingArray.getMappedArray('persons/general/personsTypeId.json').then(function(data){
                $scope.allMappedArrData.personsTypes = data;
            });

        };
        $scope.getGenderTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/general/genderTypes.json').then(function(data){
                $scope.allMappedArrData.genderTypes = data;
            });
        };
        // run persons mapped array getters
        $scope.getCitizenCountry();
        $scope.getLanguages();
        $scope.getMarriedTypes();
        $scope.getPersonsType();
        $scope.getGenderTypes();


        $scope.tempPersonData = {};

        $scope.getPersonData = function () {
            $http.get('content/tempData/tempPersonData.json').success(function (data) {
                $scope.tempPersonData = data;
            });
        };
        $scope.getPersonData();

        $scope.showGeneralInfo = function(data){
            $scope.personGeneralInfoEditModalObj = data;
            $scope.personGeneralInfoObj = data;
            angular.forEach($scope.tempForeinerArrObj,function(key){
                if(key.personId === data.id){
                    $scope.tempForeinerObj = key;
                }
            });
            $scope.isShowGeneralInfo = true;
        };
        $scope.pushPersonToObj= function(data){
            $scope.personGeneralInfoEditModalObj = data;
        };

    }]);

app.controller("personInfoCtrl", ["$scope", "$http", function($scope, $http){
/*
    $scope.tempAddress = {};
    $scope.baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";

    $scope.getAddressData = function () {

        $http.defaults.headers.common.Authorization = 'Basic YWRtaW46bmltZGE='; // задаємо хедер запиту по замовчуванню для всіх типів крім POST і PUT
        $http.get($scope.baseUrl + "/api/adminunits").success(function (data) {
            $scope.tempAddress = data.resources;
            console.log($scope.tempAddress);
        });
    };
    $scope.getAddressData();
*/

}]);


/*MODAL window controller*/

var personTabModal = angular.module('PersonTableModule', ['ui.bootstrap']);

personTabModal.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

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

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

personTabModal.controller('ModalInstanceCtrl', function ($scope, $modalInstance, name, id, currentIndex) {

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
