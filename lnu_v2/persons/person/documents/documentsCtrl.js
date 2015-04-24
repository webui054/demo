/**
 * Created by Oksana on 20.04.2015.
 */


app.controller("DocumentsCtrl",["$scope","$http","PersonDataMappingArray",
    function($scope,$http,PersonDataMappingArray){

        $scope.personDataArrForDocuments = [];
        $scope.personDataArrForDocuments.documentTypes = [];
        $scope.personDataArrForDocuments.documentUsages = [];

        $scope.getDocTypes = function(){
            PersonDataMappingArray.getMappedArray('persons/person/documents/documentTypes.json').then(function(data){
                $scope.personDataArrForDocuments.documentTypes = data;
            });
        };
        $scope.getDocUsages = function(){
            PersonDataMappingArray.getMappedArray('persons/person/documents/documentUsages.json').then(function(data){
                $scope.personDataArrForDocuments.documentUsages = data;
            });
        };

        $scope.getGenderTypes();
        $scope.getPersonTypes();

    }]);