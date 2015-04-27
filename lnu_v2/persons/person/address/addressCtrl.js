persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http", "$filter", "$interval", function ($scope, $http, $filter, $interval) {
    $scope.tempData = [];
    $scope.tempData2 = [];
    $scope.tempData3 = {};

        //Address Select for person adress
        $scope.addressData = {
            countries:[],
            regions:[],
            cdTypes:[],
            cities:[],
            districts:[],
            vType:[],
            villages:[],
            countryId:{},
            regionId:{},
            cdTypeId:{},
            districtId:{},
            vTypeId:{},
            villageId:{}
        };

        var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
        $scope.getCountries = function(){
            $http.get(baseUrl + "api/adminunits?adminUnitTypeId=6").success(function(data){
                var addEl = document.getElementById("addrsC");
                addEl.addEventListener('change',function(){
                    $scope.getRegionAddressData($scope.addressData.countryId);
                });
              $scope.addressData.countries = data.resources;
            });

        };
        //$scope.getCountries();


        $scope.getRegionAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsR");
                addEl.addEventListener('change',function(){
                    $scope.getCdTypesAddressData($scope.addressData.regionId);
                });
                $scope.addressData.regions = data.resources;
                $scope.isCountrySelected = true;
            });
        };

        $scope.getCdTypesAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsCD");
                addEl.addEventListener('change',function(){
                    $scope.getDistrictAddressData($scope.addressData.cdTypeId);
                });
                $scope.addressData.cdTypes = data.resources;
                $scope.isRegionSelected = true;
            });
        };

        $scope.getDistrictAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsD");
                addEl.addEventListener('change',function(){
                    $scope.getvTypeAddressData($scope.addressData.districtId);
                });
                $scope.addressData.districts = data.resources;
                $scope.iscdTypeSelected = true;
            });
        };

        $scope.getvTypeAddressData = function(parentId){

            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                var addEl = document.getElementById("addrsV");
                addEl.addEventListener('change',function(){
                    $scope.getVillageAddressData($scope.addressData.vTypeId);
                });
                $scope.addressData.vTypes = data.resources;
                $scope.isDistrictSelected = true;
            });
        };

        $scope.getVillageAddressData = function(parentId){
            $http.get(baseUrl + "api/adminunits?parentId="+parentId).success(function(data){
                $scope.addressData.villages = data.resources;
                $scope.isvTypeSelected = true;
            });
        };

        //end for adress selection