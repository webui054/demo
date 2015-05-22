persons.controller('PapersCtrl', ["$scope","PaperDataArray", "$http",'$routeParams','$location',
    function ($scope, PaperDataArray, $http,$routeParams,$location) {
        $scope.papersMapTypes = [];

        var personId = parseInt($routeParams.personId,10);
        $scope.papersData = [{
            personId: 118,
            paperTypeId: 1,
            honorsTypeId: 1,
            docSeries: '',
            docNum: 0,
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
        }

}]);