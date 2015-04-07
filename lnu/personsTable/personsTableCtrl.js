app.controller("PersonsTableCTRL",["$scope","PersonRepo", function($scope,PersonRepo){
    $scope.isShowGeneralInfo = false;



    $scope.showGeneralInfo = function(data){
        PersonRepo.pushPerson(data);
        $scope.isShowGeneralInfo = true;
    };

}]);

app.controller("personInfoCtrl", ["$scope", "$http", function($scope, $http){
    $scope.citizenCountry2 = [{id:0,name:"Українець"},
        {id:1,name:"Білорус"},
        {id:2,name:"Англієць"},
        {id:3,name:"Росіянин"}];

    $scope.personsTypes2 = [];
    $scope.marriedType2 = [];
    $scope.genderTypes2 = [];

    $scope.getMarriedTypes2 = function(){
        //PersonDataMappingArray.getMappedArray('persons/general/marriedTypes.json').then(function(data){
        //    $scope.marriedType = data;
        //});
        $http.get('persons/general/marriedTypes.json').success(function (data) {
            angular.forEach(data,function(key){
                $scope.marriedType2[key.id] = key.name;
            });
        });
    };

    $scope.getMarriedTypes2();



    $scope.getPersonsType2 = function(){
        $http.get('persons/general/personsTypeId.json').success(function (data) {
            angular.forEach(data,function(key){
                $scope.personsTypes2[key.id] = key.name;
            });

        });
    };
    $scope.getPersonsType2();



    $scope.getGenderTypes2 = function(){
        $http.get('persons/general/genderTypes.json')
            .success(function (data) {
                angular.forEach(data,function(key){
                    $scope.genderTypes2[key.id] = key.name;
                });

            });
    };
    $scope.getGenderTypes2();
    $scope.tempPersonData = {};
    $scope.getPersonData = function () {
        $http.get('Content/tempData/tempPersonData.json').success(function (data) {
            $scope.tempPersonData = data;
        });
    };
    $scope.getPersonData();

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
            templateUrl: 'myModalContent.html',
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
