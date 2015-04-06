/**
 * Created by zigmmund on 05.04.2015.
 */
app.controller("ModalInstanceCtrl", ["$scope", "$http", "$modalInstance", function($scope, $http, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };

}]);