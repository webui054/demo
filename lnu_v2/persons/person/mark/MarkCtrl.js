persons.controller('MarkCtrl', ["$scope", "$http", "PersonDataMappingArray", '$routeParams', '$location', 'MarkDataArray', function ($scope, $http, PersonDataMappingArray, $routeParams, $location, MarkDataArray) {
    $scope.markMapTypes = [];

    var personId = parseInt($routeParams.personId, 10);
    $scope.znoData = [{
        personId: 118,
        personPaperId: [],
        enrolmentSubjectId: [],
        mark: ""
    }];

    $scope.manData = [{
        personId: 118,
        personPaperId: [],
        publicActivityAwardId: [],
        bonus: ""
    }];

    $scope.getPersonZnoData = function () {
        //MarkDataArray.getPersonZnoById(personId).success(function (data) {
        //    if (data.resources.length > 0) {
        //        $scope.znoData = {};
        //
        //        $scope.znoData = data.resources;
        //    }
        //
        //    console.log($scope.znoData);
        //});
    };
    //$scope.getPersonZnoData();

    $scope.getPersonManData = function () {
        MarkDataArray.getPersonManById(personId).success(function (data) {
            if (data.resources.length > 0) {
                $scope.manData = {};

                $scope.manData = data.resources;
            }

            console.log($scope.manData);
        });
    };
    //$scope.getPersonManData();


    $scope.editMark = function () {
        $location.path('/editPerson/' + personId + '/mark')
    };




}]);