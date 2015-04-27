persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http", function ($scope,AddressDataArray, $http) {

    $scope.tempAddressArray = [];
    $scope.index = "";
    $scope.typeStreets = "";
    $scope.addrsStreet = "";
    $scope.house = "";
    $scope.apartment = "";
    $scope.mPhone = "";
    $scope.phone = "";
    $scope.email = "";

    $scope.showModal = function (id) {
        if (id === null) {
            return;
        }
        setTimeout(function () {
            $(id).modal('show');
        }, 500);
    };

    $scope.AddNewAddress = function () {
        $("#addAddressModal").modal("hide");
        $scope.tempData = {};

        $scope.tempData.index = $scope.index;
        $scope.tempData.typeStreets = $scope.typeStreets;
        $scope.tempData.addrsStreet = $scope.addrsStreet;
        $scope.tempData.house = $scope.house;
        $scope.tempData.apartment = $scope.apartment;
        $scope.tempData.mPhone = $scope.mPhone;
        $scope.tempData.phone = $scope.phone;
        $scope.tempData.email = $scope.email;
        $scope.tempAddressArray.push($scope.tempData);

        $scope.index = "";
        $scope.typeStreets = "";
        $scope.addrsStreet = "";
        $scope.house = "";
        $scope.apartment = "";
        $scope.mPhone = "";
        $scope.phone = "";
        $scope.email = "";
    };

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
            AddressDataArray.getAddressById($scope.countryId).success(function(data){
                var addEl = document.getElementById("addrsC");
                addEl.addEventListener('change',function(){
                    $scope.getRegionAddressData($scope.addressData.countryId);
                });
              $scope.addressData.countries = data.resources;
            });
        };
        $scope.getCountries();


        $scope.getRegionAddressData = function(parentId){
            AddressDataArray.getAddressChildById($scope.regionId, $scope.countryId, $scope.parentId).success(function(data){
                var addEl = document.getElementById("addrsR");
                addEl.addEventListener('change',function(){
                    $scope.getCdTypesAddressData($scope.addressData.regionId);
                });
                $scope.addressData.regions = data.resources;
                $scope.isCountrySelected = true;
            });
        };

        $scope.getCdTypesAddressData = function(parentId){
            AddressDataArray.getAddressChildById($scope.cdTypeId, $scope.regionId).success(function(data){
                var addEl = document.getElementById("addrsCD");
                addEl.addEventListener('change',function(){
                    $scope.getDistrictAddressData($scope.addressData.cdTypeId);
                });
                $scope.addressData.cdTypes = data.resources;
                $scope.isRegionSelected = true;
            });
        };

        $scope.getDistrictAddressData = function(parentId){
            AddressDataArray.getAddressChildById($scope.districtId, $scope.cdTypeId).success(function(data){
                var addEl = document.getElementById("addrsD");
                addEl.addEventListener('change',function(){
                    $scope.getVTypeAddressData($scope.addressData.districtId);
                });
                $scope.addressData.districts = data.resources;
                $scope.iscdTypeSelected = true;
            });
        };

        $scope.getVTypeAddressData = function(parentId){
            AddressDataArray.getAddressChildById($scope.vTypeId, $scope.districtId).success(function(data){
                var addEl = document.getElementById("addrsV");
                addEl.addEventListener('change',function(){
                    $scope.getVillageAddressData($scope.addressData.vTypeId);
                });
                $scope.addressData.vTypes = data.resources;
                $scope.isDistrictSelected = true;
            });
        };

        $scope.getVillageAddressData = function(parentId){
            AddressDataArray.getAddressChildById($scope.villageId, $scope.vTypeId).success(function(data){
                $scope.addressData.villages = data.resources;
                $scope.isVTypeSelected = true;
            });
        };

        //end for adress selection

}]);