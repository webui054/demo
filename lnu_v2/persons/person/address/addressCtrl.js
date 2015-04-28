persons.controller('AddressCtrl', ["$scope", "AddressDataArray", "$http", function ($scope,AddressDataArray, $http) {

    $scope.tempAddressArray = [];
    $scope.index = "";
    $scope.typeStreets = "";
    $scope.addrsStreet = "";
    $scope.house = "";
    $scope.apartment = "";
    $scope.indexPost = "";
    $scope.typeStreetsPost = "";
    $scope.addrsStreetPost = "";
    $scope.housePost = "";
    $scope.apartmentPost = "";
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
        $scope.tempData.indexPost = $scope.indexPost;
        $scope.tempData.typeStreetsPost = $scope.typeStreetsPost;
        $scope.tempData.addrsStreetPost = $scope.addrsStreetPost;
        $scope.tempData.housePost = $scope.housePost;
        $scope.tempData.apartmentPost = $scope.apartmentPost;
        $scope.tempData.mPhone = $scope.mPhone;
        $scope.tempData.phone = $scope.phone;
        $scope.tempData.email = $scope.email;
        $scope.tempAddressArray.push($scope.tempData);

        $scope.index = "";
        $scope.typeStreets = "";
        $scope.addrsStreet = "";
        $scope.house = "";
        $scope.apartment = "";
        $scope.indexPost = "";
        $scope.typeStreetsPost = "";
        $scope.addrsStreetPost = "";
        $scope.housePost = "";
        $scope.apartmentPost = "";
        $scope.mPhone = "";
        $scope.phone = "";
        $scope.email = "";
    };

    //Address Select for person address
    $scope.addressData = {
        countries:[],
        regions:[],
        cdTypes:[],
        cities:[],
        districts:[],
        vType:[],
        villages:[],
        additions: [],
        countryId:{},
        regionId:{},
        cdTypeId:{},
        districtId:{},
        vTypeId:{},
        villageId:{},
        countriesPost:[],
        regionsPost:[],
        cdTypesPost:[],
        citiesPost:[],
        districtsPost:[],
        vTypePost:[],
        villagesPost:[],
        additionsPost: [],
        countryIdPost:{},
        regionIdPost:{},
        cdTypeIdPost:{},
        districtIdPost:{},
        vTypeIdPost:{},
        villageIdPost:{},
        isPostAddress: true
    };

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getCountries = function(){
        AddressDataArray.getAddressById().success(function(data){
            var addEl = document.getElementById("addrsC");
            addEl.addEventListener('change',function(){
                $scope.getRegionAddressData($scope.addressData.countryId);
            });
            $scope.addressData.countries = data.resources;
        });
    };
    $scope.getCountries();


    $scope.getRegionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsR");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesAddressData($scope.addressData.regionId);
            });
            $scope.addressData.regions = data.resources;
            $scope.isCountrySelected = true;
        });
    };

    $scope.getCdTypesAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsCD");
            addEl.addEventListener('change',function(){
                $scope.getDistrictAddressData($scope.addressData.cdTypeId);
            });
            $scope.addressData.cdTypes = data.resources;
            $scope.isRegionSelected = true;
        });
    };

    $scope.getDistrictAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsD");
            addEl.addEventListener('change',function(){
                $scope.getVTypeAddressData($scope.addressData.districtId);
            });
            $scope.addressData.districts = data.resources;
            $scope.iscdTypeSelected = true;
        });
    };

    $scope.getVTypeAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsV");
            addEl.addEventListener('change',function(){
                $scope.getVillageAddressData($scope.addressData.vTypeId);
            });
            $scope.addressData.vTypes = data.resources;
            $scope.isDistrictSelected = true;
        });
    };

    $scope.getVillageAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsVi");
            addEl.addEventListener('change',function(){
                $scope.getAdditionAddressData($scope.addressData.villageId);
            });
            $scope.addressData.villages = data.resources;
            $scope.isVTypeSelected = true;
        });
    };

    $scope.getAdditionAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additions = data.resources;
            $scope.isVillageSelected = true;
        });
    };

    //Post Address

    var baseUrl = "http://104.236.29.16:8080/is-lnu-rest-api/";
    $scope.getCountriesPost = function(){
        AddressDataArray.getAddressById().success(function(data){
            var addEl = document.getElementById("addrsCPost");
            addEl.addEventListener('change',function(){
                $scope.getRegionPostAddressData($scope.addressData.countryIdPost);
            });
            $scope.addressData.countriesPost = data.resources;
        });
    };
    $scope.getCountriesPost();


    $scope.getRegionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsRPost");
            addEl.addEventListener('change',function(){
                $scope.getCdTypesPostAddressData($scope.addressData.regionIdPost);
            });
            $scope.addressData.regionsPost = data.resources;
            $scope.isCountryPostSelected = true;
        });
    };

    $scope.getCdTypesPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsCDPost");
            addEl.addEventListener('change',function(){
                $scope.getDistrictPostAddressData($scope.addressData.cdTypeIdPost);
            });
            $scope.addressData.cdTypesPost = data.resources;
            $scope.isRegionPostSelected = true;
        });
    };

    $scope.getDistrictPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsDPost");
            addEl.addEventListener('change',function(){
                $scope.getVTypePostAddressData($scope.addressData.districtIdPost);
            });
            $scope.addressData.districtsPost = data.resources;
            $scope.iscdTypePostSelected = true;
        });
    };

    $scope.getVTypePostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsVPost");
            addEl.addEventListener('change',function(){
                $scope.getVillagePostAddressData($scope.addressData.vTypeIdPost);
            });
            $scope.addressData.vTypesPost = data.resources;
            $scope.isDistrictPostSelected = true;
        });
    };

    $scope.getVillagePostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            var addEl = document.getElementById("addrsViPost");
            addEl.addEventListener('change',function(){
                $scope.getAdditionPostAddressData($scope.addressData.villageIdPost);
            });
            $scope.addressData.villagesPost = data.resources;
            $scope.isVTypePostSelected = true;
        });
    };

    $scope.getAdditionPostAddressData = function(parentId){
        AddressDataArray.getAddressChildById(parentId).success(function(data){
            $scope.addressData.additionsPost = data.resources;
            $scope.isVillagePostSelected = true;
        });
    };
        //end for adress selection


}]);