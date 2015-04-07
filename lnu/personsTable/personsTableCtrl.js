app.controller("PersonsTableCTRL",["$scope","PersonRepo", function($scope,PersonRepo){
    $scope.isShowGeneralInfo = false;
    $scope.tempData123 = ["as1","as3","as4","as5","as6","as2"];

    $scope.showGeneralInfo = function(data){
        PersonRepo.pushPerson(data);
        $scope.isShowGeneralInfo = true;
    };

}]);/**
 * Created by Dmytro on 04.04.2015.
 */
app.controller("personInfoCtrl", ["$scope", "$http", function($scope, $http){
    $scope.tempPersonData = {};
    $scope.getPersonData = function () {
        $http.get('Content/tempData/tempData.json').success(function (data) {
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

    $scope.open = function (name, persId, index) {
        alert(index);
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

    /*$scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };
     */
    $scope.ok = function () {
        $modalInstance.close(true);

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});
