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

        $scope.getDocTypes();
        $scope.getDocUsages();

        $scope.documentsData = {
            countries:[],
            regions:[],
            asdTypes:[],
            cities:[],
            districts:[],
            villageType:[],
            villages:[],
            countryId:{},
            regionId:{}
        }

        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
        $scope.getUsages = function(){
            $http.get(baseUrl + "api/adminunits?adminUnitTypeId=6").success(function(data){
                var addEl = document.getElementById("addrsC");
                addEl.addEventListener('change',function(){
                    $scope.getChildAddressData($scope.addressData.countryId);
                });
                $scope.addressData.countries = data.resources;
            });

        };
        $scope.getUsages();


        $scope.getChildAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                $scope.documentsData.regions = data.resources;
                $scope.isUsageSelected = true;
            });
        };
    }]);