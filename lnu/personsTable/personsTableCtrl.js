app.controller("PersonsTableCTRL",["$scope","PersonRepo","$rootScope","$http", function($scope,PersonRepo,$rootScope,$http){

    $scope.personGeneralInfoAddModalObj = {};
    $scope.personForeignerInfoAddModalObj = {};

    $scope.isShowGeneralInfo = false;
    $scope.personGeneralInfoObj = {};
    $scope.trueFalseArr= [{id:0 , name: "Ні",val: false},{id:1 , name: "Так",val: true}];
    $scope.personGeneralInfoEditModalObj ={};

    $scope.personForeignerInfoEditModalObj ={};

    $scope.tempForeinerArrObj = [{ personId:1, languageId:2, name:"Kuznetsov Dmytro Oleksandrovych",firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}
        ,{ personId:2, languageId:3, name:"Kuznetsov Dmytro Oleksandrovych",firstName:"Dmytro",fatherName:"Oleksandrovych",surname:"Kuznetsov"}];

    $scope.tempForeinerObj ={};

    $scope.citizenCountry = [];

    $scope.personsTypes = [];
    $scope.marriedType = [];
    $scope.genderTypes = [];
    $scope.personsTypesArr = [];
    $scope.marriedTypeArr = [];
    $scope.genderTypesArr = [];
    $scope.citizenCountryArr = [];
    $scope.languagesArr =[];
    $scope.languages = [];

    $scope.getCitizenCountry = function(){

        $http.get('persons/general/citizenCountry.json').success(function (data) {
            $scope.citizenCountryArr = data;
            angular.forEach(data,function(key){
                $scope.citizenCountry[key.id] = key.name;
            });
        });
    };
    $scope.getCitizenCountry();

    $scope.getLanguages = function(){

        $http.get('persons/general/languages.json').success(function (data) {
            $scope.languagesArr = data;
            angular.forEach(data,function(key){
                $scope.languages[key.id] = key.name;
            });
        });
    };
    $scope.getLanguages();


    $scope.getMarriedTypes = function(){
        $http.get('persons/general/marriedTypes.json').success(function (data) {
            $scope.marriedTypeArr = data;
            angular.forEach(data,function(key){
                $scope.marriedType[key.id] = key.name;
            });
        });
    };

    $scope.getMarriedTypes();

    $scope.getPersonsType = function(){
        $http.get('persons/general/personsTypeId.json').success(function (data) {
            $scope.personsTypesArr = data;
            angular.forEach(data,function(key){
                $scope.personsTypes[key.id] = key.name;
            });

        });
    };
    $scope.getPersonsType();

    $scope.getGenderTypes = function(){
        $http.get('persons/general/genderTypes.json')
            .success(function (data) {
                $scope.genderTypesArr = data;
                angular.forEach(data,function(key){
                    $scope.genderTypes[key.id] = key.name;
                });

            });
    };
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
            resolve: {name: function () {
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

/*
$scope.removeRow = function(index) {
    $scope.tempProposalArray.splice(index, 1);
};
*/
