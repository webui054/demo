app.controller("PersonsTableCTRL",["$scope","PersonRepo","$rootScope","$http", function($scope,PersonRepo,$rootScope,$http){
    $scope.tempModalPerson = {};
    $scope.isShowGeneralInfo = false;
    $scope.tempPerson2 = {};
    $scope.trueFalseArr= [{id:0 , name: "Ні",val: false},{id:1 , name: "Так",val: true}];


    $scope.citizenCountry = [{id:0,name:"Українець"},
        {id:1,name:"Білорус"},
        {id:2,name:"Англієць"},
        {id:3,name:"Росіянин"}];

    $scope.personsTypes = [];
    $scope.marriedType = [];
    $scope.genderTypes = [];
    $scope.personsTypesArr = [];
    $scope.marriedTypeArr = [];
    $scope.genderTypesArr = [];

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
        $http.get('Content/tempData/tempPersonData.json').success(function (data) {
            $scope.tempPersonData = data;
        });
    };
    $scope.getPersonData();


    $scope.showGeneralInfo = function(data){
        $scope.tempPerson2 = data;
        $scope.isShowGeneralInfo = true;
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

var personTabModal = angular.module('ui.bootstrap.demo', ['ui.bootstrap']);

personTabModal.controller('ModalDemoCtrl', function ($scope, $modal, $log) {

    $scope.open = function (name, persId) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent',
            controller: 'ModalInstanceCtrl',
            size: "sm",
            resolve: {name: function () {
                      return name;
                     },
                    id: function () {
                        return persId;
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

personTabModal.controller('ModalInstanceCtrl', function ($scope, $modalInstance, name, id) {

    $scope.name = name;
    $scope.id = id;


    $scope.ok = function () {
        $modalInstance.close(true);

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
