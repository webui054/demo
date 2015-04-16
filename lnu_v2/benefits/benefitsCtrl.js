benefits.controller("BenefitsCTRL", ["$scope","$http", function($scope,$http) {

    $scope.propozTab = 31;

    $scope.selectPropozTab = function(setTab){
        $scope.propozTab = setTab;
    };

    $scope.isPropozTabSelected = function(checkTab){
        return $scope.propozTab === checkTab;
    };

    $scope.tempBenefitArray = [];
    $scope.name = "";
    $scope.id = "";
    $scope.benefitAmount = "";
    $scope.abbrName = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };
    var realPath = "";
    var tempPath = 'benefits/tempBenefitArray.json';
    var path = tempPath;
    $scope.getTempBenefitData = function () {
        $http.get(path)
            .success(function (data) {
                //console.log(data);
                //$scope.tempBenefitArray = angular.fromJson(data);
                $scope.tempBenefitArray = (data);
            })
            .error(function (msg) {
                console.log(msg);
            });
    };
    $scope.getTempBenefitData();


    $scope.AddNewBenefit = function () {
        $("#addBenefitModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.name = $scope.name;
        $scope.tempData.id = $scope.id;
        $scope.tempData.benefitAmount = $scope.benefitAmount;
        $scope.tempData.abbrName = $scope.abbrName;
        $scope.tempBenefitArray.push($scope.tempData);

        $scope.name = "";
        $scope.id = "";
        $scope.benefitAmount = "";
        $scope.abbrName = "";
    };

    $scope.removeRow = function (index) {
        $scope.tempBenefitArray.splice(index, 1);
    };

}]);