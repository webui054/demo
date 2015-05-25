persons.controller('PapersCtrl', ["$scope","PaperDataArray", "$http",'$routeParams','$location', 'PersonDataMappingArray',
    function ($scope, PaperDataArray, $http,$routeParams,$location,PersonDataMappingArray) {
        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
        $scope.PapersArrData = {
            papersUsages: [],
            papersTypes: [],
            honorTypes: []
        };


        var personId = parseInt($routeParams.personId,10);
        $scope.papersData = [{
            personId: 118,
            paperTypeId: 5,
            honorsTypeId: 1,
            docSeries: '',
            docNum: '',
            docDate:'2013-12-12',
            docIssued: '',
            docPin: 0,
            mark: 0,
            isChecked: 0,
            isForeign : 0
        }];
        $scope.getPersonPapersData = function(){
            PaperDataArray.getPersonPaperById(personId).success(function(data){
                if(data.resources.length > 0){
                    $scope.papersData = {};

                    $scope.papersData = data.resources;};

                console.log($scope.papersData);
            });
        };
        $scope.getPersonPapersData();
        $scope.editPapers = function(){
            $location.path('/editPerson/'+personId+'/papers')
        };

        // Mapping

        $scope.getPaperType = function () {
            PersonDataMappingArray.getMappedArrayFromRealApi(baseUrl + "api/papers/types").then(function (data) {
                console.log(data);
                $scope.PapersArrData.papersTypes = data;
            });
        };


        $scope.getHonorType = function () {
            PersonDataMappingArray.getMappedArrayFromRealApi(baseUrl + "api/honors/types").then(function (data) {
                $scope.PapersArrData.honorTypes = data;
            });
        };

        $scope.getPaperType();
        $scope.getHonorType();


}]);