app.controller('specofferBenefitsCtrl', ["$scope", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {

    $scope.tempSpecofferBenefitArray = [{a:""}];
    $scope.benefitName = "";
    $scope.benefitId = "";
    $scope.benefitAmount = "";
    $scope.benefitNote = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };


    $scope.AddNewSpecofferBenefit = function () {
        $("#addPropBenefitModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.benefitName = $scope.benefitName;
        $scope.tempData.benefitId = $scope.benefitId;
        $scope.tempData.benefitAmount = $scope.benefitAmount;
        $scope.tempData.benefitNote = $scope.benefitNote;
        if($scope.tempSpecofferBenefitArray[0].a === ""){
            $scope.tempSpecofferBenefitArray.splice(0,1)
        }
        $scope.tempSpecofferBenefitArray.push($scope.tempData);

        $scope.benefitName = "";
        $scope.benefitId = "";
        $scope.benefitAmount = "";
        $scope.benefitNote = "";

    };

    $scope.removeRow = function (index) {
        $scope.tempSpecofferBenefitArray.splice(index, 1);
    };

}]);